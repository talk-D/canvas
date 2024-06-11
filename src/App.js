import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Theme from './pages/Theme';
import Step1 from './pages/Step1';
import Thumbnail from './pages/Thumbnail';
import Password from './pages/Password';
import FriendList from './pages/Friendlist';
import Tabbar from './pages/Tabbar';
import Chatroom from './pages/Chatroom';
import CharacterChatroom from './pages/CharacterChatroom';
import Notification from './pages/Notification';
import CharacterNotification from './pages/CharacterNotification';
import Step3 from './pages/Step3';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Main />} />
           <Route path='/step1' element={<Step1 />} />
           <Route path='/step2/thumbnail' element={<Thumbnail />} />
           <Route path='/step2/password' element={<Password />} />
           <Route path='/step2/friendlist' element={<FriendList />} />
           <Route path='/step2/tabbar' element={<Tabbar />} />
           <Route path='step2/chatroom' element={<Chatroom />} />
            <Route path='step2/characterchatroom' element={<CharacterChatroom />} />
           <Route path='/step2/notification' element={<Notification />} />
            <Route path='/step2/characternotification' element={<CharacterNotification />} />
           <Route path='/step3' element={<Step3 />} />
          <Route path='/theme' element={<Theme />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
