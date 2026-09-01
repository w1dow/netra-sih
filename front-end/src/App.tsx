import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import ActiveTenders from './pages/ActiveTenders/ActiveTenders';
import TenderDetails from './pages/TenderDetails/TenderDetails';
import MyTenders from './pages/MyTenders/MyTenders';
import BidDetails from './pages/MyTenders/BidDetails';
import Compliance from './pages/Compliance/Compliance';
import Profile from './pages/Profile/Profile';
import Company from './pages/Company/Company';
import Notifications from './pages/Notifications/Notifications';
import Calendar from './pages/Calendar/Calendar';
import Login from './pages/Auth/Login';
import NotFoundPage from './components/common/NotFoundPage';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tenders" element={<ActiveTenders />} />
          <Route path="/tenders/:id" element={<TenderDetails />} />
          <Route path="/my-tenders" element={<MyTenders />} />
          <Route path="/my-tenders/:bidId" element={<BidDetails />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/company" element={<Company />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
