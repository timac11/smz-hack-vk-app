import React from "react";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import List from "@vkontakte/vkui/dist/components/List/List";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import {Cell} from "@vkontakte/vkui";

import "./Problems.css";
import ProblemCard from "../components/problem-card/problem-card";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel} from "../actions/actions";
import {connect} from "react-redux";

const Problems = (props) => {
  const {id, dispatch, problems} = props;

  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => dispatch(changeActivePanel("customer"))}/>}>
        Спиок доступных задач
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

              />}
          </Cell>)}
      </List>
    </Panel>)
};

function mapStateToProps(state) {
  const problems = state.problems.problems;
  return {problems};
}

export default connect(mapStateToProps)(Problems);
