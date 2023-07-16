import React, { ReactNode } from "react";

interface Props {
	fallback: ReactNode
	children?: ReactNode
}

interface State {
	hasError: boolean
}

export default class GenericErrorBoundary extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(_: Error): State {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback
		}
		return this.props.children
	}

}
