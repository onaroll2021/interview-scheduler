
import React, { Fragment } from 'react'
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //remove function
  function remove(){
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=>{
      transition((ERROR_DELETE))
    })
  }
  // save appointment info and pass to appointments
  function save(student, interviewer) {
    const interview ={
      student,
      interviewer,
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW))
    .catch(()=>{
      transition((ERROR_SAVE))
    })
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        interview={props.interview}
        onDelete={()=>transition(CONFIRM)}
        //for editing the appointment
        onEdit={()=>transition(EDIT)}
        id={props.id}
      />
      )}
      {mode === CREATE && (
        <Form
          // name={props.name ? props.name : props.interview.student}
          bookInterview={props.bookInterview} 
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
          id={props.id}
         />     
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
       {mode === CONFIRM && (
        <Confirm
        id={props.id}
        onConfirm={remove}
        onCancel={back}
        message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
        // name={props.name ? props.name : props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        id={props.id}
      />
      )}
        {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={()=>transition(EMPTY)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment."
          onClose={()=>transition(SHOW)}
        />
      )}
    </article>
  )
};


