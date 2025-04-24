
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Announcements() {
  const { user } = useAuth();
  const isAdmin = user?.role === "alumni"; // For demo, let's assume alumni can create announcements
  const [searchQuery, setSearchQuery] = useState("");

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "Annual Alumni Meet 2025",
      date: "2025-06-15",
      category: "Events",
      content: "We are excited to announce our Annual Alumni Meet scheduled for June 15th, 2025 at the University Grand Hall. This year's theme is 'Reconnecting Futures' and will feature keynote speeches from distinguished alumni, networking sessions, and much more.",
      important: true,
    },
    {
      id: 2,
      title: "New Mentorship Program Launch",
      date: "2025-04-01",
      category: "Programs",
      content: "We're launching a structured mentorship program next month that pairs alumni with current students based on career interests and goals. The program will run for 6 months with regular check-ins and guidance sessions.",
      important: true,
    },
    {
      id: 3,
      title: "Spring Career Fair",
      date: "2025-04-10",
      category: "Career",
      content: "The Spring Career Fair will be held on April 10th, 2025 at the University Campus. Over 50 companies will be participating, including many with alumni connections. Students should prepare their resumes and business attire.",
      important: false,
    },
    {
      id: 4,
      title: "Alumni Spotlight Series",
      date: "2025-03-25",
      category: "Programs",
      content: "Our monthly Alumni Spotlight Series continues with Jane Smith (Class of 2015) who will share her journey in the tech industry and provide insights on breaking into Silicon Valley. Join us online on March 25th.",
      important: false,
    },
    {
      id: 5,
      title: "Scholarship Fund Contributors",
      date: "2025-03-10",
      category: "News",
      content: "We're grateful to announce that our Alumni Scholarship Fund has received significant contributions this quarter. These funds will help support 15 deserving students with their tuition and educational expenses.",
      important: false,
    },
  ];
  
  const currentDate = new Date();
  const upcomingAnnouncements = announcements.filter(
    (a) => new Date(a.date) >= currentDate
  );
  
  const filteredAnnouncements = announcements.filter(
    (a) => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold">Announcements</h1>
          
          <div className="relative mt-4 sm:mt-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-9 w-full sm:w-auto min-w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            
            {isAdmin && (
              <Button>
                <Bell className="mr-2 h-4 w-4" /> Create Announcement
              </Button>
            )}
          </div>
          
          <div className="mt-6">
            <TabsContent value="all" className="space-y-4">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))
              ) : (
                <p className="text-center p-6 text-muted-foreground">
                  No announcements match your search.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="important" className="space-y-4">
              {filteredAnnouncements.filter((a) => a.important).length > 0 ? (
                filteredAnnouncements
                  .filter((a) => a.important)
                  .map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                  ))
              ) : (
                <p className="text-center p-6 text-muted-foreground">
                  No important announcements at the moment.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingAnnouncements.filter((a) => 
                filteredAnnouncements.some((fa) => fa.id === a.id)
              ).length > 0 ? (
                upcomingAnnouncements
                  .filter((a) => filteredAnnouncements.some((fa) => fa.id === a.id))
                  .map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                  ))
              ) : (
                <p className="text-center p-6 text-muted-foreground">
                  No upcoming announcements at the moment.
                </p>
              )}
            </TabsContent>
          </div>
        </Tabs>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how you receive announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Email notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important announcements via email
                  </p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notif">Push notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified in the app for new announcements
                  </p>
                </div>
                <Switch id="push-notif" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="important-only">Important announcements only</Label>
                  <p className="text-sm text-muted-foreground">
                    Only receive notifications for important announcements
                  </p>
                </div>
                <Switch id="important-only" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// Announcement Card Component
function AnnouncementCard({ announcement }: { announcement: any }) {
  const formattedDate = new Date(announcement.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className={`${announcement.important ? "border-l-4 border-l-primary" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{announcement.title}</CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground bg-muted rounded-full px-3 py-1 mr-3">
                {announcement.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> {formattedDate}
              </span>
            </div>
          </div>
          {announcement.important && (
            <div className="bg-primary/10 text-primary text-xs font-medium rounded-full px-3 py-1">
              Important
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p>{announcement.content}</p>
      </CardContent>
    </Card>
  );
}
