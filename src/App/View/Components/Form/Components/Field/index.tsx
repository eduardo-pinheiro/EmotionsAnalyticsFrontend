import React from "react";
import { FieldInterface } from "../../Interfaces";

/** Import Field Types */
import Type1Field from "./Components/Type1Field";
import Type2Field from "./Components/Type2Field";
import Type3Field from "./Components/Type3Field";
import Type4Field from "./Components/Type4Field";
import Type5Field from "./Components/Type5Field";
import Type6Field from "./Components/Type6Field";

interface Props {
  keyName: string;
  onChange: Function;
  value?: any;
}

export default class Field extends React.Component<Props & FieldInterface> {

  selectionTypeField(typeId: number) {

    let FieldInput: any;

    switch (typeId) {
      case 1:
        //Simple Text
        FieldInput = Type1Field;
        break;

      case 2:
        //Multiple Text
        FieldInput = Type2Field;
        break;

      case 3:
        //Attachment
        FieldInput = Type3Field;
        break;

      case 4:
        //Options
        FieldInput = Type4Field;
        break;

      case 5:
        //Data
        FieldInput = Type5Field;
        break;

      case 6:
        //Boolean
        FieldInput = Type6Field;
        break;

      default:
        FieldInput = Type1Field;
        break;
    }

    return FieldInput;
  }


  render() {

    const typeId = this.props.typeId;
    const FieldInput = this.selectionTypeField(typeId);

    return (
      <label>
        {this.props.name}
        <FieldInput {...this.props} />
      </label>
    )
  }
} 