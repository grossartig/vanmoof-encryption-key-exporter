import Link from '@mui/material/Link';
import getConfig from 'next/config';

export default function Footer() {
	const { publicRuntimeConfig } = getConfig()

	return (
		<footer style={{ textAlign: "center", marginTop: "64px" }}>
			<hr />
			<div style={{ marginTop: "24px" }}>
				<Link href="https://grossartig.io/keyexport/legalnotice">Legal Notice (Impressum)</Link>&nbsp;&nbsp;-&nbsp;&nbsp;<Link href="https://grossartig.io/keyexport/privacy">Privacy Policy</Link>
				<br /><br />
				This project is <Link href="https://github.com/grossartig/vanmoof-encryption-key-exporter" target="_blank">open source</Link>.
				<br /><br />
				Made with &#x1F499; in Germany.<br />
				Coding: <Link href="https://justus-d.de" target="_blank">Justus Dietrich</Link><br />
				Concept: <Link href="https://angelmann.net" target="_blank">Marius Angelmann</Link>
				<br /><br />
				&copy; grossartig.io, 2023
				<br /><br />
				Version: v{ publicRuntimeConfig.version }
			</div>
		</footer>
	)
}
