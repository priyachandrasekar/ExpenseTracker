
import './App.css';
import { Container,Row,Col } from 'react-bootstrap';
import {BrowserRouter ,Routes, Route, Link} from 'react-router-dom'
// 


import Signup from './Signup';
import Login from './Login';
import Home from './home'

function App() {  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Signup/>}></Route>
        <Route exact path='/login/' element ={<Login/>}></Route>
        <Route exact path='/home/:email' element ={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
