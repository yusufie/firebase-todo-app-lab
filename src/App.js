import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "./firebase";
import { v4 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./AddTodo";
import DisplayTodo from "./DisplayTodo";
import { useEffect, useState } from "react";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [docData, setDocData] = useState([]);

  const read = async () => {
    const querySnapshot = await getDocs(collection(db, "todo"));
    querySnapshot.forEach((doc) => {
      setTodoData((arr) => [...arr, doc.data()]);
      setDocData((arr) => [...arr, doc]);
    });
  };

  useEffect(() => {
    read();
  }, []);

  const add = async (todoItem) => {
    try {
      const newTodoItem = {
        id: uuid(),
        status: false,
        todo: todoItem,
      };
      const docRef = await addDoc(collection(db, "todo"), newTodoItem);
      setTodoData([...todoData, newTodoItem]);
      const docSnap = await getDoc(docRef);
      setDocData([...docData, docSnap]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "todo", id));
  };

  const updateItem = async (docUpdate) => {
    const docRef = doc(db, "todo", docUpdate.id);
    await updateDoc(docRef, {
      status: !docUpdate.data().status,
    });
    const docSnap = await getDoc(docRef);
    const newData = docData.map((doc) => {
      if (doc.id === docUpdate.id) {
        return docSnap;
      } else {
        return doc;
      }
    });
    setDocData(newData);
  };

  const handleDeleteItem = (id) => {
    setTodoData(todoData.filter((todo) => todo.id !== id));
    docData.forEach((doc) => {
      if (doc.data().id === id) {
        deleteItem(doc.id);
        setDocData(docData.filter((d) => d.id !== doc.id));
        return;
      }
    });
  };

  const handleStatusChange = (id) => {
    const data = todoData.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      } else {
        return todo;
      }
    });
    setTodoData(data);
    docData.forEach((doc) => {
      if (doc.data().id === id) {
        updateItem(doc);
        return;
      }
    });
  };

  return (
    <div className="App d-flex">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h2>ToDo List</h2>
              </div>

              <div className="card-body">
                <AddTodo add={add} />
                <div className="items-container mt-5">
                  {todoData.length !== 0 ? (
                    <DisplayTodo
                      todoData={todoData}
                      onStatusChange={handleStatusChange}
                      onItemDelete={handleDeleteItem}
                    />
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
