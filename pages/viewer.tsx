import CssBaseline from "@mui/material/CssBaseline";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Script from "next/script";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/Footer";
import { getTheme } from "@/components/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { bikeDetails } from "./api/typesAndInterfaces";
import GenericErrorBoundary from "@/components/GenericErrorBoundary";
import Bikes from "@/components/Bikes";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Home() {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])
	const fileUpload = useRef<HTMLInputElement>(null)
	const [filename, setFilename] = useState<string>("")
	const [error, setError] = useState<boolean>(false)
	const [bikes, setBikes] = useState<bikeDetails[] | null>(null)
	const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		setError(false)
		setBikes(null)
		console.log(event.currentTarget.files)
		const files = event.currentTarget.files
		if (files && files?.length > 0) {
			try {
				setFilename(files[0].name)
				const data = JSON.parse(await files[0].text())
				setBikes(data)
			} catch (e) {
				setError(true)
			}
		}
	}

	return (
		<>
			<Head>
				<title>VanMoof Encryption Key Exporter</title>
				<meta name="description" content="VanMoof Encryption Key Exporter" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<Script defer data-domain="vanoof.grossartig.io" src="https://plausible.grossartig.io/js/script.js" />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<main>
					<div className={styles.main}>
						<h1 style={{ textAlign: "center" }}>Encryption Key Viewer</h1>
						<Button
							href="/"
							LinkComponent={NextLink}
							variant="outlined"
							style={{ textAlign: "center" }}
						>
							Back
						</Button>
						<p>
							View your encryption keys. The file you need to open is the same file
							that you can download on the <Link href="/account" component={NextLink}>account page</Link>.
						</p>
						<Stack direction="row">
							<Button onClick={() => {fileUpload.current?.click()}} variant="contained">Choose file</Button>
							{filename && <div style={{ height: "100%", margin: "auto 0", marginLeft: "12px" }}>{filename}</div>}
						</Stack>
						<input
							type="file"
							ref={fileUpload}
							hidden
							onChange={onUpload}
						/>
						<div style={{ marginTop: "24px" }}>
							{error && <Alert severity="error">An error has occurred. The bike data may be corrupt.</Alert>}
							{bikes &&
								<GenericErrorBoundary fallback={<p>Something went wrong.</p>}>
									<Bikes viewerMode bikes={bikes} fallback={<Alert severity="error">The bike data seems to be corrupt.</Alert>} />
								</GenericErrorBoundary>
							}
						</div>
						<Footer />
					</div>
				</main>
			</ThemeProvider>
		</>
	)

}
