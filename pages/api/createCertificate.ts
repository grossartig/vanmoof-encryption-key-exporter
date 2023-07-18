import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY } from './config'

const API_URL = "https://bikeapi.production.vanmoof.cloud/bikes/"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST" && typeof req.headers.authorization === "string") {
		const token = req.headers.authorization
		// const bikeId = req.query["bikeId"]
		const { bikeId, publicKey } = JSON.parse(req.body)
		const r = await fetch(API_URL + bikeId + "/create_certificate", {
			method: "POST",
			headers: {
				// "Api-Key": API_KEY,
				"Authorization": `Bearer ${token}`,
				"User-Agent": "VanMoof/20 CFNetwork/1404.0.5 Darwin/22.3.0",
			},
			body: JSON.stringify({
				"public_key": publicKey
			})
		})
		const data: unknown = await r.text()
		if (r.status < 400) {
			res.statusCode = 200
			return res.send(data)
		} else {
			res.statusCode = r.status
			return res.send("Error " + r.status)
		}
	}
	res.statusCode = 400
	res.send("Bad request")
}
