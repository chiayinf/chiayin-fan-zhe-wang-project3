import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './login/Login';
import Search from './search/Search';
import Job from './job/Job';
import Favorite from './favorite/Favorite';
import Create from './create/Create';
import JobDetail from './JobDetail';
import reportWebVitals from './reportWebVitals';
import Edit from './edit/Edit';

ReactDOM.render(
  <Router >
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/job" element={<Job />} />
      <Route exact path="/favorite" element={<Favorite />} />
      <Route exact path="/create" element={<Create />} />
      <Route path="/edit/:jobId" element={<Edit />} />
      <Route path="/job/detail/:jobId" element={<JobDetail />} />
      <Route path="/favorite/detail/:jobId" element={<JobDetail />} />
      <Route path="/search/detail/:jobId" element={<JobDetail />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
