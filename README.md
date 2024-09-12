# Brutal Barb

## Formação.DEV project

Next.js/React, Nest.js, React Native and TypeScript project;

## 1. Install dependencies

Run the following commands:

```sh
yarn
```

```sh
yarn build
```

```sh
yarn dev
```

## 2. Configure the Backend

Create a .env file in the root folder and add the following variables:
DATABASE_URL=postgresql://name:password@localhost:5432/brutal_barb
JWT_SECRET=

Go to the backend folder and run the following command:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Cope the secret key and add it to the .env file.

```sh
npx prisma generate
```

```sh
npx prisma migrate dev
```

```sh
npx prisma db seed
```

## 3.Configure the Frontend

Go to the frontend folder and run the following command:
Create a .env file in the root folder and add the following variables:
NEXT_PUBLIC_API_URL=http://localhost:4000

Check the need of rebuilding and/or restarting the server.
