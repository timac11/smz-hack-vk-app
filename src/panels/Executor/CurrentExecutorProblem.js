import React from "react";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel, toBeResponsibleForProblem} from "../../actions/actions";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import ReactAvatar from "react-avatar";
import ProblemParams from "../../components/problem-params/problem-params";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {Panel} from "@vkontakte/vkui";
import {connect} from "react-redux";

const CurrentExecutorProblem = (props) => {
  const {problem, loginedUser} = props;

  return <Panel id={props.id}>
    <PanelHeader left={<PanelHeaderBack onClick={() => props.dispatch(changeActivePanel("executor"))}/>}>
      Задача
    </PanelHeader>
    <Div className="ux-current-problem__avatar-container">
      <ReactAvatar size="180" round/>
    </Div>
    {problem && <ProblemParams problem={problem}/>}
    {
      problem && !problem.responsible &&
      <Button size="xl"
              onClick={() => props.dispatch(toBeResponsibleForProblem())}>
        Взяться за работу
      </Button>
    }
    {
      problem && problem.responsible && problem.responsible.id === loginedUser.id &&
      <Button size="xl"
              onClick={() => props.dispatch(toBeResponsibleForProblem())}>
        Завершить работу работу
      </Button>
    }
  </Panel>
};

function mapStateToProps(state) {
  const problem = state.problems.currentProblem;
  const loginedUser = state.user.loginedUser
  return {problem, loginedUser};
}

export default connect(mapStateToProps)(CurrentExecutorProblem);
