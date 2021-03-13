import React, { useState, useReducer } from "react";
import "./App.css";
import ComponentsRenderer from "./components/ComponentsRenderer";
import GameContextProvider from "./GameContext";
import reducer from "./reducer";

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <ComponentsRenderer />
      </GameContextProvider>
    </div>
  );
}

export default App;
