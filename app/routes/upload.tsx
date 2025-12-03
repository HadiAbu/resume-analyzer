import { useState } from "react";
import Navbar from "~/components/Navbar";
import { useI18n } from "~/lib/i18n";

const upload = () => {
  const [isProccessing, setIsProcessing] = useState(false);
  const { t } = useI18n();

  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <div className="page-heading">
          <h3 className="text-[#fff] text-2xl">{t("upload.heading")}</h3>
        </div>
      </section>
    </main>
  );
};

export default upload;
