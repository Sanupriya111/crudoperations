import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import  List  from './components/List '
import  { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Editform from './components/Editform';

function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
    <Route path='/' element={ <List/>}></Route>
    {/* <Route path='/list' element={<List/>}></Route> */}
    {<Route path='/edit/:id' element={<Editform/>}></Route> }
    </Routes></BrowserRouter>
      
      </div>
  );
}

export default App;
