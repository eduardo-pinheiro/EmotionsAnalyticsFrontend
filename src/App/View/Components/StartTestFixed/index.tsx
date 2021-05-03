import React from "react";

//Components
import Icon from "../Icon";
import { ModalForm } from "../Form/Components/FormTypes/ModalForm";

//Controllers
import { Test, Occurrence, TestType } from "../../../Controller";
import { TestInterface } from "../../../Controller/Test/interface";
import { OccurrenceInterface } from "../../../Controller/Occurrence/interface";

//Libraries
import { Affectiva, capitalizeObjectKeys } from "../../../Logic/Library";
import toastr from "toastr";

//Redux
import { connect } from "react-redux";
import { ReducerState } from "../../../Redux/Interfaces";
import { changeTestGoingOn, changeCurrentUrl } from "../../../Redux/Actions";
import { TestTypeInterface } from "../../../Controller/TestType/interface";

interface ReduxState {
  testGoingOn: boolean;
  currentUrl: string;
  currentTitle: string;
  changeTestGoingOn: Function;
  changeCurrentUrl: Function;
}

type Props = ReduxState;

interface State {
  formMode: "open" | "close" | "loading";
}

class StartTestFixed extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      formMode: "close",
    };
  }


  async onSubmit(values: TestInterface) {

    this.setState({ formMode: "loading" });
    let test = new Test(values);
    const testValue: TestInterface = await test.postValue();
    const testType: TestTypeInterface = await TestType.getTestTypeById(values.test_type_id);

    if (testValue.id !== undefined && testType.start_url !== undefined) {
      this.props.changeCurrentUrl(testType.start_url);
      this.startAffectiva(testValue.id);
    } else {
      toastr.error(
        "Algo deu errado, tente novamente mais tarde",
        undefined,
        {
          positionClass: "toast-bottom-left",
          timeOut: 1500,
        }
      );
      this.setState({ formMode: "close" });
    }
  }


  startAffectiva(testId: number) {

    const loadingTeoastr = toastr.info(
      "Inicializando Teste...",
      undefined,
      {
        positionClass: "toast-bottom-left",
        timeOut: 1000000000,
      }
    );

    Affectiva.onInitializeFailure = () => {
      toastr.clear(loadingTeoastr);
      toastr.error(
        "A inicialização do algoritmo de coleta de emoções falhou, tente novamente mais tarde",
        undefined,
        {
          positionClass: "toast-bottom-left",
          timeOut: 1500,
        }
      );
      this.setState({ formMode: "close" });
    }

    Affectiva.onWebcamConnectFailure = () => {
      toastr.clear(loadingTeoastr);
      toastr.error(
        "Não foi possível conectar com a sua webcam, tente novamente mais tarde",
        undefined,
        {
          positionClass: "toast-bottom-left",
          timeOut: 1500,
        }
      );
      this.setState({ formMode: "close" });
    };

    Affectiva.onInitializeSuccess = () => {
      if (!this.props.testGoingOn) {
        this.props.changeTestGoingOn(true);
        toastr.clear(loadingTeoastr);
        this.setState({ formMode: "close" });
      }
    }

    Affectiva.onImageResultsSuccess = (faces: any, image: any, timestamp: any) => {

      if (faces && Array.isArray(faces) && faces.length !== 0) {

        let { expressions, emotions, appearance, emojis } = faces[0];
        const TestId = testId;
        // const Emoji = emojis.dominantEmoji;
        // const Time = timestamp;

        const occurrenceValue: OccurrenceInterface = {
          occurrence: {
            test: {
              id: TestId,
            },
            people_appearance: {
              age: appearance.age,
              gender: appearance.gender,
              glasses: appearance.glasses,
            },
            emotion: {
              anger: emotions.anger,
              contempt: emotions.contempt,
              disgusted: emotions.disgusted,
              fear: emotions.fear,
              joy: emotions.joy,
              sadness: emotions.sadness,
              valence: emotions.valence,
              engagement: emotions.engagement,
            },
            expression: {
              attention: expressions.attention,
              brow_furrow: expressions.browFurrow,
              brow_raise: expressions.browRaise,
              cheek_raise: expressions.cheekRaise,
              chin_raise: expressions.chinRaise,
              dimpler: expressions.dimpler,
              eye_closure: expressions.eyeClosure,
              eye_widen: expressions.eyeWiden,
              inner_brow_raise: expressions.innerBrowRaise,
              jaw_drop: expressions.jawDrop,
              lid_tighten: expressions.lidTighten,
              lip_corner_depressor: expressions.lipCorner,
              lip_press: expressions.lipPress,
              lip_pucker: expressions.lipPucker,
              lip_stretch: expressions.lipStrech,
              lip_suck: expressions.lipSuck,
              mouth_open: expressions.mouthOpen,
              nose_wrinkle: expressions.noseWrinkle,
              smile: expressions.smile,
              smirk: expressions.smirk,
              upper_lip_raise: expressions.upperLipRaise,
            },
            // time: Time,
            // emoji: Emoji,
            // page: {
            //   url: this.props.currentUrl,
            //   title: this.props.currentTitle,
            // },
          }
        }

        let occurrence = new Occurrence(occurrenceValue);
        occurrence.postValue();
      }
    }

    Affectiva.start();
  }


  openModal() {
    this.setState({ formMode: "open" });
  }


  onCancel() {
    this.setState({ formMode: "close" });
  }


  render() {

    const form = Test.getForm();

    return (
      <div className={"start_test"}>
        <div className="wrapper_button" onClick={() => this.openModal()}>
          <div className="icon">
            <Icon name="rocket" size="100%" color="#fff" />
          </div>
          <span>Iniciar Teste</span>
        </div>
        <ModalForm
          mode={this.state.formMode}
          onSubmit={(values: TestInterface) => this.onSubmit(values)}
          onCancel={() => this.onCancel()}
          form={form}
          submitLabel="Iniciar"
        />
      </div>
    )
  }
}

const mapStateToProps = (state: ReducerState) => {

  const {
    testGoingOn,
    currentUrl,
    currentTitle,
  } = state.Reducers;

  return {
    testGoingOn,
    currentUrl,
    currentTitle,
  }
}

const mapDispatchToProps = {
  changeTestGoingOn,
  changeCurrentUrl,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTestFixed);