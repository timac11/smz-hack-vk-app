import React, {useState} from "react";
import {connect} from "react-redux";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel, fetchAllUsers} from "../../actions/actions";
import {Cell, Panel} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import ReactAvatar from "react-avatar";

import "./CurrentCustomerProblem.css";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import ProblemParams from "../../components/problem-params/problem-params";
import List from "@vkontakte/vkui/dist/components/List/List";
import UserCard from "../../components/user-card/user-card";
import {getPaymentLink} from "../../ApiProvider";

const CurrentCustomerProblem = (props) => {
  const {problem, users} = props;
  const [showUsers, setShowUsers] = useState(false);

  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => props.dispatch(changeActivePanel("customer"))}/>}>
        Объявление
      </PanelHeader>
      <Div className="ux-current-problem__avatar-container">
        <ReactAvatar size="100" round/>
      </Div>
      {problem && <ProblemParams problem={problem}/>}
      {
        !showUsers &&
        problem &&
        problem.status === "init" &&
        <Button size="xl"
                onClick={() => {
                  props.dispatch(fetchAllUsers());
                  setShowUsers(true)
                }}>
          Показать возможных исполнителей
        </Button>
      }
      {
        !showUsers &&
        problem &&
        problem.status === "completed" &&
        <Div>
          <Div className="ux-current-problem__suggest-container">Работа завершена!</Div>
          <Button size="xl"
                  onClick={() => {getPaymentLink().then((result) => {window.open(result.data)})}}>
            Оплатить
          </Button>
        </Div>
      }
      {
        problem && problem.status === "suggest" &&
        <Div className="ux-current-problem__suggest-container">Работа предложена!</Div>
      }
      {
        problem &&
        problem.status === "init" &&
        showUsers &&
        <List>
          {users &&
          users
            .map(user => <Cell className="ux-problems__main-cell">
              {
                <UserCard user={user}/>}
            </Cell>)
          }
        </List>
      }
    </Panel>
  )
};

function mapStateToProps(state) {
  const problem = state.problems.currentProblem;
  const users = state.users.users.filter(user => user.id !== state.user.loginedUser.id);
  return {problem, users};
}

export default connect(mapStateToProps)(CurrentCustomerProblem)
