/** @type {import('next').NextConfig} */

const { readFileSync } = require("node:fs")

const packageJsonRaw = readFileSync("./package.json")
const packageJson = JSON.parse(packageJsonRaw)

const { version } = packageJson

const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		version
	}
}

module.exports = nextConfig
