// Add this at the very top before other imports
if (typeof window !== "undefined" && !window.DOMMatrix) {
  (window as any).DOMMatrix =
    (window as any).WebKitCSSMatrix || (window as any).MSCSSMatrix;
}

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// Point to the worker source (required for the library to function)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export const convertPdfToText = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument(arrayBuffer).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
};
