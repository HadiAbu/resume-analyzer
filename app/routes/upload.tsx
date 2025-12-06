import { useState } from "react";
import Navbar from "~/components/Navbar";
import { useI18n } from "~/lib/i18n";

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusText("Processing your resume...");
  };

  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h3 className="text-[#fff] text-2xl">{t("upload.heading")}</h3>
          {isProcessing ? (
            <>
              <h2 className="text-[#fff] text-2xl">{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full"
                alt="processing"
              />
            </>
          ) : (
            <form onSubmit={handleSubmit} id="upload-form">
              <input type="file" name="resume" id="resume" />
              <button type="submit" className="primary-button">
                Upload Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
export default upload;
