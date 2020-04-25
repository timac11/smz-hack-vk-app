import React from "react";
import {connect} from "react-redux";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel} from "../../actions/actions";
import {Panel} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import ReactAvatar from "react-avatar";

import "./CurrentCustomerProblem.css";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import ProblemParams from "../../components/problem-params/problem-params";

const CurrentCustomerProblem = (props) => {
  const {problem} = props;

  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => props.dispatch(changeActivePanel("customer"))}/>}>
        Объявление
      </PanelHeader>
      <Div className="ux-current-problem__avatar-container">
        <ReactAvatar size="180" round/>
      </Div>
      {problem && <ProblemParams problem={problem}/>}
      <Button size="xl">
        Показать возможных исполнителей
      </Button>
    </Panel>
  )
};

function mapStateToProps(state) {
  const problem = state.problems.currentProblem;
  return {problem};
}

export default connect(mapStateToProps)(CurrentCustomerProblem)
