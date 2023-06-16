import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SocketProvider from 'utils/providers/SocketProvider';
import AuthContextProvider from 'utils/providers/AuthProvider';
import UserInfoContextProvider from 'utils/providers/UserInfoProvider';
import AuthGuard from 'utils/components/AuthGuard';

import TopPanel from 'components/TopPanel';
import Rooms from 'pages/Rooms';
import Room from 'pages/Room';
import AuthPage from 'pages/AuthPage';
import UserSettings from 'pages/UserSettings';

const App: FC = () => (
  <AuthContextProvider>
    <UserInfoContextProvider>
      <SocketProvider>
        <Router>
          <TopPanel />

          <Routes>
            <Route
              path="/login"
              element={
                <AuthGuard reversed>
                  <AuthPage type="login" />
                </AuthGuard>
              }
            />

            <Route
              path="/registration"
              element={
                <AuthGuard reversed>
                  <AuthPage type="registration" />
                </AuthGuard>
              }
            />

            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <UserSettings />
                </AuthGuard>
              }
            />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Rooms />
                </AuthGuard>
              }
            />
            <Route
              path="/rooms/:id/:password"
              element={
                <AuthGuard>
                  <Room />
                </AuthGuard>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SocketProvider>
    </UserInfoContextProvider>
  </AuthContextProvider>
);

export default App;
