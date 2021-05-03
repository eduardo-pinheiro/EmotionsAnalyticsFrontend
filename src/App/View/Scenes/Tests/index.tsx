import React from "react";
import ListItens from "../../Components/ListItens";
import { itemOfListItensComponent } from "../../Components/ListItens";
import { TestType } from "../../../Controller";
import { TestTypeInterface } from "../../../Controller/TestType/interface";

interface Props { }

interface State {
  dataList: Array<itemOfListItensComponent>
}

export default class Tests extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: []
    }
  }


  componentDidMount = async () => {

    const testTypes: Array<TestTypeInterface> = await TestType.getTestTypes();
    let dataList: Array<itemOfListItensComponent> = [];

    
    testTypes.map((testType) => {
      dataList.push({
        title: testType.title,
        subtitle: testType.objective,
        link: `tiposdeteste/${testType.id}`,
      })
    });

    this.setState({ dataList });
  }


  render() {
    return (
      <ListItens data={this.state.dataList} />
    )
  }
}