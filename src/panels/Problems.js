import React from "react";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import List from "@vkontakte/vkui/dist/components/List/List";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import {Cell} from "@vkontakte/vkui";

import "./Problems.css";
import ProblemCard from "../components/problem-card/problem-card";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import {changeActivePanel} from "../actions/actions";
import {connect} from "react-redux";

const Problems = ({id, go, fetchedUser, dispatch}) => {
  return (
    <Panel id={id}>
      <PanelHeader left={<PanelHeaderBack onClick={() =>  dispatch(changeActivePanel("home"))} />}>
        Спиок доступных задач
      </PanelHeader>
      <List>
        <Cell className="ux-problems__main-cell">
          {fetchedUser && <ProblemCard photo={fetchedUser.photo_200}
                       description={"Some long description Some long description Some long description Some long description Some long description"}
                       cost={5000}
                       rate={4.7}
                       user={{name: fetchedUser.first_name, surname: fetchedUser.last_name}}

          />}
        </Cell>
        <Cell className="ux-problems__main-cell">
          {fetchedUser && <ProblemCard photo={fetchedUser.photo_200}
                                       description={"Some long description Some long description Some long description Some long description Some long description"}
                                       cost={5000}
                                       rate={4.7}
                                       user={{name: fetchedUser.first_name, surname: fetchedUser.last_name}}

          />}
        </Cell>
        <Cell className="ux-problems__main-cell">
          {fetchedUser && <ProblemCard photo={fetchedUser.photo_200}
                                       description={"Some long description Some long description Some long description Some long description Some long description"}
                                       cost={5000}
                                       rate={4.7}
                                       user={{name: fetchedUser.first_name, surname: fetchedUser.last_name}}

          />}
        </Cell>
      </List>
    </Panel>)
}

export default connect(null)(Problems);
