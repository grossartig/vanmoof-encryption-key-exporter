# VanMoof Encryption Key Exporter

## About

Unfortunately, in recent months news have come up saying VanMoof isn’t in a very good financial state and had to be rescued in December 2022 by a number of unnamed investors, [source](https://archive.ph/ivRfD). Also, at the time of writing this README, end of June 2023, VanMoof has halted all sales. 

The Bluetooth connection between your smartphone and your VanMoof is encrypted for security purposes. Each time you log into your VanMoof account, this encryption key is being downloaded from VanMoof’s server. If these servers will go offline one day - for whatever reason - the encryption keys are lost forever and you have no way of communicating with your bike.

With this tool, we want to make sure everyone can use their VanMoof even after these servers become unreachable - preventing e-waste.

We encourage self hosting this tool, however, if you do not have the technical resources, you can use the version hosted on our server at [https://vanmoof.grossartig.io](https://vanmoof.grossartig.io)

vanmoof.grossartig.io does not store any personal data. Our server acts as a proxy to VanMoof's API as it only allows Access-Control-Allow-Origin: * headers.

## Run - Docker Compose (recommended)
```
docker-compose up -d
```
or 
```
docker compose up -d
```
The server should now be listening on http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Optional: Use reverse proxy to show this on the default http(s) port, 80/443.
## Run - NPM
```
npm install
```
```
npm run build
```
```
npm run start
```
The server should now be listening on http://localhost:3000

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Optional: Use reverse proxy to show this on the default http(s) port, 80/443.

## Legal bits
This project is licensed under GNU GPLv3. 
