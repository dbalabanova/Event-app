import Pdf from "components/Pdf";

const PdfPage = ():JSX.Element =>  {
  const data= JSON.parse(localStorage.getItem("data")!);

  return (
    <Pdf data={data} />
  );
}

export default PdfPage
