import React from "react";

type Props = {
  onChangeTitle?: Function;
  onChangeUrl?: Function;
  startUrl: string;
}

export default class Iframe extends React.Component<Props> {

  onChangeIframe() {

    const iframe: any = document.getElementById("iframe-test");
    const title = iframe.title;
    const url = iframe.src;

    if (this.props.onChangeTitle)
      this.props.onChangeTitle(title);

    if (this.props.onChangeUrl)
      this.props.onChangeUrl(url);
  }

  render() {
    return (
      <iframe id="iframe-test" is="x-frame-bypass" onLoad={() => this.onChangeIframe()} src={this.props.startUrl} />
    )
  }
}