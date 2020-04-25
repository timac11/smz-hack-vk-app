import React, {useState} from "react";
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
import {changeActivePanel, createProblem} from "../actions/actions";
import {competentions} from "../constants/state-constants";

const CreateProblem = (props) => {
  const [problem, setProblem] = useState({
    name: "",
    description: "",
    price: 0,
    dueDate: new Date(),
    competention: competentions[0].id
  });
  const [status, setStatus] = useState("error");

  const validate = (problem) => {
    if (problem.name && problem.name !== "" &&
      problem.description && problem.description !== "" &&
      problem.price && problem.price !== 0 &&
      problem.competention && problem.competention !== "")
    {
      setStatus("default");
    } else {
      setStatus("error");
    }
  };

  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => props.dispatch(changeActivePanel("customer"))}/>}>
        Создать объявление
      </PanelHeader>
      <FormLayout>
        <FormStatus header="Некорректно введены данные" hidden={status === "default"} mode={status}>
          Необходимо заполнить все поля
        </FormStatus>
        <FormLayoutGroup top="Краткое описание задачи">
          <Input type="text"
                 placeholder="Название"
                 value={problem.name}
                 onChange={(e) => {
                   setProblem({...problem, name: e.target.value});
                   validate({...problem, name: e.target.value});
                 }}
          />
          <Textarea type="text"
                    placeholder="Краткое описание задачи"
                    value={problem.description}
                    onChange={(e) => {
                      setProblem({...problem, description: e.target.value});
                      validate({...problem, description: e.target.value});
                    }}
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Цена и сроки выполнения">
          <Input type="number"
                 placeholder="Цена"
                 value={problem.price}
                 onChange={(e) => {
                   setProblem({...problem, price: e.target.value});
                   validate({...problem, price: e.target.value});
                 }}
          />
          <Input type="date"
                 placeholder="Дата выполнения"
                 value={problem.date}
                 onChange={(e) => {
                   setProblem({...problem, date: e.target.value});
                   validate({...problem, date: e.target.value});
                 }}
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Компетенция">
          <Select placeholder="Выбор"
                  value={problem.competention}
                  onChange={(e) => {
                    setProblem({...problem, competention: e.target.value});
                    validate({...problem, competention: e.target.value});
                  }}
          >
            {competentions.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
          </Select>
        </FormLayoutGroup>
      </FormLayout>
      <Div>
        <Button size="xl"
                disabled={status === "error"}
                onClick={() => props.dispatch(createProblem(problem))}>
          Создать объявление
        </Button>
      </Div>
    </Panel>
  );
};

CreateProblem.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default connect(null)(CreateProblem);
