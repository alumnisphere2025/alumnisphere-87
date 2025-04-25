
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A web application built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      title: "Project 2",
      description: "A mobile-responsive portfolio website",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "#"
    },
    {
      title: "Project 3",
      description: "A Python-based data analysis tool",
      technologies: ["Python", "Pandas", "Matplotlib"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">My Portfolio</Link>
          <div className="flex items-center gap-4">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Projects</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-primary/10 text-primary text-sm px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
