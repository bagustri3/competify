import React from "react";
import "./App.scss";
import AppRouter from "./AppRouter.js";
import Store from "./app/index.js";

function App() {
    return (
            <div className="App">
                <Store>
                    <AppRouter />
                </Store>
            </div>
    );
}

export default App;
