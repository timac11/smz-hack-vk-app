import React from "react";
import {Panel} from "@vkontakte/vkui";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormStatus from "@vkontakte/vkui/dist/components/FormStatus/FormStatus";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";

import "./CreateProblem.css";

const CreateProblem = (props) => {
  return (
    <Panel id={props.id}>
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
    </Panel>
  );
};

export default CreateProblem;
