import "./TravelMoreSpendLess.css";

export default function TravelMoreSpendLess() {
  return (
    <section className="travel-more-spend-less">
      <div className="travel-container">
        
        <div className="section-header">
          <h2 className="section-title">Travel more, spend less</h2>
        </div>

        {/* Genius Membership Section */}
        <div className="genius-membership-card">
          <div className="genius-content">
            <div className="genius-text">
              <h3 className="genius-title">Sign in, save money</h3>
              <p className="genius-description">
                Save 10% or more at participating properties – just look for the blue Genius label
              </p>
              <div className="genius-buttons">
                <button className="sign-in-btn">Sign in</button>
                <button className="register-btn">Register</button>
              </div>
            </div>
            <div className="genius-icon">
              <div className="genius-badge">
                <span className="genius-logo">Genius</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vacation Rentals Section */}
        <div className="vacation-rentals-card">
          <div className="vacation-content">
            <div className="vacation-text">
              <h3 className="vacation-title">Want to feel at home on your next adventure?</h3>
              <button className="discover-btn">Discover vacation rentals</button>
            </div>
            <div className="vacation-illustration">
              <div className="home-scene">
                <div className="chair">
                  <div className="chair-back"></div>
                  <div className="chair-seat"></div>
                  <div className="chair-legs"></div>
                </div>
                <div className="table">
                  <div className="table-top"></div>
                  <div className="table-leg"></div>
                </div>
                <div className="plant">
                  <div className="pot"></div>
                  <div className="leaves"></div>
                </div>
                <div className="decorative-elements">
                  <div className="circle blue-circle"></div>
                  <div className="circle yellow-circle"></div>
                  <div className="wave-pattern"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}