import React from "react";
import List from "@vkontakte/vkui/dist/components/List/List";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import InfoRow from "@vkontakte/vkui/dist/components/InfoRow/InfoRow";
import Group from "@vkontakte/vkui/dist/components/Group/Group";

const ProblemParams = ({problem}) => {
  return (
    <Group>
      <List>
        <Cell>
          <InfoRow header="Название">
            {problem.name}
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Описание">
            {problem.description}
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Цена">
            {problem.price}
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Дата выполнения">
            {new Date(problem.dueDate).toLocaleDateString()}
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow header="Компетенция">
            {problem.competention}
          </InfoRow>
        </Cell>
      </List>
    </Group>
  )
};

export default ProblemParams;
