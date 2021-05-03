import React from "react";
import { FieldInterface } from "../../../Interfaces";
import moment from "moment";

/*====================================================================================================================*/
/*======================================================= Data =======================================================*/
/*====================================================================================================================*/

interface Props {
  keyName: string;
  onChange: Function;
  value?: any;
}

export default class Field1Type extends React.Component<Props & FieldInterface> {

  onChange(event: any) {

    let dateValue = event.target.value;
    dateValue = moment().format(dateValue);
    const key = this.props.keyName;
    this.props.onChange(dateValue, key);
  }


  render() {
    return (
      <input
        type="date"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.props.value ? this.props.value : ""}
        onChange={(event) => this.onChange(event)}
      />
    )
  }
} 