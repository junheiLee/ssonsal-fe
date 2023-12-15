import logo from './logo.svg';
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react'
import Header from './components/fix/Header';
import Error from './components/fix/Error';
import Footer from './components/fix/Footer';
import Loading from './components/fix/Loading';

import Main from './pages/Main';
// import GameDetail from './pages/game/GameDetail';

const TeamList = lazy(() => import('./pages/team/TeamList'));
const TeamDetail = lazy(() => import('./pages/team/TeamDetail'));
const TeamManager = lazy(() => import('./pages/team/TeamManager'));
const TeamForm = lazy(() => import('./pages/team/TeamForm'));
const TeamEdit = lazy(() => import('./pages/team/TeamEdit'));


const App = () => {
  return (
    <div className="App">

<Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Main />} />
            <Route path="/teams" element={<TeamList />} />
            <Route path='/teams/:id' element={<TeamDetail />} />
            <Route path='/teams/:id/managers' element={<TeamManager />} />
            {/* <Route path="/game/GameDetail" element={<GameDetail/>} /> */}
          </Route>

          <Route path='*' element={<Error />} />
          <Route path='/teams/form' element={<TeamForm />} />
          <Route path='/teams/:id/edit' element={<TeamEdit />} />

        </Routes>
      </Suspense>


    </div>
  );
}

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="main-content">
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
