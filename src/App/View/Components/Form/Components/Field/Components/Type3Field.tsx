import React from "react";
import { FieldInterface } from "../../../Interfaces";

/*====================================================================================================================*/
/*===================================================== Attachment ===================================================*/
/*====================================================================================================================*/

interface Props {
  keyName: string;
  onChange: Function;
  value?: any;
}

export default class Field3Type extends React.Component<Props & FieldInterface> {

  onChange(event: any) {

    const value = event.target.value;
    const key = this.props.keyName;

    this.props.onChange(value, key);
  }


  render() {
    return (
      <input
        type="file"
        required={this.props.required}
        value={this.props.value ? this.props.value : ""}
        onChange={(event) => this.onChange(event)}
      />
    )
  }
} 