
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { 
  Calendar,
  MoreVertical, 
  UserPlus, 
  CheckCircle, 
  XCircle, 
  Clock,
  Calendar as CalendarIcon 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Mentorship() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");

  // Sample mentorship requests
  const mentorshipRequests = [
    {
      id: 1,
      student: {
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "https://i.pravatar.cc/150?u=alex"
      },
      topic: "Career Guidance in Software Engineering",
      message: "I'm interested in learning more about career progression in software engineering and would love to get your insights based on your experience.",
      status: "pending",
      date: "2025-03-20"
    },
    {
      id: 2,
      student: {
        name: "Jamie Smith",
        email: "jamie@example.com",
        avatar: "https://i.pravatar.cc/150?u=jamie"
      },
      topic: "Resume Review",
      message: "I would appreciate if you could review my resume and provide feedback before I apply for summer internships.",
      status: "accepted",
      date: "2025-03-18"
    },
    {
      id: 3,
      student: {
        name: "Taylor Williams",
        email: "taylor@example.com",
        avatar: "https://i.pravatar.cc/150?u=taylor"
      },
      topic: "Interview Preparation",
      message: "I have an interview with a tech company next week and would love some guidance on preparing for technical interviews.",
      status: "rejected",
      date: "2025-03-15"
    },
    {
      id: 4,
      student: {
        name: "Morgan Lee",
        email: "morgan@example.com",
        avatar: "https://i.pravatar.cc/150?u=morgan"
      },
      topic: "Industry Insights",
      message: "I'd like to learn more about the current trends in AI and machine learning from your perspective.",
      status: "pending",
      date: "2025-03-10"
    },
  ];

  // Scheduled sessions
  const scheduledSessions = [
    {
      id: 101,
      student: {
        name: "Jamie Smith",
        email: "jamie@example.com",
        avatar: "https://i.pravatar.cc/150?u=jamie"
      },
      topic: "Resume Review",
      date: "2025-03-25",
      time: "15:00",
      duration: "30 min",
      platform: "Zoom",
      status: "upcoming"
    },
    {
      id: 102,
      student: {
        name: "Riley Brown",
        email: "riley@example.com",
        avatar: "https://i.pravatar.cc/150?u=riley"
      },
      topic: "Career Guidance",
      date: "2025-03-22",
      time: "10:00",
      duration: "45 min",
      platform: "Google Meet",
      status: "upcoming"
    },
    {
      id: 103,
      student: {
        name: "Casey Martin",
        email: "casey@example.com",
        avatar: "https://i.pravatar.cc/150?u=casey"
      },
      topic: "Portfolio Review",
      date: "2025-03-10",
      time: "16:30",
      duration: "60 min",
      platform: "Zoom",
      status: "completed"
    },
  ];

  const handleRequestAction = (id: number, action: string) => {
    // In a real app, this would call an API
    toast({
      title: `Request ${action}`,
      description: `You have ${action} the mentorship request.`,
    });
  };

  const filteredRequests = mentorshipRequests.filter(req => {
    if (activeTab === "pending") return req.status === "pending";
    if (activeTab === "accepted") return req.status === "accepted";
    if (activeTab === "rejected") return req.status === "rejected";
    return true;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Mentorship Portal</h1>
        <p className="text-muted-foreground mb-8">Manage your mentorship requests and sessions</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentorship Stats */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
                <CardDescription>
                  Your mentorship contribution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="text-5xl font-bold">12</div>
                  <p className="text-muted-foreground">Students Mentored</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Hours Contributed</span>
                    <span className="font-medium">24 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg. Session Rating</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Response Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Top Mentorship Areas</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Career Guidance</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Resume Reviews</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Technical Guidance</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Update Mentorship Preferences
                </Button>
              </CardFooter>
            </Card>
            
            {/* Availability Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Your Availability</CardTitle>
                <CardDescription>
                  Set your mentorship availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Weekly Availability</h3>
                  <ToggleGroup type="multiple" className="justify-start flex-wrap gap-2">
                    <ToggleGroupItem value="Mon" className="px-3 py-1">Mon</ToggleGroupItem>
                    <ToggleGroupItem value="Tue" className="px-3 py-1">Tue</ToggleGroupItem>
                    <ToggleGroupItem value="Wed" className="px-3 py-1" data-state="on">Wed</ToggleGroupItem>
                    <ToggleGroupItem value="Thu" className="px-3 py-1">Thu</ToggleGroupItem>
                    <ToggleGroupItem value="Fri" className="px-3 py-1" data-state="on">Fri</ToggleGroupItem>
                    <ToggleGroupItem value="Sat" className="px-3 py-1">Sat</ToggleGroupItem>
                    <ToggleGroupItem value="Sun" className="px-3 py-1">Sun</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Preferred Time Slots</h3>
                  <ToggleGroup type="multiple" className="justify-start flex-wrap gap-2">
                    <ToggleGroupItem value="morning" className="px-3 py-1">Morning</ToggleGroupItem>
                    <ToggleGroupItem value="afternoon" className="px-3 py-1" data-state="on">Afternoon</ToggleGroupItem>
                    <ToggleGroupItem value="evening" className="px-3 py-1" data-state="on">Evening</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Session Duration</h3>
                  <ToggleGroup type="single" className="justify-start flex-wrap gap-2">
                    <ToggleGroupItem value="15" className="px-3 py-1">15 min</ToggleGroupItem>
                    <ToggleGroupItem value="30" className="px-3 py-1" data-state="on">30 min</ToggleGroupItem>
                    <ToggleGroupItem value="45" className="px-3 py-1">45 min</ToggleGroupItem>
                    <ToggleGroupItem value="60" className="px-3 py-1">60 min</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Availability</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Mentorship Requests Tab */}
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Requests</CardTitle>
                <Tabs 
                  defaultValue="pending" 
                  onValueChange={setActiveTab} 
                  value={activeTab}
                >
                  <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              
              <CardContent>
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No {activeTab} mentorship requests at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRequests.map(request => (
                      <Card key={request.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={request.student.avatar} alt={request.student.name} />
                                <AvatarFallback>{request.student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{request.student.name}</h4>
                                <p className="text-sm text-muted-foreground">{request.student.email}</p>
                                <p className="text-sm font-medium mt-2">{request.topic}</p>
                                <p className="text-sm mt-2">{request.message}</p>
                              </div>
                            </div>
                            
                            {request.status === "pending" ? (
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRequestAction(request.id, "accepted")}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" /> Accept
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRequestAction(request.id, "rejected")}
                                >
                                  <XCircle className="h-4 w-4 mr-1" /> Decline
                                </Button>
                              </div>
                            ) : (
                              <div className={`text-sm px-3 py-1 rounded-full ${
                                request.status === "accepted" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              }`}>
                                {request.status === "accepted" ? "Accepted" : "Declined"}
                              </div>
                            )}
                          </div>
                          
                          {request.status === "accepted" && (
                            <div className="mt-4 pt-4 border-t">
                              <Button size="sm">
                                <Calendar className="h-4 w-4 mr-1" /> Schedule Session
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Scheduled Sessions */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Upcoming Mentorship Sessions</CardTitle>
                <CardDescription>
                  Your scheduled mentoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledSessions
                      .filter(session => session.status === "upcoming")
                      .map(session => (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={session.student.avatar} />
                                <AvatarFallback>{session.student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{session.student.name}</p>
                                <p className="text-xs text-muted-foreground">{session.student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{session.topic}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <p>{new Date(session.date).toLocaleDateString()}</p>
                                <p className="text-xs text-muted-foreground">{session.time} ({session.duration})</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{session.platform}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Open Calendar</DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                
                {scheduledSessions.filter(session => session.status === "upcoming").length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <Button variant="outline">View Past Sessions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
