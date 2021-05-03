import React from "react";
import { FieldInterface } from "../../../Interfaces";

/*====================================================================================================================*/
/*=================================================== Text Multiple ==================================================*/
/*====================================================================================================================*/

interface Props {
  keyName: string;
  onChange: Function;
  value?: any;
}

export default class Field4Type extends React.Component<Props & FieldInterface> {

  onChange(event:any) {

    const value = event.target.value;
    const key = this.props.keyName;
    
    this.props.onChange(value, key);
  }


  render() {
    return (
      <textarea
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.props.value ? this.props.value : ""} 
        onChange={(event) => this.onChange(event)}
        rows={5}
      />
    )
  }
} 