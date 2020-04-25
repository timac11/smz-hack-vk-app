import React from "react";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";

const ProblemCardParams = ({props}) => {
  return <Div className="ux-problem-card__item">
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
};

export default ProblemCardParams;
