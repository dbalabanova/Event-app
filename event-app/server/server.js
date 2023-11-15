const express = require("express")
const bodyParser = require ("body-parser")
const puppeteer = require ("puppeteer")
const cors = require ("cors");
const dotenv = require ("dotenv");


const app = express();
dotenv.config();

const port = process.env.SERVER_NODE_PORT;
const whitelist = process.env.CORS_WHITELIST;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist?.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/pdf/generate", async (req, res) => {
  let response = {
    status: "loading",
    pdfName: "",
  };
  const data = req.body;

  try {
    printPDF(data).then((pdf) => {
      res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
      res.send(pdf);
    });
  } catch (error) {
    console.log(error);
    response = { status: "failed", pdfName: "" };
    res.send(response);
  }
});

async function printPDF(data) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument((token) => {
    localStorage.clear();
    localStorage.setItem("data", token);
  }, JSON.stringify(data));
  await page.goto(process.env.SERVER_NODE_PDF_PAGE_URL, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    landscape: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  });

  await browser.close();
  return pdf;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
