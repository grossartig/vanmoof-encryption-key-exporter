# VanMoof Encryption Key Exporter

## About

Unfortunately, in recent days news have come up saying VanMoof isn’t in a very good financial state and had to be rescued in December 2022 by a number of unnamed investors, [source](https://archive.ph/ivRfD).

The Bluetooth connection between your smartphone and your VanMoof is encrypted for security purposes. Each time you log into your VanMoof account, this encryption key is being downloaded from VanMoof’s server. If these servers will go offline one day - for whatever reason - the encryption keys are lost forever and you have no way of communicating with your bike.

With this, we want to make sure everyone can use their VanMoof even after these servers become unreachable.

You can either use our tool on vanoof.grossartig.io or build it yourself.

vanoof.grossartig.io does not store any personal data. Our server acts as a proxy to VanMoof's API as it only allows Access-Control-Allow-Origin: * headers.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Legal bits

This project is licensed under GNU GPLv3.