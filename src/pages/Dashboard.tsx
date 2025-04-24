
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  Award,
  Link as LinkIcon
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const isAlumni = user?.role === "alumni";

  // Sample stats and activity data
  const stats = isAlumni 
    ? [
        { title: "Mentees", value: "12", icon: Users },
        { title: "Referrals", value: "24", icon: FileText },
        { title: "Upcoming Sessions", value: "3", icon: Calendar },
        { title: "Leaderboard Position", value: "#5", icon: Award },
      ]
    : [
        { title: "Referral Requests", value: "3", icon: FileText },
        { title: "Mentorship Sessions", value: "2", icon: Calendar },
        { title: "Alumni Connections", value: "8", icon: LinkIcon },
        { title: "Messages Sent", value: "15", icon: MessageSquare },
      ];

  const recentActivity = isAlumni
    ? [
        { type: "Referral", description: "New referral request from Jane Smith", time: "2 hours ago" },
        { type: "Mentorship", description: "Scheduled mentorship session with Mike Jones", time: "Yesterday" },
        { type: "Profile", description: "3 students viewed your profile", time: "2 days ago" },
      ]
    : [
        { type: "Referral", description: "Your referral request was accepted by Alex Alumni", time: "5 hours ago" },
        { type: "Mentorship", description: "New message from your mentor Taylor", time: "Yesterday" },
        { type: "Announcement", description: "New career fair announced", time: "2 days ago" },
      ];

  const announcements = [
    {
      title: "Annual Alumni Meet",
      description: "Join us for the Annual Alumni Meet on June 15th, 2025",
    },
    {
      title: "New Mentorship Program",
      description: "We're launching a structured mentorship program next month",
    },
    {
      title: "Career Fair",
      description: "The Spring Career Fair will be held on April 10th, 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mb-8">Here's what's happening in your AlumniSphere</p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                      {activity.type === "Referral" && <FileText className="h-4 w-4 text-primary" />}
                      {activity.type === "Mentorship" && <Users className="h-4 w-4 text-primary" />}
                      {activity.type === "Profile" && <Users className="h-4 w-4 text-primary" />}
                      {activity.type === "Announcement" && <Bell className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" /> Announcements
              </CardTitle>
              <CardDescription>Latest updates from AlumniSphere</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-1">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Role-specific content */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">
            {isAlumni ? "Your Impact" : "Your Growth"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isAlumni ? (
              <>
                {/* Alumni-specific components */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship Requests</CardTitle>
                    <CardDescription>Students waiting for your guidance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>You have 5 pending mentorship requests</p>
                    {/* This would typically be a list of requests */}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Impact</CardTitle>
                    <CardDescription>Students you've helped with referrals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>15 students successfully placed with your referrals</p>
                    {/* This would typically show more statistics */}
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Student-specific components */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship Opportunities</CardTitle>
                    <CardDescription>Alumni available for mentorship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>12 alumni in your field are available for mentorship</p>
                    {/* This would typically be a list of alumni */}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Opportunities</CardTitle>
                    <CardDescription>Companies with alumni connections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Alumni work at 25+ companies in your field of interest</p>
                    {/* This would typically show more information */}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
