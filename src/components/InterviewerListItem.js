import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { name, avatar, selected } = props;

  const InterviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
    <li className={InterviewerListItemClass} selected={selected} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && props.name}
    </li>

  );
}