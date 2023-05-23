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
import Watchlist from './components/Watchlist';
import EditItem from './components/EditItem';

function App() {
    const isLogged = window.localStorage.getItem('isLogged');
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [myItems, setMyItems] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
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

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/show/' + id)
            .then(response => {
                setCart(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const removeFromDom = itemId => {
        setMyItems(myItems.filter(item => item._id != itemId));
    }

    return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={isLogged? <Dashboard cart={cart} items={items} myItems={myItems} /> : <Login/>} />
              <Route path='/logout' element={<Logout/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/users/edit" element={isLogged? <EditProfile user1={user} cart={cart}/> : <Login/>} />
              <Route path="/users/:id" element={isLogged? <UserDetail user1={user} cart={cart} /> : <Login/>} />
              <Route path="/items/new" element={isLogged? <NewItem user={user} cart={cart} myItems={myItems} setMyItems={setMyItems}/> : <Login/>} />
              <Route path="/items/:id" element={isLogged? <ItemDetail user1={user} cart={cart} removeFromDom={removeFromDom} /> : <Login/>} />
              <Route path="/items/edit/:id" element={isLogged? <EditItem user={user} cart={cart} /> : <Login/>} />
              <Route path="/cart" element={isLogged? <Cart user={user} /> : <Login/>} />
              <Route path="/favorites" element={isLogged? <Watchlist user={user} cart={cart}/> : <Login/>} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default App;
