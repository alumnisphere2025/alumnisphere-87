
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Bell, Key, Mail, Moon, Palette, Shield, Sun, User } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(true);
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your account preferences</p>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="account">
            <div className="flex overflow-x-auto pb-2 mb-6">
              <TabsList>
                <TabsTrigger value="account" className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> Account
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center">
                  <Palette className="mr-2 h-4 w-4" /> Appearance
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" /> Security
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="account">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue={user?.name?.toLowerCase().replace(/\s+/g, ".")} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription>
                      Permanently delete your account and all associated data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      This action cannot be undone. Once you delete your account, all your data will be permanently removed.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how AlumniSphere looks for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
                    <div className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center">
                        {theme === "dark" ? 
                          <Moon className="h-5 w-5 mr-2" /> : 
                          <Sun className="h-5 w-5 mr-2" />
                        }
                        <div>
                          <p className="font-medium">{theme === "dark" ? "Dark" : "Light"} Theme</p>
                          <p className="text-sm text-muted-foreground">
                            {theme === "dark" ? 
                              "Easier on the eyes at night" : 
                              "Better visibility during the day"
                            }
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={toggleTheme}>
                        {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <Label className="text-base font-medium">Accent Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {["blue", "teal", "indigo", "purple", "pink"].map((color) => (
                        <div
                          key={color}
                          className={`h-10 rounded-md cursor-pointer transition-all hover:scale-105 ${
                            color === "blue" ? "bg-blue-500" :
                            color === "teal" ? "bg-teal-500" :
                            color === "indigo" ? "bg-indigo-500" :
                            color === "purple" ? "bg-purple-500" :
                            "bg-pink-500"
                          } ${color === "blue" ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Select your preferred accent color (currently not functional)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email_all">All Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive all notifications via email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="email_all"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between opacity-50">
                      <div>
                        <Label htmlFor="email_digest">Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a weekly summary email
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="email_digest"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push_all">Browser Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications in browser
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id="push_all"
                        checked={browserNotifications}
                        onChange={() => setBrowserNotifications(!browserNotifications)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif_announcements">Announcements</Label>
                        <input
                          type="checkbox"
                          id="notif_announcements"
                          defaultChecked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif_mentorship">Mentorship Requests</Label>
                        <input
                          type="checkbox"
                          id="notif_mentorship"
                          defaultChecked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif_referrals">Referral Requests</Label>
                        <input
                          type="checkbox"
                          id="notif_referrals"
                          defaultChecked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notif_events">Events</Label>
                        <input
                          type="checkbox"
                          id="notif_events"
                          defaultChecked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Update your password
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
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Update Password</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded">
                          <Key className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Add an additional layer of security to your account with two-factor authentication
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded border p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome on Windows • IP {Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}
                          </p>
                        </div>
                        <div className="text-xs py-1 px-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">
                          Active
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">Sign Out from All Sessions</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
