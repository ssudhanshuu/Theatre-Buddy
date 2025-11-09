import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HeroSection from '../component/HeroSection';
import FeaturedSection from '../component/FeaturedSection';
import Footer from '../component/Footer';
import TrailersSection from '../component/TrailersSection';
import Explore from '../component/Explore';

function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <HeroSection />
      <Explore />
      <FeaturedSection />
      <TrailersSection />
<<<<<<< HEAD
     <Footer/>
=======
     
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
    </>
  );
}

export default Home;
