import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TendersPage from './pages/TendersPage';
import CreateTenderPage from './pages/CreateTenderPage';
import TenderDetailPage from './pages/TenderDetailPage';
import BiddersPage from './pages/BiddersPage';
import CompliancePage from './pages/CompliancePage';
import EvaluationsPage from './pages/EvaluationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import MyTendersPage from './pages/MyTendersPage';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/tenders/create" element={<CreateTenderPage />} />
          <Route path="/tenders/:id" element={<TenderDetailPage />} />
          <Route path="/my-tenders" element={<MyTendersPage />} />
          <Route path="/bidders" element={<BiddersPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/evaluations" element={<EvaluationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
