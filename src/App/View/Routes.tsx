import React from "react";
import { Route, Switch } from 'react-router-dom';

//SCENES
import Home from "./Scenes/Home";
import Tests from "./Scenes/Tests";
import Persons from "./Scenes/Persons";
import TestGoingOn from "./Scenes/TestGoingOn";
import Test from "./Scenes/Tests/Childs/Test";
import Person from "./Scenes/Persons/Childs/Person";
import UniqueTest from "./Scenes/UniqueTest";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tiposdeteste/" component={Tests} />
        <Route path="/tiposdeteste/:testTypeId" component={Test} />
        <Route exact path="/pessoas" component={Persons} />
        <Route path="/pessoas/:peopleId" component={Person} />
        <Route path="/testando" component={TestGoingOn} />
        <Route path="/teste/:testId" component={UniqueTest} />
      </Switch>
    )
  }
}