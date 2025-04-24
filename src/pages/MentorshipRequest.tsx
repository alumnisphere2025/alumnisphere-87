
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Briefcase, 
  Mail, 
  Calendar, 
  Clock, 
  MessageCircle,
  LinkedinIcon
} from "lucide-react";

export default function MentorshipRequest() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [mentorshipTopic, setMentorshipTopic] = useState("");
  const [mentorshipMessage, setMentorshipMessage] = useState("");

  // Sample mentors data
  const mentors = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      yearsOfExperience: 8,
      expertise: ["Web Development", "Cloud Architecture", "System Design"],
      availability: "High",
      avatar: "https://i.pravatar.cc/150?u=alex",
      bio: "Experienced software engineer with a passion for mentoring junior developers."
    },
    {
      id: "2",
      name: "Jamie Smith",
      role: "Product Manager",
      company: "InnovateCorp",
      yearsOfExperience: 6,
      expertise: ["Product Strategy", "User Research", "Go-to-Market"],
      availability: "Medium",
      avatar: "https://i.pravatar.cc/150?u=jamie",
      bio: "Product manager helping students transition into product roles."
    },
    {
      id: "3",
      name: "Morgan Lee",
      role: "Data Scientist",
      company: "DataVision Analytics",
      yearsOfExperience: 5,
      expertise: ["Machine Learning", "Data Analysis", "Python"],
      availability: "Low",
      avatar: "https://i.pravatar.cc/150?u=morgan",
      bio: "Data scientist with a background in academic research now working in industry."
    },
    {
      id: "4",
      name: "Taylor Wilson",
      role: "UX Designer",
      company: "Creative Designs",
      yearsOfExperience: 7,
      expertise: ["User Experience", "UI Design", "User Research"],
      availability: "High",
      avatar: "https://i.pravatar.cc/150?u=taylor",
      bio: "UX designer passionate about creating intuitive user experiences."
    },
  ];

  // Sample active sessions
  const activeSessions = [
    {
      id: "s1",
      mentor: {
        name: "Alex Johnson",
        role: "Software Engineer",
        avatar: "https://i.pravatar.cc/150?u=alex",
      },
      topic: "Career Guidance",
      date: "2025-03-28",
      time: "15:00",
      status: "scheduled"
    },
    {
      id: "s2",
      mentor: {
        name: "Jamie Smith",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?u=jamie",
      },
      topic: "Interview Preparation",
      date: "2025-04-05",
      time: "10:30",
      status: "scheduled"
    }
  ];

  // Past mentorship sessions
  const pastSessions = [
    {
      id: "p1",
      mentor: {
        name: "Taylor Wilson",
        role: "UX Designer",
        avatar: "https://i.pravatar.cc/150?u=taylor",
      },
      topic: "Portfolio Review",
      date: "2025-03-01",
      feedback: "Great session! Taylor provided valuable insights on improving my portfolio.",
      rating: 5
    },
    {
      id: "p2",
      mentor: {
        name: "Morgan Lee",
        role: "Data Scientist",
        avatar: "https://i.pravatar.cc/150?u=morgan",
      },
      topic: "Data Science Projects",
      date: "2025-02-15",
      feedback: "Very helpful in guiding my data science project approach.",
      rating: 4
    }
  ];

  // Filter mentors based on search query
  const filteredMentors = mentors.filter(mentor => {
    const searchLower = searchQuery.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.role.toLowerCase().includes(searchLower) ||
      mentor.company.toLowerCase().includes(searchLower) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });

  const handleSendRequest = () => {
    if (!selectedMentor || !mentorshipTopic || !mentorshipMessage) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the request to the API
    toast({
      title: "Mentorship Request Sent",
      description: "Your request has been sent to the mentor. They will respond soon.",
    });
    
    // Reset form
    setSelectedMentor(null);
    setMentorshipTopic("");
    setMentorshipMessage("");
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "High":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Find a Mentor</h1>
        <p className="text-muted-foreground mb-8">
          Connect with alumni mentors who can guide you on your career journey
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mentor Search */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Browse Mentors</CardTitle>
                <CardDescription>
                  Find mentors based on your interests and career goals
                </CardDescription>
                
                <div className="relative mt-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, role, company or skills..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                {filteredMentors.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No mentors found matching your search criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredMentors.map(mentor => (
                      <Card key={mentor.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="p-6 md:w-3/4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-bold text-lg">{mentor.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  <span>{mentor.role} at {mentor.company}</span>
                                </div>
                                <div className="mt-1">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(mentor.availability)}`}>
                                    {mentor.availability} Availability
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="mt-4">{mentor.bio}</p>
                            
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2">Areas of Expertise:</p>
                              <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map((skill, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-muted text-xs px-3 py-1 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-6 flex flex-col justify-center items-center md:w-1/4">
                            <p className="text-center mb-4 font-medium">{mentor.yearsOfExperience} years of experience</p>
                            <div className="space-y-2 w-full">
                              <Button 
                                className="w-full"
                                onClick={() => setSelectedMentor(mentor.id)}
                              >
                                Request Mentorship
                              </Button>
                              <Button variant="outline" className="w-full">
                                <Mail className="h-4 w-4 mr-1" /> Contact
                              </Button>
                              <Button variant="outline" className="w-full">
                                <LinkedinIcon className="h-4 w-4 mr-1" /> LinkedIn
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Request Form and Active Sessions */}
          <div className="space-y-6">
            {/* Mentorship Request Form */}
            <Card>
              <CardHeader>
                <CardTitle>Request Mentorship</CardTitle>
                <CardDescription>
                  Fill out the form to request mentorship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor">Select Mentor</Label>
                  <Select value={selectedMentor || ""} onValueChange={setSelectedMentor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Mentors</SelectLabel>
                        {mentors.map(mentor => (
                          <SelectItem key={mentor.id} value={mentor.id}>
                            {mentor.name} - {mentor.role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic">Mentorship Topic</Label>
                  <Input
                    id="topic"
                    placeholder="E.g., Career advice, Resume review, etc."
                    value={mentorshipTopic}
                    onChange={(e) => setMentorshipTopic(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe what you need help with..."
                    rows={4}
                    value={mentorshipMessage}
                    onChange={(e) => setMentorshipMessage(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSendRequest}>
                  Send Mentorship Request
                </Button>
              </CardFooter>
            </Card>
            
            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Your Mentorship</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Tabs defaultValue="active">
                  <div className="px-6">
                    <TabsList className="w-full">
                      <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                      <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="active" className="mt-0">
                    {activeSessions.length === 0 ? (
                      <div className="text-center py-8 px-6">
                        <p className="text-muted-foreground">No active mentorship sessions.</p>
                      </div>
                    ) : (
                      <div>
                        {activeSessions.map(session => (
                          <div key={session.id} className="py-4 px-6 border-b last:border-0">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={session.mentor.avatar} />
                                <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{session.mentor.name}</h4>
                                <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center text-sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                <span>{session.topic}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(session.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{session.time}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex space-x-2">
                              <Button size="sm">Join Meeting</Button>
                              <Button size="sm" variant="outline">Reschedule</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="past" className="mt-0">
                    {pastSessions.length === 0 ? (
                      <div className="text-center py-8 px-6">
                        <p className="text-muted-foreground">No past mentorship sessions.</p>
                      </div>
                    ) : (
                      <div>
                        {pastSessions.map(session => (
                          <div key={session.id} className="py-4 px-6 border-b last:border-0">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={session.mentor.avatar} />
                                <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{session.mentor.name}</h4>
                                <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex items-center text-sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                <span>{session.topic}</span>
                              </div>
                              <div className="flex items-center text-sm mt-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(session.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <p className="text-sm">{session.feedback}</p>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className={`h-4 w-4 ${
                                      star <= session.rating 
                                        ? "text-yellow-400" 
                                        : "text-gray-300"
                                    }`}>
                                      ★
                                    </div>
                                  ))}
                                </div>
                                <span className="ml-2 text-sm">{session.rating}/5</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
