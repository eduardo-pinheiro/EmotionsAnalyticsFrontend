import React from "react";
import ListItens from "../../../../Components/ListItens";
import { itemOfListItensComponent } from "../../../../Components/ListItens";
import { Test, TestType, People } from "../../../../../Controller";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { PeopleInterface } from "../../../../../Controller/People/interface";
import moment from "moment";

interface OwnProps { }

interface State {
  dataList: Array<itemOfListItensComponent>;
  currentPeople: PeopleInterface;
}

type Props = RouteComponentProps<{}> & OwnProps;

class Person extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: [],
      currentPeople: {
        name: "carregando...",
        email: "carregando...",
        birthday: "carregando...",
      },
    }
  }


  componentDidMount = async () => {
    const params: any = this.props.match.params;
    const peopleId = parseInt(params.peopleId);
    this.setDataList(peopleId);
    this.setPeople(peopleId);
  }


  async setDataList(peopleId: number) {

    const tests = await Test.getTestsByPeopleId(peopleId);
    let dataList: Array<itemOfListItensComponent> = [];

    if (tests) {

      await Promise.all(
        tests.map(async (test) => {

          const testType = await TestType.getTestTypeById(test.test_type_id);
          const people = await People.getPeopleById(test.people_id);

          dataList.push({
            title: testType.title,
            subtitle: people.name,
            link: `/teste/${test.id}`,
          })
        })
      );

      this.setState({ dataList });
    }
  }


  async setPeople(peopleId: number) {
    const currentPeople = await People.getPeopleById(peopleId);
    this.setState({ currentPeople });
  }


  render() {

    const { currentPeople, dataList } = this.state;

    return (
      <section>
        <div className="info">
          <h1>PARTICIPANTE DE TESTES</h1>
          <div className="wrapper">
            <h3>Nome <span>{currentPeople.name}</span></h3>
            <h3>Email <span>{currentPeople.email}</span></h3>
            <h3>Data de Nascimento <span>{moment(currentPeople.birthday).format("DD/MM/YYYY")}</span></h3>
          </div>
        </div>
        {dataList && Array.isArray(dataList) && dataList.length !== 0 ?
          <div>
            <br/>
            <h2>Testes realizados</h2>
            <ListItens data={this.state.dataList} />
          </div>
        : null}
      </section>
    )
  }
}

export default withRouter(Person);
