
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Navbar */}
      <nav className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Portfolio</h1>
          <div className="flex items-center gap-4">
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Hi, I'm [Your Name]</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Computer Science Student at [Your University]
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/projects">
              <Button size="lg">View My Projects</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Get in Touch</Button>
            </Link>
          </div>
        </div>

        {/* About Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground">
            I'm a passionate computer science student interested in web development
            and software engineering. I love building things that live on the internet
            and learning new technologies.
          </p>
        </section>

        {/* Skills Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["JavaScript", "React", "HTML/CSS", "Python", "Git", "Node.js"].map((skill) => (
              <div key={skill} className="p-4 bg-muted rounded-lg text-center">
                {skill}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
