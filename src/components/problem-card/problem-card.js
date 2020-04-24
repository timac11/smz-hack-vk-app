import React from "react";

import "./problem-card.css";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import PropTypes from "prop-types";

import "./problem-card.css";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";

const ProblemCard = (props) => {
  return (
    <Div className="ux-problem-card__item">
      <Div className="ux-problem-card__info-photo">
        <Avatar src={props.photo}/>
        <div>
          {props.user.name} {props.user.surname}
        </div>
      </Div>
      <div className="ux-problem-card__info-main">
        <Group header={<Header mode="secondary">Описание</Header>}>
          <Div>
            {props.description}
          </Div>
        </Group>
      </div>
      <div className="ux-problem-card__info-rate">
        <InfoRow header="Рейтинг">
          {props.rate}
        </InfoRow>
        <InfoRow header="Цена">
          {props.cost}
        </InfoRow>
      </div>
    </Div>
  )
}

ProblemCard.propTypes = {
  photo: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired
  }),
  description: PropTypes.string.isRequired,
  competentions: PropTypes.array,
  cost: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired
};

export default ProblemCard;
