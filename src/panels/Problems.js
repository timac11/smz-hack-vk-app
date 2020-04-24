import React from "react";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import List from "@vkontakte/vkui/dist/components/List/List";
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import {Cell} from "@vkontakte/vkui";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";

import "./Problems.css";
import ProblemCard from "../components/problem-card/problem-card";

const Problems = ({id, go, fetchedUser}) => {
  return (
    <Panel id={id}>
      <PanelHeader>Список доступных задач</PanelHeader>
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

export default Problems;
