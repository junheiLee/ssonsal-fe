import { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Error from './components/fix/Error';
import Footer from './components/fix/Footer';
import Header from './components/fix/Header';
import Loading from './components/fix/Loading';
import Main from './pages/Main';

const Rank = lazy(() => import('./pages/rank/Rank'));
const TeamList = lazy(() => import('./pages/team/TeamList'));
const TeamDetail = lazy(() => import('./pages/team/TeamDetail'));
const TeamManager = lazy(() => import('./pages/team/TeamManager'));
const TeamForm = lazy(() => import('./pages/team/TeamForm'));
const TeamEdit = lazy(() => import('./pages/team/TeamEdit'));
const SubReviews = lazy(() => import('./pages/review/SubReviews'));
const TeamReviews = lazy(() => import('./pages/review/TeamReviews'));
const ReportForm = lazy(() => import('./pages/review/ReportForm'));


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
            <Route path='/ranks' element={<Rank />} />
            <Route path="/reviews/team/:teamId" element={<TeamReviews />} />
            <Route path="/reviews/:reviewId/report" element={<ReportForm />} />
            <Route path="/reviews/sub/:userId" element={<SubReviews />} />

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
      <div className='wrapper'>
        <Header />
        <div className="main-content contentWrapper">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
