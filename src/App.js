import React from "react";
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/jobs" element={<Main />}>
          <Route path=":id" element={<Main />} />
        </Route>
        <Route exact path="/skills" element={<Main />}>
          <Route path=":id" element={<Main />} />
        </Route>
        <Route exact path="/photos" element={<Main />}>
          <Route path=":id" element={<Main />} />
        </Route>        
        <Route exact path="/projects" element={<Main />}>
          <Route path=":id" element={<Main />} />
        </Route>
        <Route path="*" element={<Main />} />
      </Routes>
    </Router>
  );
}
export default App;
