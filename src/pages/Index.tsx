
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar with theme-specific glass effect */}
      <header className="sticky top-0 z-50 backdrop-blur-md header-bg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gradient">
              AlumniSphere
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="animate-float"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced theme-specific animations */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-slide-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gradient">
            Connecting Alumni &<br />Students for Success
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            AlumniSphere brings together alumni and students in a collaborative platform 
            to foster mentorship, career growth, and community connections.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto premium-gradient text-white hover:opacity-90 shadow-[0_0_15px_rgba(148,0,255,0.3)]">
                Join the Community
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto light-border light-hover">
                Log In
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center animate-float">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70 z-0 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70 z-0 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Alumni and students networking" 
              className="rounded-lg shadow-xl relative z-10 w-full glass-card"
            />
          </div>
        </div>
      </section>

      {/* Features Section with theme-specific cards */}
      <section className="features-bg py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            <div className="light-card rounded-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">Mentorship Program</h3>
              <p className="text-muted-foreground">
                Connect students with alumni mentors for guidance on career development, 
                industry insights, and professional growth.
              </p>
            </div>
            
            <div className="light-card rounded-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">Referral Network</h3>
              <p className="text-muted-foreground">
                Streamlined process for students to request referrals from alumni,
                enhancing career opportunities and professional connections.
              </p>
            </div>
            
            <div className="light-card rounded-lg p-6 hover:scale-105 transition-transform duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">Community Engagement</h3>
              <p className="text-muted-foreground">
                Leaderboards, events, and announcements to foster a vibrant community 
                of alumni and students engaged in mutual growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action with enhanced theme-specific glass effect */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass-card neo-box rounded-xl p-8 md:p-12 text-center animate-fade-slide-in">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Ready to Join AlumniSphere?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Whether you're an alumni looking to give back or a student seeking guidance,
            AlumniSphere provides the perfect platform to connect and grow together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto premium-gradient text-white">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto light-border">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with theme-specific border */}
      <footer className="mt-auto footer-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl font-bold text-gradient">AlumniSphere</h1>
              <p className="text-sm text-muted-foreground">Connecting alumni and students for success</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AlumniSphere. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
