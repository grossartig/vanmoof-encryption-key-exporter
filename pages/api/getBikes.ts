import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY } from './config'

const API_URL = "https://my.vanmoof.com/api/v8/"

interface getCustomerData {
	data: {
		uuid: string,
		name: string,
		email: string,
		confirmed: boolean,
		privacyPolicyAccepted: boolean,
		phone: string,
		country: string,
		bikes: Array<{
			id: number,
			name: string,
			frameNumber: string,
			bikeId: string,
			frameSerial: null,
			pendingSmartmoduleMacAddress: null,
			macAddress: string,
			mainEcuSerial: null,
			bleProfile: string,
			controller: string,
			eLock: boolean,
			speaker: boolean,
			smartmoduleCurrentVersion: string, // SemVer?
			smartmoduleDesiredVersion: null,
			highestAvailableSpeedLimit: null,
			tripDistance: number,
			modelName: string,
			modelColor: {
				name: string, // "Dark",
				primary: string, // "#25282a"
				secondary: string, // "#25282a"
			},
			frameShape: string, // "S",
			customerRole: string, // "owner",
			permissions: Array<string>
				// "ADD_USER" |
				// "FIRMWARE_UPDATES" |
				// "REMOVE_USER" |
				// "REPORT_FOUND" |
				// "REPORT_STOLEN" |
				// "SEND_STATISTICS" |
				// "BACKUP_CODE" |
				// "BIKE_NAME"| 
				// "VIEW_THEFT_CASES" |
				// "ALARM_SETTINGS" |
				// "COUNTRY_SETTINGS" |
				// "LIGHTS" |
				// "MOTOR_SUPPORT_LEVEL" |
				// "UNLOCK" |
				// "READ_VALUES" |
				// "STOLEN_MODE" |
				// "SWAP_SMARTMODULE"
			isTracking: false,
			stolen: {
				isStolen: false,
				dateStolen: null,
				status: string, // "not_stolen",
				latestLocation: null
			},
			links: {
				thumbnail: string,
				show: string
			}
		}>,
		hasPendingBikeSharingInvitations: boolean,
		links: {
			hash: string, // URL
			devices: string, // URL
			resendConfirmation: null,
			update: string, // URL
			addBike: string, // URL
			addFcmToken: string // URL
		},
		bikeDetails: Array<{
			id: number,
			name: string,
			frameNumber: string,
			bikeId: string,
			frameSerial: null,
			ownerName: string,
			tripDistance: number,
			pendingSmartmoduleMacAddress: null,
			macAddress: string,
			mainEcuSerial: null,
			smartmoduleCurrentVersion: string, // SemVer?
			smartmoduleDesiredVersion: null,
			changeBackupCode: false,
			isTracking: false,
			highestAvailableSpeedLimit: null,
			messageAvailable: false,
			modelName: string,
			modelDetails: {
				"Gears": string,
				"Motor": string,
				"Top Speed": string,
				"Range": string,
				"Edition": string
			},
			modelColor: {
				name: string, // "Light",
				primary: string, // "#7a99ac",
				secondary: string // "#7a99ac"
			},
			frameShape: string,
			manufacturer: string,
			controller: string,
			updateMethod: string,
			eLock: true,
			gsmModule: string,
			speaker: true,
			bleProfile: string,
			bleVersion: null,
			messagesViaBLE: string,
			customerRoleFamily: string,
			customerRole: string,
			permissions: Array<string>
				// "ADD_USER",
				// "FIRMWARE_UPDATES",
				// "REMOVE_USER",
				// "REPORT_FOUND",
				// "REPORT_STOLEN",
				// "SEND_STATISTICS",
				// "BACKUP_CODE",
				// "BIKE_NAME",
				// "VIEW_THEFT_CASES",
				// "ALARM_SETTINGS",
				// "COUNTRY_SETTINGS",
				// "LIGHTS",
				// "MOTOR_SUPPORT_LEVEL",
				// "UNLOCK",
				// "READ_VALUES",
				// "STOLEN_MODE",
				// "SWAP_SMARTMODULE"
			key: {
				encryptionKey: string // 32 hex chars e.g. "abababababababababababababababab"
				passcode: string, // 12 hex chars e.g. "abababababab",
				userKeyId: number // 1
			},
			isFactoryKey: boolean,
			customerCount: number,
			invitationCount: number,
			stolen: {
				isStolen: false,
				dateStolen: null,
				status: string, // "not_stolen",
				latestLocation: null
			},
			hasPeaceOfMind: boolean,
			peaceOfMind: null,
			links: {
				hash: string, // URL
				thumbnail: string // URL
			}
		}>,
	},
	hash: string
}

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
				"Authorization": `Bearer ${token}`
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