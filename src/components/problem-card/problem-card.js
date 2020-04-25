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
import ProblemCardParams from "../problem-card-params/problem-card-params";

const ProblemCard = (props) => {
  return (
    <Div className="ux-problem-card__item-container">
      <ProblemCardParams props={props}/>
      <Button mode="outline"
              size="xl"
              onClick={
                () => {
                  props.dispatch(fetchCurrentProblem(props.id));
                  props.dispatch(changeActivePanel(props.redirectTo))
                }
              }>
        Посмотреть детали
      </Button>
    </Div>
  )
}

ProblemCard.propTypes = {
  redirectTo: PropTypes.string.isRequired,
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
