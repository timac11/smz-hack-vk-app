import React from "react";
import {connect} from "react-redux";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel} from "../../actions/actions";
import List from "@vkontakte/vkui/dist/components/List/List";
import {Cell} from "@vkontakte/vkui";
import ProblemCard from "../../components/problem-card/problem-card";

const SuggestionExecutorProblems = (props) => {
  const {id, dispatch, problems} = props;

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => dispatch(changeActivePanel("executor"))}/>}>
        Мои предложения
      </PanelHeader>
      <List>
        {problems &&
        problems
          .map(problem => <Cell className="ux-problems__main-cell">
            {
              <ProblemCard photo={problem.author.photo}
                           id={problem.id}
                           description={problem.description}
                           cost={problem.price}
                           rate={4.7}
                           user={{name: problem.author.name, surname: problem.author.lastName}}
                           redirectTo={"currentExecutorProblem"}

              />}
          </Cell>)}
      </List>
    </Panel>
  )
};

function mapStateToProps(state) {
  const problems = state.problems.problems;
  return {problems};
}

export default connect(mapStateToProps)(SuggestionExecutorProblems);
