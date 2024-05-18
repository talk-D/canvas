import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Theme from './pages/Theme';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Main />} />
          <Route path='/theme' element={<Theme />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
