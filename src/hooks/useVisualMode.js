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
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
}