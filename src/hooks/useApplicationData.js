import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  // create setState
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // create setDay for rendering certain day
  const setDay = day => {
    return setState({ ...state, day });
  };

  //find the day
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    };
    return daysOfWeek[day];
  }

  // create useEffect to render content after state changes
  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  
  // create helper function: bookinterview
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day);
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    };

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      };
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      };
    }

    let days = state.days;
    days[dayOfWeek] = day;

    return axios.put(`api/appointments/${id}`, appointment)
      .then((info) => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };
  //create helper function: cancelinterview
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    };

    let days = state.days;
    days[dayOfWeek] = day;

    return axios.delete(`api/appointments/${id}`, appointment)
      .then((info) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }

  return {
    setDay,
    state,
    bookInterview,
    cancelInterview
  };
}