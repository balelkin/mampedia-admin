import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import UserContext from './hooks/context/UserContext';
// import axios from './services/http.service';
import MainRoutes from "./routes";
import ResponsiveAppBar from "./app-bar";

export default function App() {
    const [user, setUser] = useState(null);
    const [socketInstance, setSocketInstance] = useState(null);
    const [isLoading] = useState(true);

    useEffect(() => {
        async function findUser() {
            if (window.location.pathname !== '/login') {
                // await axios
                //     .get('/auth/token')
                //     .then((res) => {
                //         setUser(res);
                //         window.user_id = res.email;
                //         window.passport_id = res.hydraPassportId;
                //         setLoading(false);
                //     })
                //     .catch(() => {
                //         setLoading(false);
                //     });
            }
        }
        findUser();
    }, []);

    // useEffect(() => {
    //     setSocketInstance(SocketService.getSocketInstance());
    // }, []);

    useEffect(() => {
        const { search } = window.location;
        const guestToken = new URLSearchParams(search).get('guestToken');
        console.log('====================')
        if (guestToken) {
            sessionStorage.setItem('guestToken', guestToken);
            window.location.replace('/home');
        }
    }, []);

    const memo = useMemo(
        () => ({
            user,
            setUser,
            isLoading,
            socketInstance,
            setSocketInstance,
        }),
        [user, setUser, isLoading, socketInstance, setSocketInstance],
    );

    return (
        <HelmetProvider>
            <Helmet>
                <title>Govorilnia</title>
            </Helmet>
            <ResponsiveAppBar />
            <Router>
                <UserContext.Provider value={memo}>
                    <MainRoutes />
                </UserContext.Provider>
            </Router>
        </HelmetProvider>
    );
}
