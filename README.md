This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

- Created a Next Js Project
- Setup Next Auth
- Setup Tailwind Configuration
- Created Hero Section 
- Creating a Search Component

- Next Js supports the prefetching and ui loading with client side navigation on submission in Form component of React 19

- Form
    - Has Action and scroll property
    - Contains an Input tag 

- We have created a Search  Form Component and Search Form Reset Component so that user can search and then after that the form resets itself.
- Because our reset component will work on client side not on server side

- Created a Search Form Component

- Createtd Startup Card Component

- Learned how Next Js handles external image links

- Login into sanity and setup sanity

- Install Sanity Cli

- Exploring Sanity Studio

- Go to Sanity Folder
    - In SchemaTypes
        - author.ts
            - define author as in mongoose

    - use it in index.ts

    - now structure it in structure.ts

    - Now create Startup schema in startup.ts

    - add startup in index.ts

- install npm i sanity-plugin-markdown

in sanity config add markdown in plugins

- in your layout.tsx 
- easymde is used for markdown


- create a author and startup

- then in order to use the schema you need to use 
    GROQ Query Language

- go in your lib in sanity folder and create a 
    - queries.ts file

    - write that query there

- now in your page.tsx file import that query and use it there

- add the startupTypeCard

- extract the schemas
- npx sanity@latest schema extract --path=./sanity/extract.json

- create new file in your root folder 
    - sanity.typegen.json
        in that add 1 configuration object

        - we are not using source folder

        - then run the command 
            - npx sanity@latest typegen generate

        - modity your package.json file

    - finally let's define the startup card type
    StartupCard.tsx 
        export type StartupCard


        - we will be using sanity live functionality

        - npm i server-only

        - create new utility file in lib
            - live.ts
        - in env variables use
            - next public sanity api version="vX"

        - in your page.tsx you can easily use sanity fetch 

        - we can render our data without even refreshing the page    

        - install the server-only package in our project

        - creating a details page 

        in your startup id page.tsx
            - use the search params 
            - then create a new query
            - startup by id query

            - in your next.config.ts you have to add experemental tag to use it

            - export it into your page.tsx

             "next": "15.0.0-canary.183",
             "next-sanity": "^9.5.1-canary.23",

             install the markdown-it package

             add shadcn skeleton

             - creating a new component view.tsx

             - create a ping component also 

             - write a seperate sanity query startup views query

             - setup the write client 

             - it will be done in sanity dashboard in project's api section