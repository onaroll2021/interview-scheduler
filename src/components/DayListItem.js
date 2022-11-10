import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const formatSpots = function() {
    const numOfSpots = props.spots;
    if (numOfSpots === 0) return "no spots remaining";
    else if (numOfSpots === 1) return "1 spot remaining";
    else {
      return `${numOfSpots} spots remaining`;
    }
  };
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}