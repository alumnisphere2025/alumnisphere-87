
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Avatar, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Briefcase, Building, Mail, Search, User2 } from "lucide-react";

export default function AlumniDirectory() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  // Sample alumni data
  const alumniData = [
    {
      id: "1",
      name: "Alex Johnson",
      company: "Tech Solutions Inc.",
      role: "Software Engineer",
      gradYear: "2018",
      industry: "Technology",
      location: "San Francisco, CA",
      email: "alex.johnson@example.com",
      bio: "Experienced software engineer with a passion for web development and cloud architecture."
    },
    {
      id: "2",
      name: "Morgan Lee",
      company: "DataVision Analytics",
      role: "Data Scientist",
      gradYear: "2019",
      industry: "Data Science",
      location: "New York, NY",
      email: "morgan.lee@example.com",
      bio: "Data scientist specializing in machine learning and predictive analytics."
    },
    {
      id: "3",
      name: "Taylor Wilson",
      company: "Creative Designs",
      role: "UX Designer",
      gradYear: "2017",
      industry: "Design",
      location: "Los Angeles, CA",
      email: "taylor.wilson@example.com",
      bio: "UX designer passionate about creating intuitive and accessible user experiences."
    },
    {
      id: "4",
      name: "Jamie Smith",
      company: "InnovateCorp",
      role: "Product Manager",
      gradYear: "2016",
      industry: "Product Management",
      location: "Seattle, WA",
      email: "jamie.smith@example.com",
      bio: "Product manager with experience in tech startups and enterprise software."
    },
    {
      id: "5",
      name: "Jordan Brown",
      company: "Finance Solutions",
      role: "Financial Analyst",
      gradYear: "2020",
      industry: "Finance",
      location: "Chicago, IL",
      email: "jordan.brown@example.com",
      bio: "Financial analyst with expertise in market research and investment strategies."
    }
  ];

  const industries = [...new Set(alumniData.map(alum => alum.industry))];

  const filteredAlumni = alumniData.filter(alum => {
    const matchesQuery = searchQuery === "" || 
      alum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alum.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesIndustry = industryFilter === "" || alum.industry === industryFilter;
    
    return matchesQuery && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Alumni Directory</h1>
        <p className="text-muted-foreground mb-8">Connect with alumni from your university</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, company, role or bio..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map(alum => (
              <Card key={alum.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {alum.name.split(" ").map(name => name[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{alum.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Class of {alum.gradYear}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Briefcase className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                      <span>{alum.role}</span>
                    </div>
                    <div className="flex items-start">
                      <Building className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                      <span>{alum.company}</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                      <span className="text-sm">{alum.email}</span>
                    </div>
                    <p className="mt-3 text-sm border-t pt-3">{alum.bio}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Message
                      </Button>
                      <Button size="sm" className="flex-1">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <User2 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h2 className="text-xl font-medium">No alumni found</h2>
            <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
