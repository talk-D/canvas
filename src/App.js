import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Theme from './pages/Theme';
import Step1 from './pages/Step1';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Main />} />
           <Route path='/basic/step1' element={<Step1 />} />
          <Route path='/theme' element={<Theme />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
