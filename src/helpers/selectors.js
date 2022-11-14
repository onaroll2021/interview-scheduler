// create helper function to get appointment info for component Appointment
export function getAppointmentsForDay(state, day) {
  const selectedDays = state.days.filter(stateDay => stateDay.name === day);
  if (state.days.length === 0 || selectedDays.length === 0) {
    return [];
  }

  const appointmentsFromDays = selectedDays[0].appointments;

  let filteredAppointments = [];

  for (let appointment of appointmentsFromDays) {
    filteredAppointments.push(state.appointments[appointment]);
  }
  return filteredAppointments;
}

// create helper function to get interview info for component Appointment
export function getInterview(state, interview) {
  const interviewObj = {};
  if (interview === null) {
    return null;
  } else {
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interview.interviewer];
  }
  return interviewObj;
}

// create helper function to get interviewers info for component Appointment
export function getInterviewersForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  //get interviwers for the days
  const interviewersFromDays = filteredDays[0].interviewers;

  let filteredInterviewers = [];

  for (let interviewer of interviewersFromDays) {
    filteredInterviewers.push(state.interviewers[interviewer]);
  }
  return filteredInterviewers;


}