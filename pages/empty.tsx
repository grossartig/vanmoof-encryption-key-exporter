import CssBaseline from "@mui/material/CssBaseline";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import Script from "next/script";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/Footer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTheme } from "@/components/theme";
import { useMemo } from "react";

export default function Home() {

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

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
						<Footer />
					</div>
				</main>
			</ThemeProvider>
		</>
	)

}
