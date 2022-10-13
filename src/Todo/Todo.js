import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
// Assets
import { db } from "./firebase-config";
import TodoItem from "./TodoItem";
// Component

const Todo = () => {
  const inputRef = useRef();
  const colRef = collection(db, "todos");
  const q = query(colRef, orderBy("created_at", "desc"));
  // States
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let jobs = [];
      snapshot.docs.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });
      setTodos(jobs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Handlers
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!!content.trim()) {
      await addDoc(colRef, {
        content,
        done: false,
        created_at: serverTimestamp(),
      });
    }
    setContent("");
    inputRef.current.focus();
  };
  const handleUpdateToDo = async (todo, newContent) => {
    if (!!newContent.trim()) {
      let docRef = doc(db, "todos", todo.id);
      await updateDoc(docRef, {
        content: newContent,
        done: todo.done,
      });
    }
  };
  const handleDeleteToDo = async (todo) => {
    let docRef = doc(db, "todos", todo.id);
    await deleteDoc(docRef);
  };
  const handleToggleDone = async (todo) => {
    let docRef = doc(db, "todos", todo.id);
    await updateDoc(docRef, {
      content: todo.content,
      done: !todo.done,
    });
  };
  return (
    <div>
      <div className="flex justify-center py-4 text-gray-700 text-3xl font-bold">
        ToDo App
      </div>
      {/* Add todo section */}
      <form
        action="#"
        onSubmit={handleAddTodo}
        className="w-full max-w-[500px] mx-auto my-4 p-4 rounded bg-white shadow-lg"
      >
        <input
          ref={inputRef}
          type="text"
          name="content"
          placeholder="Enter your job"
          id=""
          className="w-full p-3 mb-5 rounded border border-gray-200 focus:border-blue-500 outline-none text-base text-gray-700 font-normal box-border"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <div className="flex justify-center">
          <button className="p-2 bg-red-500 hover:bg-red-700 rounded text-base text-white font-medium">
            Add job
          </button>
        </div>
      </form>
      {/* Show to do section */}
      <div className="space-y-4">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              data={todo}
              onUpdate={handleUpdateToDo}
              onDelete={handleDeleteToDo}
              onToggleDone={handleToggleDone}
            ></TodoItem>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
