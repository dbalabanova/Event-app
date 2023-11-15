import { conf } from "services";
import { Purchases } from "models/user";
import axios from "axios";

export async function getPdf(purchases: Purchases[]) {
  let response = await axios.post(conf.pdfUrl, purchases, {
    responseType: "arraybuffer",
  });
  return new Blob([response.data], { type: "application/pdf" });
}
