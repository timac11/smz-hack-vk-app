import React from "react";
import Avatar from "react-avatar";

import "./competentions.css";

const Competentions = ({data} = []) => {
  return data.map((item) =>  <Avatar className="ux-competentions__item"
                                     size="50"
                                     round={true}
                                     name={item}
  />)
};

export default Competentions;
