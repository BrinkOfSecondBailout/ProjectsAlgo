import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default App;
