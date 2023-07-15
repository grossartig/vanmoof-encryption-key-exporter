import Button from "@mui/material/Button"

export default function DownloadButton(props: {
	filename: string,
	content: string,
	buttonText: string
}) {
	const { filename, content, buttonText } = props

	return (
		<Button variant="contained" onClick={() => {
			function download(filename: string, content: string) {
				var element = document.createElement('a')
				element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(content))
				element.setAttribute('download', filename)
				element.style.display = 'none'
				document.body.appendChild(element)
				element.click()
				document.body.removeChild(element)
			}
			download(filename, content)
		}}>Download</Button>
	)
}
