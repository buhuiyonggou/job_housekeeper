# Job Housekeeper

## Project Goal
Job Housekeeper is a comprehensive job application management system designed to help users find job opportunities from various platforms, manage their job applications, and analyze their history records. This project serves as a practical implementation of a full-stack Next.js web application.

You can:

- Trace your job applications
- Analyze your application history, by time, category, and status
- Management your resume
- Consult AI for suggestions

## Key Skills and Tools
- **Skills**: TypeScript, Next.js, React, PostgreSQL
- **Tools**: Prisma, Chakra UI, Tailwind CSS, NextAuth, OpenAI(ChatGPT3.5 turbo), Firebase, Uploadthing, Zod, Nodemailer

## Update 12th,July
- **Skills**:Update chatbox design, enabling archive chat history

## Website
Visit the live application: [Job Housekeeper](https://job-housekeeper.vercel.app/)

We provide test account for users to access current data.
- User: ***test@gmail.com***
- Password: ***l13793068***

screenshot-1
![screenshot1](https://github.com/buhuiyonggou/job_housekeeper/assets/105371317/87437f07-847d-4cd9-8d39-8f30f9162105)
screenshot-2
![sceenshot5](https://github.com/buhuiyonggou/job_housekeeper/assets/105371317/eeb25c42-c0c6-4f38-b591-4050fd41f23e)
screenshot-3
![screenshot2](https://github.com/buhuiyonggou/job_housekeeper/assets/105371317/48d3b752-c73a-4b56-a736-c4b80bf8f2a2)
screenshot-4
![screenshot3](https://github.com/buhuiyonggou/job_housekeeper/assets/105371317/f16352eb-1998-4827-8246-67495c981782)
screenshot-5
![screenshot4](https://github.com/buhuiyonggou/job_housekeeper/assets/105371317/97168a14-4c3b-4f53-a242-ba349f3a6eff)
screenshot-6
![image](https://github.com/user-attachments/assets/bc92ef0b-433b-4a39-8349-6b4c580951ea)

## Environment Requirements
To run this project, you need the following environment variables:
- `DATABASE_URL` -- prisma database url
- `NEXTAUTH_SECRET`-- nextAuth secret
- `GOOGLE_CLIENT_ID`-- google signin id
- `GOOGLE_CLIENT_SECRET`- google signin secret
- `GITHUB_ID` -- github signin id
- `GITHUB_SECRET` -- github signin secret
- `AUTH_EMAIL_USER` -- nextAuth credential user
- `AUTH_EMAIL_PASS` -- nextAuth credential password
- `UPLOADTHING_SECRET`-- uploadingthings lib secret
- `UPLOADTHING_APP_ID`-- uploadingthings id
- `NEXT_PUBLIC_RAPIDAPI_KEY`-- X-RapidAPI key
- `NEXT_PUBLIC_OPENAI_API_KEY`-- OpenAI3.5 key
- `Firebase setup`

## Getting Started
First, install the necessary dependencies:
```bash
npm install
npm run dev
npm run build
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Further Plans
- Deep Analysis of application competitiveness using AI tools.
- Job posting notifications from favorite companies.
- Auto-notification when a company reaches out.

