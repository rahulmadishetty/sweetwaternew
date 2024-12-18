'use client';

import React, { useState } from 'react';

import About from '../components/About';
import Analytics from '../components/Analytics';
import Canvas from '../components/Canvas';
import EventsPage from '../components/Feedback';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import LazyShow from '../components/LazyShow';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import Product from '../components/Product';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status

  const handleAdminLogin = () => setIsAdmin(true); // Set admin status on login success
  const handleAdminLogout = () => setIsAdmin(false); // Reset admin status on logout

  return (
    <div className='bg-background grid gap-y-16 overflow-hidden'>
      {/* Header */}
      <Header
        onAdminLogin={handleAdminLogin}
        onAdminLogout={handleAdminLogout}
        isAdmin={isAdmin}
      />

      {/* Main Sections */}
      <div className='relative bg-background'>
        <div className='max-w-10xl mx-auto'>
          <div
            className='relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'
          >
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
      <LazyShow>
        <Product isAdmin={isAdmin} />
      </LazyShow>
      <LazyShow>
        <Gallery />
        <EventsPage />
        <Canvas />
      </LazyShow>

      <About />
      <Analytics />
    </div>
  );
};

export default App;
