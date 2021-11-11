import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import Map from "./components/Map1";
const history = createHistory();

function App() {
  return (
    <div className="App bg-light">
      <Router history={history}>
        <Route path="/" exact component={Map} />
      </Router>
    </div>
  );
}

export default App;
