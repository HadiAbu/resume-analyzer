import { Link } from "react-router";
import type { Resume } from "types";
import ScoreCircle from "./ScoreCircle";
const renderScoreCard = (title: string, score: number, tips: string[]) => (
  <div className="score-card">
    <h3>{title}</h3>
    <div className="score">
      <span className="score-value">{score}/100</span>
    </div>
    <div className="tips">
      <h4>Tips:</h4>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <Link
      to={`resume/${resume.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold text-2xl break-words">
            {resume.companyName}
          </h2>
          <h3 className="text-lg break-words text-gray-500">
            {resume.jobTitle}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={resume.imagePath}
            alt="resume image"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-b-lg"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;

// <div className="resume-container">
//   <div className="resume-header">
//     <div className="resume-image">
//       <img src={resume.imagePath} alt={resume.jobTitle} />
//     </div>
//     <div className="resume-info">
//       <h1>{resume.jobTitle}</h1>
//       <p className="company">{resume.companyName}</p>
//     </div>
//   </div>

//   <div className="resume-content">
//     <div className="overall-score">
//       <h2>Overall Score</h2>
//       <div className="score-display">
//         <span className="large-score">
//           {resume.feedback.overallScore}/100
//         </span>
//       </div>
//     </div>

//     <div className="feedback-section">
//       <div className="feedback-grid">
//         {renderScoreCard(
//           "ATS Optimization",
//           resume.feedback.ATS.score,
//           resume.feedback.ATS.tips
//         )}
//         {renderScoreCard(
//           "Tone & Style",
//           resume.feedback.toneAndStyle.score,
//           resume.feedback.toneAndStyle.tips
//         )}
//         {renderScoreCard(
//           "Content",
//           resume.feedback.content.score,
//           resume.feedback.content.tips
//         )}
//         {renderScoreCard(
//           "Structure",
//           resume.feedback.structure.score,
//           resume.feedback.structure.tips
//         )}
//         {renderScoreCard(
//           "Skills",
//           resume.feedback.skills.score,
//           resume.feedback.skills.tips
//         )}
//       </div>
//     </div>

//     <div className="resume-pdf">
//       <a href={resume.resumePath} target="_blank" rel="noopener noreferrer">
//         View Full Resume PDF
//       </a>
//     </div>
//   </div>
// </div>
