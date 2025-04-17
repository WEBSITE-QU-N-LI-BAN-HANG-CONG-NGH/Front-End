// src/components/layout/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';

const AppLayout = () => {
    return (
        <div className="flex flex-col bg-white min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Features />
            <Footer />
        </div>
    );
};

export default AppLayout;