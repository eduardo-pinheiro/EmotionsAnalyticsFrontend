import React from "react";

//Components
import ListItens from "../../Components/ListItens";

//Controllers
import { itemOfListItensComponent } from "../../Components/ListItens";
import { Test, TestType, People } from "../../../Controller";

interface Props { }

interface State {
  dataList: Array<itemOfListItensComponent>;
}

export default class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: [],
    }
  }

  componentDidMount = async () => {

    const tests = await Test.getTests();
    let dataList: Array<itemOfListItensComponent> = [];

    await Promise.all(
      tests.map(async (test) => {

        const testType = await TestType.getTestTypeById(test.test_type_id);
        const people = await People.getPeopleById(test.people_id);

        dataList.push({
          title: testType.title,
          subtitle: people.name,
          link: `/teste/${test.id}`
        })
      })
    )

    this.setState({ dataList });
  }

  render() {    
    return (
      <ListItens data={this.state.dataList} />
    )
  }
}