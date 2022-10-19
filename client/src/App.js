import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import ToDoUser from './views/ToDoUser';

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/toDoUser:_id' element={<ToDoUser />} />
      </Routes>
    </div>
  );
}

export default App;
