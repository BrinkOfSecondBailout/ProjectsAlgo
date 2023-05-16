import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import {useState, useEffect} from 'react';
import axios from 'axios';
import EditProfile from './components/EditProfile';
import NewItem from './components/NewItem';
import ItemDetail from './components/ItemDetail';
import UserDetail from './components/UserDetail';
import Cart from './components/Cart';

function App() {
    const isLogged = window.localStorage.getItem('isLogged');
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8000/api/items/shownot/' + id)
          .then(response => {
            setItems(response.data)
          })
          .catch(err => {
            console.log(err)
          })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/show/' + id)
            .then(response => {
                setMyItems(response.data)
            })
            .catch(err => {
              console.log(err)
            })
    }, [])

    return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={isLogged? <Dashboard items={items} myItems={myItems} /> : <Login/>} />
              <Route path='/logout' element={<Logout/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/users/edit" element={isLogged? <EditProfile user={user}/> : <Login/>} />
              <Route path="/users/:id" element={isLogged? <UserDetail /> : <Login/>} />
              <Route path="/items/new" element={isLogged? <NewItem user={user} myItems={myItems} setMyItems={setMyItems} /> : <Login/>} />
              <Route path="/items/:id" element={isLogged? <ItemDetail/> : <Login/>} />
              <Route path="/cart" element={isLogged? <Cart /> : <Login/>} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default App;
