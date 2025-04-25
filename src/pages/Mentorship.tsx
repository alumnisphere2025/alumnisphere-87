
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
  Calendar as CalendarIcon 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Mentorship() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("pending");

  // Empty arrays for mentorship requests and sessions
  const mentorshipRequests: Array<any> = [];
  const scheduledSessions: Array<any> = [];

  const handleRequestAction = (id: number, action: string) => {
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
                  <div className="text-5xl font-bold">0</div>
                  <p className="text-muted-foreground">Students Mentored</p>
                </div>
                
                <div className="space-y-4">
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
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Top Mentorship Areas</h4>
                  <p className="text-muted-foreground text-sm">No mentorship data available yet.</p>
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
                    <ToggleGroupItem value="Wed" className="px-3 py-1">Wed</ToggleGroupItem>
                    <ToggleGroupItem value="Thu" className="px-3 py-1">Thu</ToggleGroupItem>
                    <ToggleGroupItem value="Fri" className="px-3 py-1">Fri</ToggleGroupItem>
                    <ToggleGroupItem value="Sat" className="px-3 py-1">Sat</ToggleGroupItem>
                    <ToggleGroupItem value="Sun" className="px-3 py-1">Sun</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Preferred Time Slots</h3>
                  <ToggleGroup type="multiple" className="justify-start flex-wrap gap-2">
                    <ToggleGroupItem value="morning" className="px-3 py-1">Morning</ToggleGroupItem>
                    <ToggleGroupItem value="afternoon" className="px-3 py-1">Afternoon</ToggleGroupItem>
                    <ToggleGroupItem value="evening" className="px-3 py-1">Evening</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Session Duration</h3>
                  <ToggleGroup type="single" className="justify-start flex-wrap gap-2">
                    <ToggleGroupItem value="15" className="px-3 py-1">15 min</ToggleGroupItem>
                    <ToggleGroupItem value="30" className="px-3 py-1">30 min</ToggleGroupItem>
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
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No {activeTab} mentorship requests at the moment.
                  </p>
                </div>
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
                    {/* Empty table body */}
                  </TableBody>
                </Table>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" disabled>View Past Sessions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
