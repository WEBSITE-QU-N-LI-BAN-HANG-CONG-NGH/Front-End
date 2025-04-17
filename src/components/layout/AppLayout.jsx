import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';

const AppLayout = () => {
    return (
        <div className="flex flex-col bg-white">
            <Header />
            <main>
                <Outlet />
            </main>
            <Features />
            <Footer />
        </div>
    );
};

export default AppLayout;