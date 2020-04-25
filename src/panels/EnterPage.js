import React, {useState} from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import {connect} from "react-redux";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {authorize} from "../actions/actions";
import Select from "@vkontakte/vkui/dist/components/Select/Select";

const roles = [
  {
    id: "executor",
    name: "Исполнитель"
  },
  {
    id: "customer",
    name: "Заказчик"
  }
];

const EnterPage = ({id, dispatch}) => {
  const [role, setRole] = useState("executor");

  return (
    <Panel id={id}>
      <PanelHeader>
        Вход в систему
      </PanelHeader>
      <FormLayout>
        <FormLayoutGroup top="Роль">
          <Select value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
          >
            {roles.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}</option>)}
          </Select>
        </FormLayoutGroup>
      </FormLayout>
      <Div>
        <Button size="xl"
                onClick={() => dispatch(authorize(role))}>
          Вход в систему
        </Button>
      </Div>
    </Panel>
  );
};

export default connect()(EnterPage);
