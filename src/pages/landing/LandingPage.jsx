import './LandingPage.css';
import HeroSection from './components/HeroSection';
import OffersSection from './components/OffersSection';
import TrendingDestinations from './components/TrendingDestinations';
import BrowseAndExplore from './components/BrowseAndExplore';
import TripPlannerAndDeals from './components/TripPlannerAndDeals';
import TravelMoreSpendLess from './components/TravelMoreSpendLess';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <OffersSection />
      <TrendingDestinations />
      <BrowseAndExplore />
      <TripPlannerAndDeals />
      <TravelMoreSpendLess />
    </div>
  );
}