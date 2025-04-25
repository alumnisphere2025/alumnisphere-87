
import { useState, useEffect } from "react";
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
import { User } from "@/contexts/AuthContext";

interface AlumniData extends User {
  id: string;
  company?: string;
  position?: string;
  graduationYear?: string;
  industry?: string;
  location?: string;
  email: string;
  bio?: string;
  major?: string;
}

export default function AlumniDirectory() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [alumniData, setAlumniData] = useState<AlumniData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get registered users from localStorage
  const getRegisteredUsers = () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  };

  useEffect(() => {
    // Get actual alumni data from registered users
    const registeredUsers = getRegisteredUsers();
    const alumni = registeredUsers.filter((user: AlumniData) => user.role === "alumni");
    setAlumniData(alumni);
    setIsLoading(false);
  }, []);

  const industries = [...new Set(alumniData.map(alum => alum.industry).filter(Boolean))];

  const filteredAlumni = alumniData.filter(alum => {
    const matchesQuery = searchQuery === "" || 
      alum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alum.company && alum.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (alum.position && alum.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (alum.bio && alum.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (alum.major && alum.major.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesIndustry = industryFilter === "" || alum.industry === industryFilter;
    
    return matchesQuery && matchesIndustry;
  });

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

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
                industry && <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map(alum => (
              <Card key={alum.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-600/10 text-blue-700 dark:bg-blue-700/20 dark:text-blue-300">
                        {getInitials(alum.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{alum.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Class of {alum.graduationYear}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alum.position && alum.company && (
                      <div className="flex items-start">
                        <Briefcase className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                        <span>{alum.position} at {alum.company}</span>
                      </div>
                    )}
                    {!alum.company && alum.major && (
                      <div className="flex items-start">
                        <Building className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                        <span>{alum.major}</span>
                      </div>
                    )}
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                      <span className="text-sm">{alum.email}</span>
                    </div>
                    {alum.bio && <p className="mt-3 text-sm border-t pt-3">{alum.bio}</p>}
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Message
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
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
