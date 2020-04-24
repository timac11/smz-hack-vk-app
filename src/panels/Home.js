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


const Home = ({id, go, fetchedUser, dispatch}) => (
  <Panel id={id}>
    <PanelHeader>Информация</PanelHeader>
    {fetchedUser &&
    <Group title="User Data Fetched with VK Bridge">
      <Cell
        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
        description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
      >
        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
      </Cell>
    </Group>}

    <Group header={<Header mode="secondary">Информация о пользователе</Header>}>
      <List>
        <Cell>
          <InfoRow header="Мои компетенции">
            <Competentions data={["Machine Learning", "Wed", "Design"]}/>
            <Button>Добавить</Button>
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Иой зарегистрированный доход">
            50000 Р
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Рейтинг">
            4.1 / 5
            <Progress title={4.1} value={82.1}/>
          </InfoRow>
        </Cell>
      </List>
    </Group>
    <Div className="ux-home__footer">
      <Button onClick={() => dispatch(changeActivePanel("createProblem"))}>
        Создать объявление
      </Button>
      <Button className="ux-home__find-work-button"
              onClick={() => go("problems")}>
        Найти работу
      </Button>
    </Div>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default connect(null)(Home);
