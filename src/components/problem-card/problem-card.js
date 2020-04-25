import React from "react";

import "./problem-card.css";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import PropTypes from "prop-types";

import "./problem-card.css";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {connect} from "react-redux";
import {changeActivePanel, fetchCurrentProblem} from "../../actions/actions";

const ProblemCard = (props) => {
  return (
    <Div className="ux-problem-card__item-container">
      <Div className="ux-problem-card__item">
        <Div className="ux-problem-card__info-photo">
          <Avatar src={props.photo}/>
          <span>
            {props.user.name}
          </span>
          <span>
             {props.user.surname}
          </span>
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
      <Button mode="outline"
              size="xl"
              onClick={
                () => {
                  console.log(props)
                  props.dispatch(fetchCurrentProblem(props.id));
                  props.dispatch(changeActivePanel("currentProblem"))
                }
              }>
        Посмотреть детали
      </Button>
    </Div>
  )
}

ProblemCard.propTypes = {
  photo: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired
  }),
  description: PropTypes.string.isRequired,
  competentions: PropTypes.array,
  cost: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired
};

export default connect()(ProblemCard);
