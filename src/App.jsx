import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ToastProvider } from "./context/ToastContext";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveScore from "./components/LiveScore";
import UpcomingMatches from "./components/UpcomingMatches";
import FeaturedPlayers from "./components/FeaturedPlayers";
import PointsTable from "./components/PointsTable";
import Highlights from "./components/Highlights";
import News from "./components/News";
import WhyChooseUs from "./components/WhyChooseUs";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AlertPopup from "./components/AlertPopup";
import ScrollTop from "./components/ScrollTop";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastProvider>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <div className="bg-ink">
        <Navbar />
        <main>
          <Hero />
          <LiveScore />
          <UpcomingMatches />
          <FeaturedPlayers />
          <PointsTable />
          <Highlights />
          <News />
          <WhyChooseUs />
          <Stats />
          <Testimonials />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
        <AlertPopup />
        <ScrollTop />
      </div>
    </ToastProvider>
  );
}
