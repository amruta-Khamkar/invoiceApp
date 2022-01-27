import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import CreateInvoice from './components/CreateInvoice';
import Invoices from './components/Invoices';
import Settings from './components/Settings';
import Preview from './components/Preview';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/home" exact element={<Home/>}/>
        <Route path="/dashboard" exact element={<Dashboard/>}/>
        <Route path="/createinvoice" exact element={<CreateInvoice/>}/>
        <Route path="/invoices" exact element={<Invoices/>}/>
        <Route path="/settings" exact element={<Settings/>}/>
        <Route path="/preview" exact element={<Preview/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
