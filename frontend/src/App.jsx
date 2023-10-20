import './App.css';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import Admindashboard from './admin/Dashboard';
import LineChartFromDatabase from './admin/Home';
import Addline from './admin/Addline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

import Lineprediction from './Lineprediction';
import Registration from './Registration';
import ProductionLines from './admin/ProductionLines';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="lineprediction" element={<Lineprediction />} />
      </Route>
      <Route path="admin/dashboard" element={<Admindashboard />}>
        <Route index element={<LineChartFromDatabase />} />
        <Route path="lineprediction" element={<Lineprediction />} />
        <Route path="addline" element={<Addline />} />
        <Route path="all_lines" element={<ProductionLines />} />
        
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
    </Routes>
  );
}

export default App;
