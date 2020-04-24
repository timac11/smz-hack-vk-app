import React from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import {connect} from "react-redux";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {authorize} from "../actions/actions";

const EnterPage = ({id, dispatch}) => {
  return (
    <Panel id={id}>
      <PanelHeader>
        Вход в систему
      </PanelHeader>
      <FormLayout>
        <FormLayoutGroup top="ИНН">
          <Input type="number"/>
        </FormLayoutGroup>
      </FormLayout>
      <Div>
        <Button size="xl"
          onClick={() => dispatch(authorize())}>
          Вход в систему
        </Button>
      </Div>
    </Panel>
  );
};

export default connect()(EnterPage);
