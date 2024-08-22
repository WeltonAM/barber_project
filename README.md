# Brutal Barb

## Formação.DEV project

Run the following command:

```sh
yarn
```

Create a .env file in the root folder and add the following variables:
DATABASE_URL=postgresql://name:password@localhost:5432/brutal_barb
JWT_SECRET=

Go to the backend folder and run the following command:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```sh
yarn dev
```

```sh
npx prisma db seed
```

Go to the frontend folder and run the following command:
Create a .env file in the root folder and add the following variables:
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000

Go to the root folder and run the following command:

```sh
yarn build
```

```sh
yarn run dev
```

Next.js/React, Nest.js, React Native and TypeScript project;
