
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Timeline from "./pages/Timeline";
import MonthPage from "./pages/MonthPage";
import CampaignDetail from "./pages/CampaignDetail";
import SeriesDetail from "./pages/SeriesDetail";
import NewProgramming from "./pages/NewProgramming";
import ContentOverview from "./pages/ContentOverview";
import PillarPage from "./pages/PillarPage";
import BrandedContent from "./pages/BrandedContent";
import BrandedCampaignDetail from "./pages/BrandedCampaignDetail";
import CategoryPage from "./pages/CategoryPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/pillar/:pillar" element={<PillarPage />} />
        <Route path="/:slug" element={<MonthPage />} />
        <Route path="/campaigns/:slug" element={<CampaignDetail />} />
        <Route path="/series/:slug" element={<SeriesDetail />} />
        <Route path="/new-programming" element={<NewProgramming />} />
        <Route path="/content-overview" element={<ContentOverview />} />
        <Route path="/branded-content" element={<BrandedContent />} />
        <Route path="/branded-campaigns/:slug" element={<BrandedCampaignDetail />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
