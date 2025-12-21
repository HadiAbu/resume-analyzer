# Welcome to Resume Analyzer!

A tool designed to help give you feedback and tips on your resume and relevancy for the role, with ATS scores, tips and more!

<img width="1711" height="854" alt="image" src="https://github.com/user-attachments/assets/4eb5e8ae-552e-4424-bb85-df679568e20e" />
<img width="1729" height="848" alt="image" src="https://github.com/user-attachments/assets/58c4ca9f-d0fa-4a6b-8580-2a326e563fbf" />



### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
