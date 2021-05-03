import React from "react";
import { FieldInterface } from "../../../Interfaces";

/*====================================================================================================================*/
/*==================================================== Text Simple ===================================================*/
/*====================================================================================================================*/

interface Props {
  keyName: string;
  onChange: Function;
  value?: any;
}

export default class Field1Type extends React.Component<Props & FieldInterface> {

  onChange(event: any) {

    const value = event.target.value;
    const key = this.props.keyName;

    this.props.onChange(value, key);
  }


  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.props.value ? this.props.value : ""}
        onChange={(event) => this.onChange(event)}
      />
    )
  }
} 