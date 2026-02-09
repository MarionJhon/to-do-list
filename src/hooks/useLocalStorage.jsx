import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [isStore, setIsStore] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue; // Changed to JSON.parse
  });

  const storedValue = (newValue) => {
    setIsStore(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [isStore, storedValue];
};

export default useLocalStorage;