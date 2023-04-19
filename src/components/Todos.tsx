import React, { useState } from "react";
import { Todo } from "../Todo";
import "./style.scss";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  index: number;
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const Todos: React.FC<Props> = ({ todo, setTodos, todos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [noteEdit, setNoteEdit] = useState<string>(todo.todo);
  const deleteNote = (id: number) => {
    // console.log("deleteworks", id);
    let newArra: Todo[] = todos.filter((to) => to.id !== todo.id);
    setTodos(newArra);
    localStorage.setItem("taskify", JSON.stringify(newArra));
  };

  const doneNote = (id: number) => {
    // console.log("doneNote", id);
    let newArra: Todo[] = todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    setTodos(newArra);
    localStorage.setItem("taskify", JSON.stringify(newArra));
  };

  const editNote = (id: number) => {
    // console.log("editnote");
    setEdit(!edit);
    // console.log(edit);
  };
  const handelEdit = (e: React.FormEvent, id: number) => {
    // console.log("handeledit works");
    e.preventDefault();
    let newArray: Todo[] = todos.map((todo) => (id === todo.id ? { ...todo, todo: noteEdit } : todo));
    setTodos(newArray);
    setEdit(!edit);
    localStorage.setItem("taskify", JSON.stringify(newArray));
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form className="todos-container" onSubmit={(e) => handelEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {edit ? (
            <input type="text" className="todoss" value={noteEdit} onChange={(e) => setNoteEdit(e.target.value)} />
          ) : todo.isDone ? (
            <s className="todoss">{todo.todo}</s>
          ) : (
            <div className="todoss">{todo.todo}</div>
          )}
          <div className="more">
            <AiFillEdit className="more-btn" onClick={() => editNote(todo.id)} />
            <AiFillDelete className="more-btn" onClick={() => deleteNote(todo.id)} />
            <MdDownloadDone className="more-btn" onClick={() => doneNote(todo.id)} />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default Todos;
