
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { 
  Calendar,
  Calendar as CalendarIcon,
  User
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Mentorship() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");
  const [availability, setAvailability] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [sessionDuration, setSessionDuration] = useState<string>("30");

  // Handle availability selection
  const handleAvailabilityChange = (value: string[]) => {
    setAvailability(value);
  };

  // Handle time slot selection
  const handleTimeSlotChange = (value: string[]) => {
    setTimeSlots(value);
  };

  // Handle session duration selection
  const handleSessionDurationChange = (value: string) => {
    if (value) setSessionDuration(value);
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability Saved",
      description: `You've updated your mentorship availability to ${availability.join(", ")}`,
    });
  };

  const handleRequestAction = (id: number, action: string) => {
    toast({
      title: `Request ${action}`,
      description: `You have ${action} the mentorship request.`,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mentorship Portal</h1>
            <p className="text-muted-foreground">Manage your mentorship requests and sessions</p>
          </div>
          
          {user?.role === "student" && (
            <Link to="/mentorship-request">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Find a Mentor
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentorship Stats */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{user?.role === "alumni" ? "Your Impact" : "Your Mentorship"}</CardTitle>
                <CardDescription>
                  {user?.role === "alumni" ? "Your mentorship contribution" : "Track your mentorship journey"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="text-5xl font-bold">0</div>
                  <p className="text-muted-foreground">
                    {user?.role === "alumni" ? "Students Mentored" : "Mentors Connected"}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {user?.role === "alumni" ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Hours Contributed</span>
                        <span className="font-medium">0 hrs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avg. Session Rating</span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Response Rate</span>
                        <span className="font-medium">-</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span>Sessions Completed</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Upcoming Sessions</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Feedback Given</span>
                        <span className="font-medium">0</span>
                      </div>
                    </>
                  )}
                </div>
                
                {user?.role === "alumni" ? (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Top Mentorship Areas</h4>
                    <p className="text-muted-foreground text-sm">No mentorship data available yet.</p>
                  </div>
                ) : (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Skills Development</h4>
                    <p className="text-muted-foreground text-sm">Track your progress through mentorship.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {user?.role === "alumni" ? (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Update Mentorship Preferences
                  </Button>
                ) : (
                  <Link to="/mentorship-request" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Find a Mentor
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
            
            {/* Availability Card - Only for Alumni */}
            {user?.role === "alumni" && (
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
                    <ToggleGroup 
                      type="multiple" 
                      className="justify-start flex-wrap gap-2"
                      value={availability}
                      onValueChange={handleAvailabilityChange}
                    >
                      <ToggleGroupItem value="Mon" className="px-3 py-1">Mon</ToggleGroupItem>
                      <ToggleGroupItem value="Tue" className="px-3 py-1">Tue</ToggleGroupItem>
                      <ToggleGroupItem value="Wed" className="px-3 py-1">Wed</ToggleGroupItem>
                      <ToggleGroupItem value="Thu" className="px-3 py-1">Thu</ToggleGroupItem>
                      <ToggleGroupItem value="Fri" className="px-3 py-1">Fri</ToggleGroupItem>
                      <ToggleGroupItem value="Sat" className="px-3 py-1">Sat</ToggleGroupItem>
                      <ToggleGroupItem value="Sun" className="px-3 py-1">Sun</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Preferred Time Slots</h3>
                    <ToggleGroup 
                      type="multiple" 
                      className="justify-start flex-wrap gap-2"
                      value={timeSlots}
                      onValueChange={handleTimeSlotChange}
                    >
                      <ToggleGroupItem value="morning" className="px-3 py-1">Morning</ToggleGroupItem>
                      <ToggleGroupItem value="afternoon" className="px-3 py-1">Afternoon</ToggleGroupItem>
                      <ToggleGroupItem value="evening" className="px-3 py-1">Evening</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Session Duration</h3>
                    <ToggleGroup 
                      type="single" 
                      className="justify-start flex-wrap gap-2"
                      value={sessionDuration}
                      onValueChange={handleSessionDurationChange}
                    >
                      <ToggleGroupItem value="15" className="px-3 py-1">15 min</ToggleGroupItem>
                      <ToggleGroupItem value="30" className="px-3 py-1">30 min</ToggleGroupItem>
                      <ToggleGroupItem value="45" className="px-3 py-1">45 min</ToggleGroupItem>
                      <ToggleGroupItem value="60" className="px-3 py-1">60 min</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleSaveAvailability}
                  >
                    Save Availability
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Mentorship Requests Tab - Only for Alumni */}
            {user?.role === "alumni" && (
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
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No {activeTab} mentorship requests at the moment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Scheduled Sessions */}
            <Card className={user?.role === "alumni" ? "mt-8" : ""}>
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
                      <TableHead>{user?.role === "alumni" ? "Student" : "Mentor"}</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* No sessions yet */}
                  </TableBody>
                </Table>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                  {user?.role === "student" && (
                    <div className="mt-4">
                      <Link to="/mentorship-request">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Find a Mentor
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" disabled>View Past Sessions</Button>
                </div>
              </CardContent>
            </Card>
            
            {/* For Students: Popular Mentors */}
            {user?.role === "student" && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Popular Mentors</CardTitle>
                  <CardDescription>
                    Connect with our top mentors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <User className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Explore our directory to find mentors that match your interests.
                    </p>
                    <div className="mt-4">
                      <Link to="/mentorship-request">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Browse All Mentors
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
