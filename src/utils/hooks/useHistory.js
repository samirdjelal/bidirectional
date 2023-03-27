import { useState, useEffect } from "react";

const HISTORY = "history";

const useHistory = () => {
  const [items, setItems] = useState([]);
  // Get old history from local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(HISTORY)) || [];
    setItems(data);
  }, []);
  // Add string to history
  const addStringToHistory = (string) => {
    if (string.length > 0 && !items.includes(string)) {
      const updatedItems = [...items, string];
      localStorage.setItem(HISTORY, JSON.stringify(updatedItems));
      setItems(updatedItems);
    }
  };
  // Clear history
  const clearHistory = () => {
    setItems([]);
    localStorage.setItem(HISTORY, "[]");
    // Refrech page to uply changes
    window.location.reload();
  };

  return { items, addStringToHistory, clearHistory };
};

export default useHistory;
