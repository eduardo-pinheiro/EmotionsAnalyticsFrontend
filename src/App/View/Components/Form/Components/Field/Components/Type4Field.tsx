import React from "react";
import { FieldInterface } from "../../../Interfaces";

/*====================================================================================================================*/
/*======================================================= Options ====================================================*/
/*====================================================================================================================*/

interface Props {
  keyName: string;
  onChange: Function;
  getOptions: Function;
  value?: any;
}

interface State {
  options: Array<{ label: string, id: number }>;
}

export default class Field4Type extends React.Component<Props & FieldInterface, State> {

  constructor(props: Props & FieldInterface) {

    super(props);

    this.state = {
      options: [],
    }
  }


  componentDidMount = async () => {
    this.setOptions();
  }


  async setOptions() {
    const options = await this.props.getOptions();
    this.setState({ options });
  }


  componentDidUpdate = (prevProps: Props) => {

    const value = this.props.value;

    if ((prevProps.value !== value) && !value) {
      const key = this.props.keyName;
      this.props.onChange("", key);
    }
  }


  renderOptions() {
    return (
      this.state.options.map(({ id, label }) => {
        return (
          <option key={`${id}`} value={id}>{label}</option>
        )
      })
    )
  }


  onChange(event: any) {
    const value = parseInt(event.target.value);
    const key = this.props.keyName;
    this.props.onChange(value, key);
  }


  render() {
    return (
      <select
        required={this.props.required}
        value={this.props.value}
        onChange={(event) => this.onChange(event)}
        onClick={() => this.setOptions()}
      >
        <option value={""}>Nenhum item selecionado</option>
        {this.renderOptions()}
      </select>
    )
  }
} 