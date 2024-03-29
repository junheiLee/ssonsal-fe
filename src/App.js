import { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Error from './components/fix/Error';
import Footer from './components/fix/Footer';
import Header from './components/fix/Header';
import Loading from './components/fix/Loading';
import Main from './pages/Main';


const Rank = lazy(() => import('./pages/rank/Rank'));
const GameList = lazy(() => import('./pages/game/GameList'));
const GameDetail = lazy(() => import('./pages/game/GameDetail'));
const GameForm = lazy(() => import('./pages/game/GameForm'))
const TeamList = lazy(() => import('./pages/team/TeamList'));
const TeamDetail = lazy(() => import('./pages/team/TeamDetail'));
const TeamManager = lazy(() => import('./pages/team/TeamManager'));
const TeamForm = lazy(() => import('./pages/team/TeamForm'));
const TeamEdit = lazy(() => import('./pages/team/TeamEdit'));
const SubReviews = lazy(() => import('./pages/review/SubReviews'));
const TeamReviews = lazy(() => import('./pages/review/TeamReviews'));
const ReportForm = lazy(() => import('./pages/review/ReportForm'));
const SignIn = lazy(() => import('./pages/user/signin'));
const SignUp = lazy(() => import('./pages/user/signup'));
const MyProfile = lazy(() => import('./pages/user/myprofile'));

const AdminMain = lazy(() => import('./pages/admin/AdminMain'));
const AdminUser = lazy(() => import('./pages/admin/User'));
const AdminGame = lazy(() => import('./pages/admin/Game'));
const AdminStats = lazy(() => import('./pages/admin/Stats'));
const AdminReport = lazy(() => import('./pages/admin/AdminReport'));
const Test = lazy(() => import('./pages/admin/Test'));


const App = () => {



  return (
    <div className="App">

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Main />} />

            <Route path="/games/option/:option" element={<GameList />} />

            <Route path="/games/:option/:gameId" element={<GameDetail />} />

            <Route path="/games/new" element={<GameForm />} />

            <Route path="/teams" element={<TeamList />} />
            <Route path='/teams/:id' element={<TeamDetail />} />
            <Route path='/teams/:id/managers' element={<TeamManager />} />
            <Route path='/ranks' element={<Rank />} />
            <Route path="/reviews/team/:teamId" element={<TeamReviews />} />
            <Route path="/reviews/:reviewId/report" element={<ReportForm />} />
            <Route path="/reviews/sub/:userId" element={<SubReviews />} />
            <Route path="/user/sign-in" element={<SignIn />} />
            <Route path="/user/sign-up" element={<SignUp />} />
            <Route path="/user/profile/:userId" element={<MyProfile />} />
            <Route path='/teams/form' element={<TeamForm />} />
            <Route path='/teams/:id/edit' element={<TeamEdit />} />
          </Route>

          <Route path='/admin' element={<AdminMain />} />
          <Route path='/admin/AdminUser' element={<AdminUser />} />
          <Route path='/admin/AdminGame' element={<AdminGame />} />
          <Route path='/admin/AdminStats' element={<AdminStats />} />
          <Route path='/admin/Test' element={<Test />} />
          <Route path='/admin/report' element={<AdminReport />} />
          <Route path='*' element={<Error />} />

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
