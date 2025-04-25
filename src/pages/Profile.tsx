
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Calendar, Building, MapPin, UserCircle } from "lucide-react";

interface BaseUserData {
  name: string;
  email: string;
  bio: string;
  phone: string;
  location: string;
  joinDate: string;
  graduationYear: string;
}

interface AlumniData extends BaseUserData {
  company: string;
  position: string;
  expertise: string[];
  isAvailableForMentoring: boolean;
}

interface StudentData extends BaseUserData {
  major: string;
  interests: string[];
  lookingForReferrals: boolean;
}

type UserDataType = AlumniData | StudentData;

export default function Profile() {
  const { user } = useAuth();
  const isAlumni = user?.role === "alumni";
  
  const [userData, setUserData] = useState<UserDataType>(
    isAlumni ? {
      name: user?.name || "",
      email: user?.email || "",
      bio: "I'm passionate about technology and education.",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "January 2023",
      graduationYear: "2018",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      expertise: ["Web Development", "Mobile Apps", "UX Design"],
      isAvailableForMentoring: true,
    } : {
      name: user?.name || "",
      email: user?.email || "",
      bio: "I'm passionate about technology and education.",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinDate: "January 2023",
      graduationYear: "2025 (Expected)",
      major: "Computer Science",
      interests: ["Artificial Intelligence", "Web Development", "Data Science"],
      lookingForReferrals: true,
    }
  );

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const isAlumniData = (data: UserDataType): data is AlumniData => {
    return 'company' in data && 'position' in data;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground mb-8">Manage your personal information and preferences</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/10 rounded-xl p-6 md:p-8 mb-8 border border-blue-200 dark:border-blue-800 flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user?.name?.split(" ").map(name => name[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground capitalize mb-2">{user?.role}</p>
              
              {isAlumniData(userData) ? (
                <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  {userData.position} at {userData.company}
                </div>
              ) : (
                <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                  <UserCircle className="h-3.5 w-3.5 mr-1" />
                  {(userData as StudentData).major} Student
                </div>
              )}
              
              <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Class of {userData.graduationYear}</span>
                </div>
              </div>
            </div>
            
            <Button className="md:self-start">Edit Profile</Button>
          </div>
          
          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-3 md:w-[400px] mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About You</CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userData.name} 
                        onChange={(e) => setUserData({...userData, name: e.target.value})} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={userData.bio}
                        onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={userData.location}
                        onChange={(e) => setUserData({...userData, location: e.target.value})}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                {isAlumniData(userData) ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Information</CardTitle>
                      <CardDescription>
                        Update your career details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          value={userData.company}
                          onChange={(e) => setUserData({...userData as AlumniData, company: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input 
                          id="position" 
                          value={userData.position}
                          onChange={(e) => setUserData({...userData as AlumniData, position: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expertise">Areas of Expertise</Label>
                        <Input 
                          id="expertise" 
                          value={userData.expertise.join(", ")}
                          onChange={(e) => setUserData({
                            ...userData as AlumniData, 
                            expertise: e.target.value.split(",").map(item => item.trim())
                          })}
                        />
                        <p className="text-sm text-muted-foreground">
                          Separate each skill with a comma
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="mentoring"
                          checked={(userData as AlumniData).isAvailableForMentoring}
                          onChange={(e) => setUserData({
                            ...userData as AlumniData, 
                            isAvailableForMentoring: e.target.checked
                          })}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="mentoring">Available for mentoring</Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Information</CardTitle>
                      <CardDescription>
                        Update your study details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Input 
                          id="major" 
                          value={(userData as StudentData).major}
                          onChange={(e) => setUserData({...userData as StudentData, major: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gradYear">Expected Graduation Year</Label>
                        <Input 
                          id="gradYear" 
                          value={userData.graduationYear}
                          onChange={(e) => setUserData({...userData, graduationYear: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="interests">Areas of Interest</Label>
                        <Input 
                          id="interests" 
                          value={(userData as StudentData).interests.join(", ")}
                          onChange={(e) => setUserData({
                            ...userData as StudentData, 
                            interests: e.target.value.split(",").map(item => item.trim())
                          })}
                        />
                        <p className="text-sm text-muted-foreground">
                          Separate each interest with a comma
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="referrals"
                          checked={(userData as StudentData).lookingForReferrals}
                          onChange={(e) => setUserData({
                            ...userData as StudentData, 
                            lookingForReferrals: e.target.checked
                          })}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="referrals">Looking for job referrals</Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_notif">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about important updates
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="email_notif"
                        defaultChecked
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mentorship_notif">Mentorship Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about mentorship opportunities
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="mentorship_notif"
                        defaultChecked
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="referral_notif">Referral Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about referral requests
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="referral_notif"
                        defaultChecked
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="event_notif">Event Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about upcoming events
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="event_notif"
                        defaultChecked
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium">Privacy</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile_visibility">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="profile_visibility"
                        defaultChecked
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="contact_info">Share Contact Information</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your contact information
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="contact_info"
                        defaultChecked
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input type="password" id="current_password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input type="password" id="new_password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input type="password" id="confirm_password" />
                  </div>
                  
                  <div className="pt-4 border-t space-y-4">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="2fa"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Update Security Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
