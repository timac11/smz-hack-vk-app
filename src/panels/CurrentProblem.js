import React from "react";
import {connect} from "react-redux";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel} from "../actions/actions";
import {Panel} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import ReactAvatar from "react-avatar";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import {competentions} from "../constants/state-constants";
import Header from "@vkontakte/vkui/dist/components/Header/Header";

import "./CurrentProblem.css";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import List from "@vkontakte/vkui/dist/components/List/List";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";

const CurrentProblem = (props) => {
  const {problem} = props;

  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => props.dispatch(changeActivePanel("customer"))}/>}>
        Объявление
      </PanelHeader>
      <Div className="ux-current-problem__avatar-container">
        <ReactAvatar size="180" round/>
      </Div>
      {
        problem &&
        <Group>
          <List>
            <Cell>
              <InfoRow header="Название">
                {problem.name}
              </InfoRow>
            </Cell>
            <Cell>
              <InfoRow header="Описание">
                {problem.description}
              </InfoRow>
            </Cell>
            <Cell>
              <InfoRow header="Цена">
                {problem.price}
              </InfoRow>
            </Cell>
            <Cell>
              <InfoRow header="Дата выполнения">
                {problem.dueDate}
              </InfoRow>
            </Cell>
            <Cell>
              <InfoRow header="Компетенция">
                {problem.competention}
              </InfoRow>
            </Cell>
          </List>
        </Group>
        // <FormLayout>
        //   <FormLayoutGroup top="Краткое описание задачи">
        //     <Input type="text"
        //            placeholder="Название"
        //            value={problem.name}
        //     />
        //     <Textarea type="text"
        //               placeholder="Краткое описание задачи"
        //               value={problem.description}
        //     />
        //   </FormLayoutGroup>
        //   <FormLayoutGroup top="Цена и сроки выполнения">
        //     <Input type="number"
        //            placeholder="Цена"
        //            value={problem.price}
        //     />
        //     <Input type="date"
        //            placeholder="Дата выполнения"
        //            value={problem.dueDate}
        //     />
        //   </FormLayoutGroup>
        //   <FormLayoutGroup top="Компетенция">
        //     <Select placeholder="Выбор"
        //             value={problem.competention}
        //     >
        //       {competentions.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
        //     </Select>
        //   </FormLayoutGroup>
        // </FormLayout>
      }
    </Panel>
  )
};

function mapStateToProps(state) {
  const problem = state.problems.currentProblem;
  return {problem};
}

export default connect(mapStateToProps)(CurrentProblem)
