import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import UserList from './components/userList/UserList';
import Form from './components/form/Form';
import ErrorPage from './components/errorPage/ErrorPage';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route exact path='/' element={<Form />} />
          <Route exact path='/users' element={<UserList />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
