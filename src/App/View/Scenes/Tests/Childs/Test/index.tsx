import React from "react";
import ListItens from "../../../../Components/ListItens";
import { itemOfListItensComponent } from "../../../../Components/ListItens";
import { Test as TestController, TestType, People } from "../../../../../Controller";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { TestTypeInterface } from "../../../../../Controller/TestType/interface";

interface OwnProps { }

interface State {
  dataList: Array<itemOfListItensComponent>;
  currentTestType: TestTypeInterface;
}

type Props = RouteComponentProps<{}> & OwnProps;

class Test extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dataList: [],
      currentTestType: {
        title: "carregando...",
        start_url: "carregando...",
        objective: "carregando...",
      },
    }
  }


  componentDidMount = async () => {
    const params: any = this.props.match.params;
    const testTypeId = parseInt(params.testTypeId);
    this.setDataList(testTypeId);
    this.setCurrentTestType(testTypeId);
  }


  async setDataList(testTypeId: number) {

    const tests = await TestController.getTestsByTestTypeId(testTypeId);
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


  async setCurrentTestType(testTypeId: number) {
    const currentTestType = await TestType.getTestTypeById(testTypeId);
    this.setState({ currentTestType });
  }


  render() {

    const { currentTestType, dataList } = this.state;

    return (
      <section>
        <div className="info">
          <h1>TIPO DE TESTE</h1>
          <div className="wrapper">
            <h3>Título <span>{currentTestType.title}</span></h3>
            <a href={currentTestType.start_url} target="blank">
              <h3>URL <span>{currentTestType.start_url}</span></h3>
            </a>
          </div>
          <h3>Objetivo <span>{currentTestType.objective}</span></h3>
        </div>
        {dataList && Array.isArray(dataList) && dataList.length !== 0 ?
          <div>
            <br/><br/>
            <h2>Testes realizados</h2>
            <ListItens data={this.state.dataList} />
          </div>
        : null}
      </section>
    )
  }
}

export default withRouter(Test);
