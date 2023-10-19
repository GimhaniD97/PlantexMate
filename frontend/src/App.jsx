import './App.css';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './User';
import Home from './Home';
import Addusers from './Addusers';
import Prediction from './Prediction';
import Editusers from './Editusers';
import Lineprediction from './Lineprediction';
import Registration from './Registration';

function App() {
  return (
<Routes>
    <Route path='/' element={<Dashboard/>}>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<User/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/create' element={<Addusers/>}></Route>
        <Route path='/prediction' element={<Prediction/>}></Route>
        <Route path='/lineprediction' element={<Lineprediction/>}></Route>
        <Route path='/employeeEdit/:id' element={<Editusers/>}></Route>
    </Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Registration/>}></Route>

</Routes>   
  );
}

export default App;
