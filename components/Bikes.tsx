import { bikeDetails } from "@/pages/api/typesAndInterfaces"
import GenericErrorBoundary from "./GenericErrorBoundary"
import Alert from "@mui/material/Alert"

export default function Bikes(props: {
	bikes: bikeDetails[]
	fallback?: React.ReactNode
}) {
	const { bikes, fallback } = props

	let parsedBikes: React.ReactNode[] | null = []

	try {
		parsedBikes.push(bikes.map(bike => {
			try {
				return (
					<div key={bike.name + "-" + bike.bikeId}>
						<h4>{bike.name}</h4>
						<ul>
							{ bike?.frameNumber && <li>Frame Number: <code>{bike.frameNumber}</code></li> }
							{ bike?.frameSerial && <li>Frame Serial: <code>{bike.frameSerial}</code></li> }
							{ bike?.macAddress && <li>MAC Address: <code>{bike.macAddress}</code></li> }
							{ bike?.key?.encryptionKey && <li>Encryption Key: <code>{bike.key.encryptionKey}</code></li> }
							{ bike?.key?.passcode && <li>Passcode: <code>{bike.key.passcode}</code></li> }
							{ bike?.key?.userKeyId && <li>User Key ID: <code>{bike.key.userKeyId}</code></li> }
							{ !bike?.key && <li>
								Your bike seems to have a currently not supported mechanism for connecting to it.
								We are aware of this and are working on supporting these bike models. Please come
								back in a few days.
							</li> }
						</ul>
					</div>
				)
			} catch (e) { console.log(e) }
			return null
		}))
	} catch {
		return fallback || null
	}

	return parsedBikes
}
