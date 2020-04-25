import React from "react";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {changeActivePanel, fetchAllProblems} from "../actions/actions";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {connect} from "react-redux";

const Customer = (props) => {
  const {id, loginedUser, go, dispatch} = props;
  return (
    <Panel id={id}>
      <PanelHeader>Кабинет заказчика</PanelHeader>
      {
        loginedUser &&
        <Group title="User Data Fetched with VK Bridge">
          <Cell
            before={loginedUser.photo ? <Avatar src={loginedUser.photo}/> : null}
            description={loginedUser.city || ''}
          >
            {`${loginedUser.name} ${loginedUser.lastName}`}
          </Cell>
        </Group>
      }
      <Div className="ux-home__footer">
        <Button size="xl"
                onClick={() => dispatch(changeActivePanel("createProblem"))}>
          Создать объявление
        </Button>
        <Button className="ux-home__find-work-button"
                size="xl"
                onClick={() => dispatch(fetchAllProblems()) && go("problems")}>
          Мои объявления
        </Button>
      </Div>
    </Panel>
  )
};

function mapStateToProps(state) {
  const loginedUser = state.user.loginedUser;
  return {loginedUser};
}

export default connect(mapStateToProps)(Customer);
