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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-6">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="text-4xl">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground mb-4 capitalize">{user?.role}</p>
              
              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                
                {isAlumniData(userData) ? (
                  <>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{userData.company} - {userData.position}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Graduated {userData.graduationYear}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <UserCircle className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{userData.major}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Graduating {userData.graduationYear}</span>
                    </div>
                  </>
                )}
              </div>
              
              <Button className="mt-6 w-full">Edit Profile Picture</Button>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <Tabs defaultValue="personal">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Edit Your Information</CardTitle>
                  <TabsList>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    {isAlumni ? (
                      <TabsTrigger value="professional">Professional</TabsTrigger>
                    ) : (
                      <TabsTrigger value="academic">Academic</TabsTrigger>
                    )}
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <TabsContent value="personal" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={userData.name} 
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={userData.bio} 
                      onChange={(e) => setUserData({...userData, bio: e.target.value})}
                      rows={4} 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value={isAlumni ? "professional" : "academic"} className="space-y-4">
                  {isAlumniData(userData) ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          value={userData.company} 
                          onChange={(e) => setUserData({...userData, company: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input 
                          id="position" 
                          value={userData.position} 
                          onChange={(e) => setUserData({...userData, position: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input 
                          id="graduationYear" 
                          value={userData.graduationYear} 
                          onChange={(e) => setUserData({...userData, graduationYear: e.target.value})}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Input 
                          id="major" 
                          value={userData.major} 
                          onChange={(e) => setUserData({...userData, major: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                        <Input 
                          id="graduationYear" 
                          value={userData.graduationYear} 
                          onChange={(e) => setUserData({...userData, graduationYear: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm">
                        Notification settings would appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
              
              <CardFooter>
                <Button onClick={handleSave} className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}
