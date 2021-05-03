import React from "react";

//Components
import ListItens from "../../Components/ListItens";

//Controllers
import { itemOfListItensComponent } from "../../Components/ListItens";
import { People } from "../../../Controller";

interface Props { }

interface State {
  dataList: Array<itemOfListItensComponent>;
}

export default class Persons extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: [],
    }
  }

  componentDidMount = async () => {

    const peoples = await People.getPeoples();
    let dataList: Array<itemOfListItensComponent> = [];

    peoples.map((people) => {
      dataList.push({
        title: people.name,
        subtitle: people.email,
        link: `pessoas/${people.id}`,
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