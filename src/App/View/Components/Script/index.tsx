import React from "react";

type Props = {
    link: string;
    onLoad?: Function;
}
export default class Script extends React.Component<Props> {

    componentDidMount = () => {

        const script = document.createElement("script");
        script.src = this.props.link;
        script.async = true;
        script.addEventListener("load", () => this.props.onLoad ? this.props.onLoad() : null);
        document.body.appendChild(script);
    }

    render() {
        return null;
    }
}