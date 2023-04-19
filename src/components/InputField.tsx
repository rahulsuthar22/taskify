import React, { useRef } from "react";
import { Todo } from "../Todo";
import "./style.scss";
interface Props {
  todo: string;
  todos: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handelSubmit: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, todos, setTodos, handelSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form
        className="input-form"
        onSubmit={(e) => {
          handelSubmit(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="input"
          className="todo-input"
          placeholder="Enter the text here"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <button type="submit" value="GO" className="go-btn">
          GO
        </button>
      </form>
    </div>
  );
};

export default InputField;
