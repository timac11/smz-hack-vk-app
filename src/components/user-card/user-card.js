import React from "react";
import {connect} from "react-redux";

import "./user-card.css";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {suggestProblem} from "../../actions/actions";

const UserCard = (props) => {
  const {user} = props;
  return (
    <Div className="ux-user-card__item-container">
      <Div className="ux-problem-card__item">
        <Div className="ux-user-card__info-photo">
          <Avatar src={user.photo}/>
          <span>
            {user.name}
          </span>
          <span>
             {user.surname}
          </span>
        </Div>
        <div className="ux-user-card__info-main">
          <Group header={<Header mode="secondary">Описание</Header>}>
            <Div>
              Находится у вас в рузьях
            </Div>
          </Group>
        </div>
        <div className="ux-user-card__info-rate">
          <InfoRow header="Рейтинг">
            5.0
          </InfoRow>
        </div>
      </Div>
      <Button size="xl"
              onClick={() => props.dispatch(suggestProblem(user.id))}>
        Предложить работу
      </Button>
    </Div>
  )
};

export default connect(null)(UserCard);
