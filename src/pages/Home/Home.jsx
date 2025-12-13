import React from "react";
import HomeBanner from "./Banner/HomeBanner";
import DonationProcess from "./DonationProcess/DonationProcess";
import HomeContact from "./HomeContact/HomeContact";
import ImpactStats from "./ImpactStats/ImpactStats";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <DonationProcess></DonationProcess>

      <HomeContact></HomeContact>
      <ImpactStats></ImpactStats>
    </div>
  );
};

export default Home;
