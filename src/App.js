import LoginPage from './components/loginPage/loginPage.jsx';
import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes.js";
// Components Export
import AdminPage from './components/adminPage/adminPage';
import Dashboard from './components/adminPage/dashboardScreen/dashboard.jsx';
import Users from './components/adminPage/usersScreen/users.jsx';
import Selects from './components/adminPage/subjectsScreen/subjects.jsx';
import Topics from './components/adminPage/topicsScreen/topics.jsx';
import Progress from './components/adminPage/progressScreen/progress.jsx';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';



function App(props) {
  const PrivateRoutes = () => {
    return (
      props.isLoggedIn ? <Outlet /> : <Navigate to='/' />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
          {
            <div className="App">
              <header className="App-header">
                <LoginPage />
              </header>
            </div>
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route path="/adminpage" element={<AdminPage />}>
            <Route path="/adminpage" element={<Dashboard />} />
            <Route path="/adminpage/Users" element={<Users />} />
            <Route path="/adminpage/Subjects" element={<Selects />} />
            <Route path="/adminpage/Topics" element={<Topics />} />
            <Route path="/adminpage/Progress" element={<Progress />} />
          </Route>
        </Route>
        <Route path="*" element={<h1> Not Found </h1>} />

      </Routes>
    </BrowserRouter>

  );
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isAuthorize.isLoggedIn,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch({ type: actionTypes.LOG_OUT }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
