import React from "react";
import { FieldInterface } from "../../../Interfaces";

/*====================================================================================================================*/
/*======================================================= Boolean ====================================================*/
/*====================================================================================================================*/

interface Props {
  keyName: string;
  onChange: Function;
  value?: any;
  defaultValue: boolean;
}

interface State {
  value: boolean;
  options: Array<{ label: string, valueOption: number }>;
}

export default class Field6Type extends React.Component<Props & FieldInterface, State> {

  constructor(props: Props & FieldInterface) {

    super(props);

    this.state = {
      value: this.props.defaultValue,
      options: [
        { label: "Sim", valueOption: 1 },
        { label: "Não", valueOption: 0 },
      ],
    }
  }


  componentDidMount = async () => {
    const key = this.props.keyName;
    const value = this.state.value;
    this.props.onChange(value, key);
  }


  componentDidUpdate = (prevProps: Props) => {

    const value = this.props.value;

    if (prevProps.value !== value) {
      const defaultValue = this.props.defaultValue;
      const key = this.props.keyName;
      let stateValue = this.props.value;
      if (value === undefined) {
        stateValue = defaultValue;
        this.props.onChange(defaultValue, key);
      }
      this.setState({ value: stateValue });
    }
  }


  renderOptions() {
    return (
      this.state.options.map(({ valueOption, label }) => {
        return (
          <option key={`${valueOption}`} value={valueOption}>{label}</option>
        )
      })
    )
  }


  onChange(event: any) {
    const retryValue = parseInt(event.target.value);
    const value = retryValue ? true : false;
    const key = this.props.keyName;
    this.props.onChange(value, key);
    this.setState({ value });
  }


  render() {
    return (
      <select
        required={this.props.required}
        value={this.state.value ? 1 : 0}
        onChange={(event) => this.onChange(event)}
      >
        {this.renderOptions()}
      </select>
    )
  }
}