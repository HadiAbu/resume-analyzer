import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { useI18n } from "~/lib/i18n";
import { convertPdfToImage } from "~/lib/pdf2image";
import { usePuterStore } from "~/lib/puter";
import { prepareInstructions } from "~/lib/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useResumeStore } from "~/hooks/useResumeStore";

const meta = {
  title: "ResTrack | Upload",
  description: "Upload your resume to ResTrack",
};

const upload = () => {
  // const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");

  // const uuid = crypto.randomUUID();
  // const [resume, setResume] = useLocalStorage(uuid, {});

  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const { analyzeResume, isAnalyzing } = useResumeStore();
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

    if (!file || !jobTitle || !jobDescription) return;

    // The store now handles the conversion and the axios call
    await analyzeResume(file, jobTitle, jobDescription);

    // Upload PDF file
    setStatusText(t("upload.processing"));
    setStatusText(t("upload.AnalysisComplete"));
    setIsProcessing(false);
    const uuid = crypto.randomUUID();
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
        <h3 className="text-[#fff] text-2xl text-center">
          {t("upload.heading")}
        </h3>
        <div className="page-heading">
          {isProcessing ? (
            <>
              <h3 className="h2-analysis">{statusText}</h3>
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
                  <p className="text-white">{t("upload.companyName")}</p>
                </label>
                <input type="text" name="companyName" id="companyName" />
              </div>
              <div className="form-div">
                <label htmlFor="jobTitle">
                  <p className="text-white">{t("upload.jobTitle")}</p>
                </label>
                <input type="text" name="jobTitle" id="jobTitle" />
              </div>
              <div className="form-div">
                <label htmlFor="jobDescription">
                  <p className="text-white">{t("upload.jobDescription")}</p>
                </label>
                <textarea rows={5} name="jobDescription" id="jobDescription" />
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
