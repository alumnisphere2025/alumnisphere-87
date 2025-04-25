
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

  // Empty stats and activity data
  const stats = isAlumni 
    ? [
        { title: "Mentees", value: "0", icon: Users },
        { title: "Referrals", value: "0", icon: FileText },
        { title: "Upcoming Sessions", value: "0", icon: Calendar },
        { title: "Leaderboard Position", value: "-", icon: Award },
      ]
    : [
        { title: "Referral Requests", value: "0", icon: FileText },
        { title: "Mentorship Sessions", value: "0", icon: Calendar },
        { title: "Alumni Connections", value: "0", icon: LinkIcon },
        { title: "Messages Sent", value: "0", icon: MessageSquare },
      ];

  const recentActivity: Array<{ type: string; description: string; time: string }> = [];
  const announcements = [];

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
              {recentActivity.length > 0 ? (
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
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              )}
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
              {announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.map((announcement: any, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-1">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground">{announcement.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No announcements</p>
                </div>
              )}
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
                    <p className="text-center text-muted-foreground py-8">
                      You have 0 pending mentorship requests
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Impact</CardTitle>
                    <CardDescription>Students you've helped with referrals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                      No students placed with your referrals yet
                    </p>
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
                    <p className="text-center text-muted-foreground py-8">
                      No alumni currently available for mentorship
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Opportunities</CardTitle>
                    <CardDescription>Companies with alumni connections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                      No referral opportunities available currently
                    </p>
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
