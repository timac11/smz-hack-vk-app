import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import List from "@vkontakte/vkui/dist/components/List/List";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";

import Competentions from "../../components/competitions/competentions";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import "../Customer/Home.css";
import {connect} from "react-redux";
import {
  changeActivePanel,
  fetchAllAvailableExecutorProblems,
  fetchAllProgressExecutorProblems, getAllSuggestions
} from "../../actions/actions";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import {competentions} from "../../constants/state-constants";

import "./Executor.css";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";

export const myCompetitions = [
  {
    id: "Маникюр",
    name: "Маникюр"
  },
  {
    id: "Парикхмахер",
    name: "Парикхмахер",
  }
]

const Executor = ({id, go, loginedUser, dispatch}) => {
  const [edit, setEdit] = useState(false);

  return <Panel id={id}>
    <PanelHeader left={<PanelHeaderBack onClick={() => dispatch(changeActivePanel("enterPage"))}/>}>Кабинет исполнителя</PanelHeader>
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
            {
              !edit ?
                <>
                  <Competentions data={myCompetitions.map(item => item.name)}/>
                  <Button onClick={() => setEdit(true)}>Добавить</Button>
                </> :
                <>
                  <Div className="ux-executor__checkboxes-container">
                    {competentions.map(item => <Checkbox
                      className="ux-executor__checkboxes-container-item">{item.name}</Checkbox>)}
                  </Div>
                  <Button onClick={() => setEdit(false)}>Сохранить</Button>
                </>
            }
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Мой зарегистрированный доход">
            {loginedUser.income} P
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="ИНН">
            <Input type="text"
                   className="ux-executor__inn-field"
                   value={loginedUser.inn}/>
            <Button size="xl"
                    mode="secondary"
            >Сохранить</Button>
          </InfoRow>
        </Cell>
      </List>
    </Group>
    <Div className="ux-home__footer">
      <Button className="ux-home__find-work-button"
              size="xl"
              onClick={() => dispatch(fetchAllAvailableExecutorProblems()) && go("executorProblems")}>
        Поиск работы
      </Button>
      <Button className="ux-home__find-work-button"
              size="xl"
              onClick={() => dispatch(fetchAllProgressExecutorProblems()) && go("progressExecutorProblems")}>
        Мои текущие задачи
      </Button>
      <Button className="ux-home__find-work-button"
              size="xl"
              onClick={() => dispatch(getAllSuggestions()) && go("suggestExecutorProblems")}>
        Предложения
      </Button>
    </Div>
  </Panel>
};

Executor.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  loginedUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const loginedUser = state.user.loginedUser;
  return {loginedUser};
}

export default connect(mapStateToProps)(Executor);
