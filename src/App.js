import logo from './logo.svg';
import './App.css';
import Header from './components/fix/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={ <Main /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
