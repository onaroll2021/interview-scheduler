import { useState } from "react";

// create React modes for appointment component at different states
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // create helper function to run certain mode
  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => replace ? [...prev.slice(0, -1), newMode] : [...prev, newMode]);
  };
// create helper function to back to previous mode
  function back() {
    console.log("history", history);
    console.log("mode", mode);
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const newHistoryTwo = newHistory.slice(0, -1);
      if(newHistory[newHistory.length - 1] === "SAVING" || newHistory[newHistory.length - 1] === "DELETING") {
        setMode(newHistoryTwo[newHistoryTwo.length - 1]);
        setHistory(newHistoryTwo);
      } else {      
        setMode(newHistory[newHistory.length - 1]);
        setHistory(newHistory);
      }
    }
  };

  return { mode, transition, back };
}