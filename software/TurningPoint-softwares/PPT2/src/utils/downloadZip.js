import JSZip from "jszip";
import buildPPT from "../ppt/generatePPT";

const downloadZip = async (
  chapters,
  zipName,
  theme
) => {
  const zip = new JSZip();

  for (const chapter of chapters) {
    const { blob, fileName } = await buildPPT(
      chapter,
      theme
    );

    zip.file(fileName, blob);
  }

  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
  });

  const url = URL.createObjectURL(zipBlob);

  const link = document.createElement("a");

  link.href = url;
  link.download = zipName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
};

export default downloadZip;