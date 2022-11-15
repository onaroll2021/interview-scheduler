import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
// create React component/transition-mode Form
export default function Form(props) {
  // create state for student/interviewer/error
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };
  // to validate the name input can not be blank
  function validate() {
    console.log("interviewer", interviewer)
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null ) {
      setError("You need to select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  console.log("props", props)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.student}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => { setStudent(event.target.value); }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={event => { setInterviewer(event); }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => validate()} >Save</Button>
        </section>
      </section>
    </main>
  );
}
