import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY } from './config'
import { getCustomerData } from './typesAndInterfaces'

const API_URL = "https://my.vanmoof.com/api/v8/"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = JSON.parse(req.body)
	if (req.method === "POST" && typeof token === "string" && typeof req.headers.authorization === "string") {
		const r = await fetch(API_URL + "getCustomerData?includeBikeDetails", {
			method: "GET",
			headers: {
				"Api-Key": API_KEY,
				"Authorization": `Bearer ${token}`,
				"User-Agent": "VanMoof/20 CFNetwork/1404.0.5 Darwin/22.3.0"
			}
		})
		const data: getCustomerData = await r.json()
		if (r.status < 400) {
			res.statusCode = 200
			return res.json(data.data.bikeDetails)
		} else {
			res.statusCode = r.status
			return res.send("Error " + r.status)
		}
	}
	res.statusCode = 400
	res.send("Bad request")
}
