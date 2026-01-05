# 📄 Resume AI Analyzer

An AI-powered platform designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). By leveraging OpenAI's GPT models, the application provides detailed feedback, scoring, and actionable tips to improve resume quality.

## ✨ Features

- **PDF Resume Parsing**: Upload and extract text from resumes automatically.
- **AI-Driven Analysis**: Comprehensive evaluation of resume content, tone, and structure.
- **ATS Optimization**: Specific feedback on keywords and formatting to bypass ATS filters.
- **Scoring System**: Visual representation of resume strength across multiple categories.
- **Secure Authentication**: JWT-based user authentication system.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **OpenAI Account**: For API access

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/HadiAbu/resume-analyzer.git](https://github.com/HadiAbu/resume-analyzer.git)
    cd resume-analyzer
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory. You **must** include these two keys for the application to function:

    ```env
    # Your secret key from the OpenAI Dashboard
    OPENAI_API_KEY=your_openai_api_key_here

    # A long, random string used to sign and verify authentication tokens
    JWT_SECRET=your_super_secure_jwt_secret_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Key Configuration

- **OPENAI_API_KEY**: Powers the resume analysis engine. Ensure your account has sufficient credits/quota.
- **JWT_SECRET**: Critical for securing user sessions. Do not share this or commit it to your repository.

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
