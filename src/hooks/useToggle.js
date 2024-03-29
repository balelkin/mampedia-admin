import { useState } from 'react';

export default function useToggle(initialState) {
  const [newState, flipToggle] = useState(initialState);

  const handleToggle = () => {
    flipToggle(!newState);
  };

  return {
    newState,
    handleToggle,
  };
}
