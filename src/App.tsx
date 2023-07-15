import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustomDragLayer from "./Tab/CustomDragLayer";
import DragableTabContainer from "./Tab/DragableTabContainer";

function App() {
  return (
    <div className="App">
      <header>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#home">Products</a>
          </li>
          <li>
            <a href="#home">Services</a>
          </li>
          <li>
            <a href="#home">About</a>
          </li>
          <li>
            <a href="#home">Contact</a>
          </li>
        </ul>
      </header>

      <nav className="Tab-nav">
        <DndProvider backend={HTML5Backend}>
          <DragableTabContainer />
          <CustomDragLayer />
        </DndProvider>
      </nav>
    </div>
  );
}

export default App;
