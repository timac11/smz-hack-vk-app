import React from "react";
import {Panel} from "@vkontakte/vkui";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormStatus from "@vkontakte/vkui/dist/components/FormStatus/FormStatus";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";

import "./CreateProblem.css";
import PropTypes from "prop-types";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {connect} from "react-redux";
import {changeActivePanel} from "../actions/actions";

const CreateProblem = (props) => {
  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() =>  props.dispatch(changeActivePanel("home"))} />}>
        Создать объявление
      </PanelHeader>
      <FormLayout>
        <FormStatus header="Некорректно введены данные" hidden={"error" === "default"} mode={"error"}>
          Необходимо заполнить все поля
        </FormStatus>
        <FormLayoutGroup top="Краткое описание задачи">
          <Input type="text"
                 placeholder="Название"
          />
          <Textarea type="text"
                 placeholder="Краткое описание задачи"
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Компетенция">
          <Select placeholder="Выбор"
          >
          </Select>
        </FormLayoutGroup>
      </FormLayout>
      <Div>
        <Button size="xl">Создать объявление</Button>
      </Div>
    </Panel>
  );
};

CreateProblem.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default connect(null)(CreateProblem);
