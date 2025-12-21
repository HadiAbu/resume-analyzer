import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { useI18n } from "~/lib/i18n";
import { convertPdfToImage } from "~/lib/pdf2image";
import { usePuterStore } from "~/lib/puter";
import { prepareInstructions } from "~/lib/constants";

const meta = {
  title: "ResTrack | Upload",
  description: "Upload your resume to ResTrack",
};

const upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { t } = useI18n();

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File | null;
  }) => {
    if (!file) return;
    setIsProcessing(true);

    // Upload PDF file
    console.log("Starting analysis...");
    setStatusText(t("upload.processing"));
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) {
      return setStatusText(t("upload.uploadError"));
    }

    // Convert PDF to image
    console.log("Starting conversion...");
    setStatusText(t("upload.converting"));
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      return setStatusText(t("upload.convertError"));
    }

    // Upload image file
    console.log("Starting upload image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      return setStatusText(t("upload.uploadError"));
    }

    const uuid = crypto.randomUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume-${uuid}`, JSON.stringify(data));
    setStatusText(t("upload.analyze"));

    console.log("Starting feedback generation...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({
        jobTitle,
        jobDescription,
      })
    );
    if (!feedback) return setStatusText(t("upload.analyzeError"));

    const feedbackText = typeof (feedback.message.content === "string")
      ? feedback.message.content
      : feedback.message.content[0].text;

    console.log(feedbackText);
    data.feedback = feedbackText;
    console.log(data);
    try {
      await kv.set(`resume-${uuid}`, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving feedback to KV:", e);
      return setStatusText(t("upload.analyzeError"));
    }

    setStatusText(t("upload.AnalysisComplete"));
    setIsProcessing(false);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("companyName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover">
      <Navbar />
      <section className="main-section-upload-form py-16">
        <h3 className="text-[#fff] text-2xl">{t("upload.heading")}</h3>
        <div className="page-heading">
          {isProcessing ? (
            <>
              <h2 className="h2-analysis">{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full"
                alt="processing"
              />
            </>
          ) : (
            <form
              onSubmit={handleSubmit}
              id="upload-form"
              className="flex flex-col gap-4 w-full"
            >
              <div className="form-div">
                <label htmlFor="companyName">
                  <p className="text-white">Company Name</p>
                </label>
                <input type="text" name="companyName" id="companyName" />
              </div>
              <div className="form-div">
                <label htmlFor="jobTitle">
                  <p className="text-white">Job TItle</p>
                </label>
                <input type="text" name="companyName" />
              </div>
              <div className="form-div">
                <label htmlFor="jobDescription">
                  <p className="text-white">Job Description</p>
                </label>
                <textarea rows={5} name="jobDescription" />
              </div>
              <div className="form-div">
                <label htmlFor="uploader"></label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="primary-button align-self-center w-fit"
                >
                  {t("upload.uploadButton")}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
export default upload;
