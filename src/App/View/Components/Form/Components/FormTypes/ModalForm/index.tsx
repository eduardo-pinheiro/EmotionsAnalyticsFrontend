import React from "react";
import Form, { Props as ModalProps } from "../../Form";
import loading from "../../../../../../../Assets/loading.svg";

interface StateModalProps {
  mode: "open" | "close" | "loading";
}

interface OwnProps {
  mode?: "open" | "close" | "loading";
}

type Props = OwnProps & ModalProps; 

export class ModalForm extends React.Component<Props, StateModalProps> {

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: "close",
    };
  }


  componentDidMount = () => {
    this.setModeByProps();
  }


  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.mode !== this.props.mode) {
      this.setModeByProps();
    }
  }


  setModeByProps() {
    const mode = this.props.mode ? this.props.mode : "close";
    this.setState({ mode });
  }


  onCancel() {
    if (this.props.onCancel !== undefined) {
      this.props.onCancel();
    }
    this.setState({ mode: "close" });
  }


  render() {
    return (
      <div className={`modal_form ${this.state.mode}`}>
        <div className="wrapper">
          <Form {...this.props} onCancel={() => this.onCancel()} />
          <img className="loading" src={loading} alt="loding"/>
        </div>
      </div>
    )
  }
}