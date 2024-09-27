import React from 'react';
import Header from './components/custom/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/custom/Footer';

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* This will render the routed components */}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
