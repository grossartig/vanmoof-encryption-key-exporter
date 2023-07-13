import { useMemo } from "react";
import { deepOrange, indigo } from "@mui/material/colors";
import { createTheme } from '@mui/material/styles';

export default function theme(prefersDarkMode: boolean) {
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					primary: {
						main: prefersDarkMode ? indigo[300] : indigo[900],
					},
					secondary: deepOrange,
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	)
	return theme
}
