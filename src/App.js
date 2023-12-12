import logo from './logo.svg';
import './App.css';
import Header from './components/fix/Header';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/Main';
import GameDetail from './pages/game/GameDetail';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/game/GameDetail" element={<GameDetail/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
