import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import List from "@vkontakte/vkui/dist/components/List/List";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";

import Competentions from "../components/competitions/competentions";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Progress from "@vkontakte/vkui/dist/components/Progress/Progress";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import "./Home.css";
import {connect} from "react-redux";
import {changeActivePanel} from "../actions/actions";


const Home = ({id, go, loginedUser, dispatch}) => (
  <Panel id={id}>
    <PanelHeader>Информация</PanelHeader>
    {loginedUser &&
    <Group title="User Data Fetched with VK Bridge">
      <Cell
        before={loginedUser.photo ? <Avatar src={loginedUser.photo}/> : null}
        description={loginedUser.city || ''}
      >
        {`${loginedUser.name} ${loginedUser.lastName}`}
      </Cell>
    </Group>}

    <Group header={<Header mode="secondary">Информация о пользователе</Header>}>
      <List>
        <Cell>
          <InfoRow header="Мои компетенции">
            <Competentions data={loginedUser.comptitions}/>
            <Button>Добавить</Button>
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="ИНН">
            {loginedUser.inn}
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Мой зарегистрированный доход">
            {loginedUser.income} P
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Рейтинг">
            {loginedUser.rating}
            <Progress title={loginedUser.rating} value={loginedUser.rating * 20}/>
          </InfoRow>
        </Cell>
      </List>
    </Group>
    <Div className="ux-home__footer">
      <Button size="xl"
              onClick={() => dispatch(changeActivePanel("createProblem"))}>
        Создать объявление
      </Button>
      <Button className="ux-home__find-work-button"
              size="xl"
              onClick={() => go("problems")}>
        Найти работу
      </Button>
    </Div>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  loginedUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const loginedUser = state.user.loginedUser;
  return {loginedUser};
}

export default connect(mapStateToProps)(Home);
