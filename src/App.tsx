import { useEffect, useState } from "react";
import "./App.scss";
import InputField from "./components/InputField";
import Todos from "./components/Todos";
import { Todo } from "./Todo";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handelSubmit = (e: React.FormEvent) => {
    // console.log("This is fired !", todo);
    if (todo) {
      // console.log("if runs");
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
    e.preventDefault();
    localStorage.setItem("taskify", JSON.stringify([...todos, { id: Date.now(), todo: todo, isDone: false }]));
  };

  useEffect(() => {
    if (localStorage.getItem("taskify") == null) {
      setTodos([]);
    } else {
      let taskify = JSON.parse(localStorage.getItem("taskify")!);
      // console.log("taskify", taskify);
      setTodos(taskify);
    }
    // let taskify:Todo[] = JSON.parse(localStorage.getItem('taskify'));
    // setTodos(taskify)
  }, []);
  const onDrag = (result: DropResult) => {
    const { source, destination } = result;
    // console.log(result);
    if (!destination) return;

    if (source.droppableId === destination.droppableId && destination.index === source.index) return;
    // let add,
    //   active = todos;

    if (source.droppableId === "TodoList" && destination.droppableId === "TodoRemove") {
      // add = active[source.index];
      // console.log(add);
      let newArra: Todo[] = todos.map((todo) => (todo.id === Number(result.draggableId) ? { ...todo, isDone: true } : todo));
      setTodos(newArra);
      localStorage.setItem("taskify", JSON.stringify(newArra));
    }
    if (source.droppableId === "TodoRemove" && destination.droppableId === "TodoList") {
      // add = active[source.index];
      // console.log(add);
      let newArra: Todo[] = todos.map((todo) => (todo.id === Number(result.draggableId) ? { ...todo, isDone: false } : todo));
      setTodos(newArra);
      localStorage.setItem("taskify", JSON.stringify(newArra));
    }
  };
  return (
    <DragDropContext onDragEnd={onDrag}>
      <div className="container">
        <header className="header">Taskify</header>
        <InputField todo={todo} setTodo={setTodo} todos={todos} setTodos={setTodos} handelSubmit={handelSubmit} />
        <div className="tasks">
          <div className="activeTask">
            <Droppable droppableId="TodoList">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`${snapshot.isDraggingOver ? "dragactive" : ""}`}>
                  <h3 className="task">Active Task</h3>
                  <div className="todos">
                    <br />
                    {todos.map((todo, index) => !todo.isDone && <Todos key={todo.id} todo={todo} index={index} setTodos={setTodos} todos={todos} />)}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="completedTask">
            <Droppable droppableId="TodoRemove">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`${snapshot.isDraggingOver ? "dragremove" : ""}`}>
                  <h3 className="task">Complete Task</h3>
                  <div className="todos">{todos.map((todo, index) => todo.isDone && <Todos key={todo.id} index={index} todo={todo} setTodos={setTodos} todos={todos} />)}</div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};
export default App;
