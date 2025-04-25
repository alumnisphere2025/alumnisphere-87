
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck,
  FileQuestion,
  FileX,
  MessageSquare,
  Search
} from "lucide-react";

export default function Referrals() {
  const { user } = useAuth();
  const isAlumni = user?.role === "alumni";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(isAlumni ? "pending" : "available");

  // Sample referral requests for alumni view
  const referralRequests = [
    // Sample requests would go here
  ];

  // Sample referral opportunities for student view
  const referralOpportunities = [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Software Engineer",
      alumni: {
        name: "Alex Johnson",
        title: "Senior Software Engineer",
      },
      deadline: "2025-05-15",
      description: "Looking for a backend developer with experience in Node.js and databases.",
      requirements: ["Computer Science degree", "1+ year experience", "Node.js", "SQL"],
      status: "open"
    },
    {
      id: "2",
      company: "DataVision Analytics",
      position: "Data Analyst",
      alumni: {
        name: "Morgan Lee",
        title: "Data Scientist",
      },
      deadline: "2025-05-20",
      description: "Seeking recent graduates with strong analytical skills for our data team.",
      requirements: ["Statistics background", "Python", "Data visualization", "SQL"],
      status: "open"
    },
    {
      id: "3",
      company: "Creative Designs",
      position: "UI/UX Designer",
      alumni: {
        name: "Taylor Wilson",
        title: "Design Lead",
      },
      deadline: "2025-05-10",
      description: "Looking for creative designers with a strong portfolio and attention to detail.",
      requirements: ["Design portfolio", "Figma", "Adobe Suite", "User research experience"],
      status: "open"
    }
  ];

  // Student's submitted referral requests
  const myReferralRequests = [
    {
      id: "r1",
      company: "InnovateCorp",
      position: "Product Manager",
      alumni: {
        name: "Jamie Smith",
        title: "Senior Product Manager",
      },
      submittedDate: "2025-03-20",
      status: "pending",
      feedback: null
    },
    {
      id: "r2",
      company: "Finance Solutions",
      position: "Financial Analyst",
      alumni: {
        name: "Jordan Brown",
        title: "Finance Director",
      },
      submittedDate: "2025-03-10",
      status: "approved",
      feedback: "Great fit for the position. I'll be forwarding your resume to our hiring manager."
    },
    {
      id: "r3",
      company: "Global Marketing",
      position: "Digital Marketing Specialist",
      alumni: {
        name: "Casey Garcia",
        title: "Marketing Manager",
      },
      submittedDate: "2025-02-28",
      status: "rejected",
      feedback: "Need more experience with social media campaigns. Consider applying again after gaining more experience."
    }
  ];

  // Form state for referral request
  const [selectedOpportunity, setSelectedOpportunity] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Handler for referral request submission
  const handleReferralRequest = () => {
    if (!selectedOpportunity || !resume) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Referral Request Submitted",
      description: "Your request has been sent to the alumni. They will review it shortly.",
      className: "bg-gradient-to-r from-green-500 to-emerald-500 border-green-600 text-white",
    });
    
    // Reset form
    setSelectedOpportunity("");
    setResume("");
    setCoverLetter("");
    setAdditionalInfo("");
  };

  const handleAlumniAction = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Referral Approved" : "Referral Declined",
      description: action === 'approve' 
        ? "The student has been notified of your approval." 
        : "The student has been notified of your decision.",
    });
  };

  // Filter opportunities based on search query
  const filteredOpportunities = referralOpportunities.filter(opportunity => {
    const searchLower = searchQuery.toLowerCase();
    return (
      opportunity.company.toLowerCase().includes(searchLower) ||
      opportunity.position.toLowerCase().includes(searchLower) ||
      opportunity.description.toLowerCase().includes(searchLower) ||
      opportunity.alumni.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          {isAlumni ? "Manage Referrals" : "Referral Opportunities"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {isAlumni 
            ? "Review and manage student referral requests" 
            : "Connect with alumni for job referrals at their companies"
          }
        </p>
        
        {isAlumni ? (
          /* Alumni View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Statistics Card */}
            <Card>
              <CardHeader>
                <CardTitle>Referral Statistics</CardTitle>
                <CardDescription>Your impact through referrals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Declined</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">0</p>
                    <p className="text-sm text-muted-foreground">Hired</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Company Status</h4>
                  <div className="flex items-center justify-between">
                    <span>Currently hiring</span>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs">Yes</span>
                  </div>
                </div>
                
                <Button className="w-full">
                  Add Referral Opportunity
                </Button>
              </CardContent>
            </Card>
            
            {/* Referral Requests */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Referral Requests</CardTitle>
                  <Tabs 
                    defaultValue="pending" 
                    onValueChange={setActiveTab} 
                    value={activeTab}
                  >
                    <TabsList>
                      <TabsTrigger value="pending">
                        <FileQuestion className="h-4 w-4 mr-1" /> Pending
                      </TabsTrigger>
                      <TabsTrigger value="approved">
                        <FileCheck className="h-4 w-4 mr-1" /> Approved
                      </TabsTrigger>
                      <TabsTrigger value="declined">
                        <FileX className="h-4 w-4 mr-1" /> Declined
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No {activeTab} referral requests at the moment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Student View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Opportunities and My Requests */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="available" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="available" className="flex-1">
                    <Briefcase className="h-4 w-4 mr-1" /> Available Opportunities
                  </TabsTrigger>
                  <TabsTrigger value="myrequests" className="flex-1">
                    <FileCheck className="h-4 w-4 mr-1" /> My Requests
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="available">
                  <div className="relative mb-6">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search opportunities by company, position or description..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredOpportunities.length > 0 ? (
                    <div className="space-y-6">
                      {filteredOpportunities.map(opportunity => (
                        <Card key={opportunity.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{opportunity.position}</CardTitle>
                                <CardDescription className="flex items-center mt-1">
                                  <Building className="h-4 w-4 mr-1" />
                                  {opportunity.company}
                                </CardDescription>
                              </div>
                              <div className="bg-primary/10 text-primary text-xs font-medium rounded-full px-3 py-1">
                                New
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4">{opportunity.description}</p>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {opportunity.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback className="text-xs">
                                    {opportunity.alumni.name.split(" ").map(name => name[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{opportunity.alumni.name}, {opportunity.alumni.title}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full"
                              onClick={() => setSelectedOpportunity(opportunity.id)}
                            >
                              Request Referral
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h2 className="text-xl font-medium">No opportunities found</h2>
                      <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="myrequests">
                  <div className="space-y-6">
                    {myReferralRequests.map(request => (
                      <Card key={request.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{request.position}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Building className="h-4 w-4 mr-1" />
                                {request.company}
                              </CardDescription>
                            </div>
                            <div className={`text-xs font-medium rounded-full px-3 py-1
                              ${request.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                                : request.status === 'approved' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                              }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="flex items-center justify-between text-sm mb-4">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="text-xs">
                                  {request.alumni.name.split(" ").map(name => name[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{request.alumni.name}, {request.alumni.title}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Submitted: {new Date(request.submittedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {request.feedback && (
                            <div className="bg-muted/50 p-4 rounded-lg mt-2">
                              <h4 className="text-sm font-medium mb-1">Feedback:</h4>
                              <p className="text-sm">{request.feedback}</p>
                            </div>
                          )}
                          
                          {request.status === 'approved' && (
                            <div className="flex items-center justify-center mt-4 p-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              <span>Your resume has been forwarded to the hiring team!</span>
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="flex justify-end space-x-2">
                          {request.status === 'pending' && (
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message Alumni
                            </Button>
                          )}
                          {request.status === 'approved' && (
                            <Button size="sm">
                              <Building className="h-4 w-4 mr-1" />
                              View Job Details
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Referral Request Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Request a Referral</CardTitle>
                  <CardDescription>
                    Complete this form to request a referral from an alumni
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="opportunity">Select Opportunity</Label>
                    <Select value={selectedOpportunity} onValueChange={setSelectedOpportunity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an opportunity" />
                      </SelectTrigger>
                      <SelectContent>
                        {referralOpportunities.map(opp => (
                          <SelectItem key={opp.id} value={opp.id}>
                            {opp.position} at {opp.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume Link</Label>
                    <Input
                      id="resume"
                      placeholder="URL to your resume (Google Drive, Dropbox, etc.)"
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Brief cover letter or introduction"
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Why are you a good fit for this role?"
                      rows={3}
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleReferralRequest} className="w-full">
                    Submit Referral Request
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Referral Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <span>Ensure your resume is up-to-date and tailored to the position</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <span>Personalize your request for each opportunity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <span>Highlight relevant skills and experiences</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <span>Follow up politely if you don't hear back within a week</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
