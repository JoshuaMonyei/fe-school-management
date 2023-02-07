import React from "react";
import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";

const HomePage: React.FC = () => (
  <PageLayout>
    <HeroBanner />
  </PageLayout>
);

export default HomePage;
