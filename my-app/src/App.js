import "./App.css";
import LoginSignup from "./components/LoginSignup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
