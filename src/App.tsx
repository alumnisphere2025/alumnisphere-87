
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import ReferralRequest from "./pages/ReferralRequest";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Announcements from "./pages/Announcements";
import Referrals from "./pages/Referrals";
import Mentorship from "./pages/Mentorship";
import MentorshipRequest from "./pages/MentorshipRequest";
import Leaderboard from "./pages/Leaderboard";
import AlumniDirectory from "./pages/AlumniDirectory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/announcements" 
                element={
                  <ProtectedRoute>
                    <Announcements />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/referrals" 
                element={
                  <ProtectedRoute>
                    <Referrals />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/mentorship" 
                element={
                  <ProtectedRoute>
                    <Mentorship />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/mentorship-request" 
                element={
                  <ProtectedRoute>
                    <MentorshipRequest />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/leaderboard" 
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/alumni-directory" 
                element={
                  <ProtectedRoute>
                    <AlumniDirectory />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/referral-request" 
                element={
                  <ProtectedRoute>
                    <ReferralRequest />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
