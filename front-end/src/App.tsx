import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ActiveTenders from './pages/ActiveTenders';
import TenderDetails from './pages/TenderDetails';
import MyTenders from './pages/MyTenders';
import BidDetails from './pages/BidDetails';
import Compliance from './pages/Compliance';
import Company from './pages/Company';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import { NotFoundPage } from './components/StateViews';

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
