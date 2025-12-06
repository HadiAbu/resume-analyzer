import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { useI18n } from "~/lib/i18n";

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusText(t("upload.processing"));
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
              <h2 className="text-white text-2xl">{statusText}</h2>
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
