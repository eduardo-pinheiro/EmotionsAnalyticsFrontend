import React from "react";
import Field from "./Field";
import { FieldInterface } from "../Interfaces";

export interface Props {
  onSubmit: Function;
  form: Array<FieldInterface>;
  onCancel?: Function;
  submitLabel?: string;
}

interface State {
  values: Object;
}

export default class Form extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      values: {},
    };
  }


  onChange(value: any, key: string) {
    let values: any = this.state.values;
    values[key] = value;
    this.setState({ values });
  }


  async onSubmit(event: any) {
    event.preventDefault();
    const values = this.state.values;
    await this.props.onSubmit(values);
    this.resetValue();
  }


  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    } 
    this.resetValue();
  }

  
  resetValue() {
    this.setState({ values: {} });
  }


  renderform() {
    return (
      this.props.form.map((field: FieldInterface) => {

        const values: any = this.state.values;
        const value = values[field.key];

        return (
          <Field
            {...field}
            keyName={field.key}
            value={value}
            onChange={(value: any, key: string) => this.onChange(value, key)}
          />
        )
      })
    )
  }


  render() {

    const submitLabel = this.props.submitLabel ? this.props.submitLabel : "Cadastrar";

    return (
      <form className="form" onSubmit={(event) => this.onSubmit(event)}>

        {this.renderform()}

        <div className="wrapper_buttons">
          <div className="magic_wrapper">

            {this.props.onCancel ?
              <div
                className="button" 
                onClick={() => this.onCancel()}
              >
                Cancelar
              </div>
              : null}

            <input className="button" type="submit" value={submitLabel} />

          </div>
        </div>
      </form>
    )
  }
}