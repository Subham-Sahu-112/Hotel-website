import './MembershipBanner.css';

export default function MembershipBanner() {
  return (
    <section className="membership-banner">
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-icon">💎</div>
          <div className="banner-text">
            <span className="banner-message">
              Members save 10% or more on over 100,000 hotels worldwide when signed in
            </span>
          </div>
        </div>
        <button className="sign-in-button">
          Sign in now
        </button>
      </div>
    </section>
  );
}