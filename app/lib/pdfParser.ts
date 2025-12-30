// Add this at the very top before other imports
if (typeof window !== "undefined" && !window.DOMMatrix) {
  (window as any).DOMMatrix =
    (window as any).WebKitCSSMatrix || (window as any).MSCSSMatrix;
}

// app/src/utils/pdfParser.ts
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// Use a reliable CDN for the worker if local paths fail
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const convertPdfToText = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
};
