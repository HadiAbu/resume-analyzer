import type { Route } from "./+types/home";
import { resumes } from "~/lib/constants";
import Navbar from "~/components/Navbar";
import type { Resume as ResumeType } from "types";
// import ResumeComponent from "~/components/Resume";
import ResumeCard from "~/components/Resume";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useI18n } from "~/lib/i18n";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    {
      name: "description",
      content: "Free Resume Analyzer for Students and Professionals eveywhere!",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { auth, kv } = usePuterStore();

  // useEffect(() => {
  //   if (!auth.isAuthenticated) navigate("/auth?next=/");
  // }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-color.jpg')] bg-cover">
      <Navbar />
      <section className="main-section py-16">
        <h1 className="font-bold text-center">{t("homepage.welcome")}</h1>
        <p className="text-2xl text-center text-white">
          {t("homepage.subtitle")}
        </p>
      </section>
      {resumes && resumes.length > 0 && (
        <section className="resumes-section">
          {resumes.map((resume: ResumeType) => (
            <ResumeCard resume={resume} key={resume.id} />
          ))}
        </section>
      )}
    </main>
  );
}
