import './LandingPage.css';
import HeroSection from './components/HeroSection';
import OffersSection from './components/OffersSection';
import TrendingDestinations from './components/TrendingDestinations';
import BrowseAndExplore from './components/BrowseAndExplore';
import TripPlannerAndDeals from './components/TripPlannerAndDeals';
import TravelMoreSpendLess from './components/TravelMoreSpendLess';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <OffersSection />
      <TrendingDestinations />
      <BrowseAndExplore />
      <TripPlannerAndDeals />
      <TravelMoreSpendLess />
      <Footer />
    </div>
  );
}