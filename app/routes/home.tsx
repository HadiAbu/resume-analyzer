import type { Route } from "./+types/home";
import { resumes } from "~/lib/constants";
import Navbar from "~/components/Navbar";
import type { Resume as ResumeType } from "types";
import ResumeComponent from "~/components/Resume";

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
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <h1>Welcome to Resume Analyzer</h1>
        <p>
          Review your resume and get instant feeback to land your dream job!
        </p>
      </section>
      <section className="resumes-section">
        {resumes.map((resume: ResumeType) => (
          <ResumeComponent resume={resume} key={resume.id} />
        ))}
      </section>
    </main>
  );
}
