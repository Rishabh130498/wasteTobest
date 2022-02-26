import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DashboardContent from './Dashboard';
import Home from './Home';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

const App = () => {
  const history = createBrowserHistory();
  // localStorage.setItem("token", "abcd");
  const [isAuthenticate, setIsAuthenticate] = useState(localStorage.getItem('token') ? true : false);

return (
  <Router history={history}>
      {isAuthenticate ? (
          <Box>
            <Box component="main">
              <Routes>
                <Route exact path="/" element={
                  <DashboardContent>
                    <Home />
                  </DashboardContent>} />
              </Routes>
            </Box>
          </Box>
      ) : (
          <Box component="main">
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
          </Box>
      )}
  </Router>
  );
}

export default App;
