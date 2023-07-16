import CssBaseline from "@mui/material/CssBaseline";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Script from "next/script";
import { useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from '@mui/material/styles';
import Snackbar from "@mui/material/Snackbar";
import Footer from "@/components/Footer";
import NextLink from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getTheme } from "@/components/theme";
import Alert from "@mui/material/Alert";

export default function Home() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

	const [easteregg, setEasteregg] = useState<number>(0)

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
				{/* <PlausibleProvider domain="vanoof.grossartig.io" customDomain="https://plausible.grossartig.io" /> */}
				<main>
					<div className={styles.main}>
						<div style={{ margin: "0 auto", maxWidth: "fit-content", marginBottom: "32px" }}>
							<Alert variant="filled" severity="info" sx={{ textAlign: "center" }}>This tool is <b>not</b> affiliated with VanMoof B.V.</Alert>
						</div>
						<h1 style={{ textAlign: "center", paddingBottom: "32px" }} onClick={() => setEasteregg(easteregg + 1)}>VanMoof Encryption Key Exporter</h1>
						<Stack direction={"column"} spacing={2} maxWidth={"400px"} sx={{ margin: "0 auto" }}>
							<Button
								href="/account"
								LinkComponent={NextLink}
								variant="contained"
								style={{ textAlign: "center" }}
							>
								Sign in with your VanMoof credentials.
							</Button>
							<div style={{ textAlign: "center" }}>-&nbsp;&nbsp;or&nbsp;&nbsp;-</div>
							<Button
								href="/viewer"
								LinkComponent={NextLink}
								variant="outlined"
								style={{ textAlign: "center" }}
							>
								Open your exported keys
							</Button>
						</Stack>
						<Snackbar
							anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
							open={easteregg > 4}
							onClose={() => {
								setEasteregg(0)
							}}
							message="This is an Internet-of-shit moment."
							key={"snackbar-easteregg"}
						/>
						<Footer />
					</div>
				</main>
			</ThemeProvider>
		</>
	)

}
