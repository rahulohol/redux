import React, { useState } from "react";

const TodoInput = ({ handleAddTodo }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text) {
      handleAddTodo(text);
      setText("");
    }
  };
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export { TodoInput };
