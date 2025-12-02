import type { Resume } from "types";

const ResumeComponent = ({ resume }: { resume: Resume }) => {
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

  return (
    <div className="resume-container">
      <div className="resume-header">
        <div className="resume-image">
          <img src={resume.imagePath} alt={resume.jobTitle} />
        </div>
        <div className="resume-info">
          <h1>{resume.jobTitle}</h1>
          <p className="company">{resume.companyName}</p>
        </div>
      </div>

      <div className="resume-content">
        <div className="overall-score">
          <h2>Overall Score</h2>
          <div className="score-display">
            <span className="large-score">
              {resume.feedback.overallScore}/100
            </span>
          </div>
        </div>

        <div className="feedback-section">
          <div className="feedback-grid">
            {renderScoreCard(
              "ATS Optimization",
              resume.feedback.ATS.score,
              resume.feedback.ATS.tips
            )}
            {renderScoreCard(
              "Tone & Style",
              resume.feedback.toneAndStyle.score,
              resume.feedback.toneAndStyle.tips
            )}
            {renderScoreCard(
              "Content",
              resume.feedback.content.score,
              resume.feedback.content.tips
            )}
            {renderScoreCard(
              "Structure",
              resume.feedback.structure.score,
              resume.feedback.structure.tips
            )}
            {renderScoreCard(
              "Skills",
              resume.feedback.skills.score,
              resume.feedback.skills.tips
            )}
          </div>
        </div>

        <div className="resume-pdf">
          <a href={resume.resumePath} target="_blank" rel="noopener noreferrer">
            View Full Resume PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeComponent;
