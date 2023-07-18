import Button from "@mui/material/Button"

export default function DownloadButton(props: {
	filename: string,
	content?: string,
	contentObject?: any,
	buttonText: string
}) {
	const { filename, content, contentObject, buttonText } = props

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
			const text = content || JSON.stringify(contentObject)
			download(filename, text)
		}}>Download</Button>
	)
}
