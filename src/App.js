// import logo from './logo.svg';
import './App.css';
import HomePage from './Components/Home/HomePage';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './Components/Login/Login';
import NavBar from "./Components/NavBar/NavBar"
import Register from './Components/Register/Register';
import Customer from './Components/Customer/Customer';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


