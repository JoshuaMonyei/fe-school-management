import React from "react";

export const HeroBanner: React.FC = () => {
  const logo = "https://www.svgrepo.com/show/155976/university-outlined-hand-drawn-building.svg";
  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="school logo" />
      </div>
      <h1>
        {" "}
        <span className="hero-banner__whiteline">Darwin</span>
        <span className="hero-banner__headline">College.</span>
      </h1>
    </div>
  );
};
