import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminCalls from "./pages/admin/AdminCalls";
import AdminCompanyDossiers from "./pages/admin/AdminCompanyDossiers";
import AdminFollowUps from "./pages/admin/AdminFollowUps";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminResearchJobs from "./pages/admin/AdminResearchJobs";
import AdminScores from "./pages/admin/AdminScores";
import AdminShortlist from "./pages/admin/AdminShortlist";
import AdminVendorDetail from "./pages/admin/AdminVendorDetail";
import AdminVendorLeads from "./pages/admin/AdminVendorLeads";
import MissionControlLayout from "./components/admin/AdminLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<MissionControlLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="vendor-leads" element={<AdminVendorLeads />} />
          <Route path="research-jobs" element={<AdminResearchJobs />} />
          <Route path="company-dossiers" element={<AdminCompanyDossiers />} />
          <Route path="scores" element={<AdminScores />} />
          <Route path="calls" element={<AdminCalls />} />
          <Route path="follow-ups" element={<AdminFollowUps />} />
          <Route path="shortlist" element={<AdminShortlist />} />
          <Route path="vendor/:vendorId" element={<AdminVendorDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
