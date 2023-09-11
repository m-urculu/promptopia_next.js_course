## Promptopia

A full-stack Next.js application for discovering & sharing text and image AI prompts.

Features:
Sign-in with google account, post prompts to a mongoDB storage, UX/UI built with React & TailwindCSS front-end for better experience and the Next.js framework for the back-end for easy setup and fast performance. Hosted by Vercel with excelent SEO.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Source

Course from: 

- [JavaScript Mastery Youtube](https://www.youtube.com/watch?v=wm5gMKuwSYk&t=11502s&ab_channel=JavaScriptMastery)

- [GitHub Page](https://github.com/adrianhajdin/project_next_13_ai_prompt_sharing)


## My Added Features:

- Re-color to a darker theme.
- Image support for stable diffusion and midjourney prompts.
    - Image upload and store in DB in base64 format.
    - Retrieve and decrypt image format to posts.
- Text or Image filter button.



## My Final Website: 
- [Promptopia Site](https://promptopia-next-js-course.vercel.app)

## Getting Started

First, install dependencies:

```bash
npm i
# or
yarn
# or
pnpm i
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Third, create a .env file for your Google Cloud, MongoDB and NextAuth and fill out your credentials:

```.env
# GOOGLE 
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=

# MONGODB 
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_URI=

# LOCAL NEXT
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=

# DEPLOYMENT VERCEL
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=  
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


##
Special thanks to [Adrian](https://github.com/adrianhajdin) for the great course!
