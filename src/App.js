import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Theme from './pages/Theme';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Theme />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
