import CssBaseline from "@mui/material/CssBaseline";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Script from "next/script";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/Footer";
import theme from "@/components/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import { useRef } from "react";
import Button from "@mui/material/Button";

export default function Home() {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const fileUpload = useRef<HTMLInputElement>(null)

	return (
		<>
			<Head>
				<title>VanMoof Encryption Key Exporter</title>
				<meta name="description" content="VanMoof Encryption Key Exporter" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<Script defer data-domain="vanoof.grossartig.io" src="https://plausible.grossartig.io/js/script.js" />
			<ThemeProvider theme={theme(prefersDarkMode)}>
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
						<input type="file" ref={fileUpload} hidden />
						<Button onClick={() => {fileUpload.current?.click()}} variant="contained">Choose file</Button>
						<Footer />
					</div>
				</main>
			</ThemeProvider>
		</>
	)

}
