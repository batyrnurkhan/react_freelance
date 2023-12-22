// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/auth/RegisterPage';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import FreelancerListPage from './components/FreelancerListPage';
import FreelancerProfilePage from './components/FreelancerProfilePage';
import CreateReviewPage from './components/CreateReviewPage';
import HomePage from './components/HomePage';
import Navbar from "./components/footerNavbar/Navbar";
import ChatListPage from "./components/chat/ChatList"
import { AuthProvider } from './context/AuthContext';
import ListingsPage from "./components/listing/ListingsPage";
import ChatPage from "./components/chat/ChatPage";
import EditProfilePage from "./components/auth/EditProfilePage";
import AddReviewPage from "./components/AddReviewPage";
import ListingDetailPage from "./components/listing/ListingDetailPage";
import CreateListing from "./components/listing/CreateListing";
function App() {
  return (
      <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/listings/:slug" element={<ListingDetailPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} /> {/* Add this line */}
        <Route path="/" element={<HomePage />} /> {/* Add HomePage route */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/freelancers" element={<FreelancerListPage />} />
        <Route path="/freelancer/:username" element={<FreelancerProfilePage />} />
        <Route path="/freelancer/:freelancer_id/review" element={<CreateReviewPage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/freelancer/:username/add-review" element={<AddReviewPage />} />
        <Route path="/chats/:chatId" element={<ChatPage />} />
      </Routes>
    </Router>
      </AuthProvider>
  );
}

export default App;
