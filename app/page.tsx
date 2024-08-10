import ContactUs from '@/components/ContactUs';
import TradingViewCryptoMarket from '@/components/Dashboard/Widgets/TradingViewCryptoMarket';
import TradingViewTimeline from '@/components/Dashboard/Widgets/TradingViewTimeline';
import Footer from '@/components/Footer';
import Meta from '@/components/Global/Meta';
import Hero from '@/components/Home/Hero';
import HomeWorkEthics from '@/components/Home/HomeWorkEthics';
import TradingPlans from '@/components/Home/TradingPlans';
import WhatIsForex from '@/components/Home/WhatIsForex';
import Navbar from '@/components/Navbar';
import OurServices from '@/components/OurServices';

export default function Home() {
  return (
    <>
      <Meta />
      <Navbar />
      <main>
        <Hero />
        <OurServices />
        <WhatIsForex />
        <HomeWorkEthics />
        <TradingPlans />
        <TradingViewCryptoMarket />
        <TradingViewTimeline />
        <ContactUs />
        <Footer />
      </main>
    </>
  );
}
