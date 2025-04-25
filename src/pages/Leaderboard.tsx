
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Award, Trophy, Users } from "lucide-react";
import { useState } from "react";

export default function Leaderboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("all-time");
  const [category, setCategory] = useState("overall");

  // Sample leaderboard data
  const leaderboardData = [
    {
      id: "1",
      name: "Alex Johnson",
      points: 850,
      mentorships: 12,
      referrals: 8,
      eventsAttended: 5,
      rank: 1,
      trend: "stable"
    },
    {
      id: "2",
      name: "Morgan Lee",
      points: 720,
      mentorships: 8,
      referrals: 9,
      eventsAttended: 4,
      rank: 2,
      trend: "up"
    },
    {
      id: "3",
      name: "Taylor Wilson",
      points: 685,
      mentorships: 10,
      referrals: 5,
      eventsAttended: 6,
      rank: 3,
      trend: "up"
    },
    {
      id: "4",
      name: "Jamie Smith",
      points: 650,
      mentorships: 7,
      referrals: 7,
      eventsAttended: 3,
      rank: 4,
      trend: "down"
    },
    {
      id: "5",
      name: "Casey Garcia",
      points: 590,
      mentorships: 9,
      referrals: 4,
      eventsAttended: 2,
      rank: 5,
      trend: "down"
    },
    {
      id: "6",
      name: "Jordan Brown",
      points: 540,
      mentorships: 6,
      referrals: 6,
      eventsAttended: 1,
      rank: 6,
      trend: "stable"
    },
    {
      id: "7",
      name: "Drew Parker",
      points: 490,
      mentorships: 5,
      referrals: 5,
      eventsAttended: 3,
      rank: 7,
      trend: "up"
    },
    {
      id: "8",
      name: "Riley Martinez",
      points: 450,
      mentorships: 4,
      referrals: 6,
      eventsAttended: 2,
      rank: 8,
      trend: "stable"
    },
    {
      id: "9",
      name: "Avery Wilson",
      points: 410,
      mentorships: 7,
      referrals: 2,
      eventsAttended: 1,
      rank: 9,
      trend: "down"
    },
    {
      id: "10",
      name: "Cameron Taylor",
      points: 380,
      mentorships: 3,
      referrals: 4,
      eventsAttended: 4,
      rank: 10,
      trend: "up"
    }
  ];

  // Current user's rank
  const userRank = user?.role === "alumni" 
    ? {
        rank: 42,
        points: 180,
        mentorships: 2,
        referrals: 1,
        eventsAttended: 1,
        trend: "up"
      }
    : null;

  // Determine what metric to show based on category
  const getMetric = (entry: any) => {
    switch(category) {
      case "mentorships":
        return entry.mentorships;
      case "referrals":
        return entry.referrals;
      case "events":
        return entry.eventsAttended;
      default:
        return entry.points;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Alumni Leaderboard</h1>
        <p className="text-muted-foreground mb-8">Recognizing alumni who make the biggest impact</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <Trophy className="h-12 w-12 text-blue-500 mr-4" />
                  <div>
                    <h2 className="text-xl font-bold">Current Champion</h2>
                    <p className="text-blue-600 dark:text-blue-400">{leaderboardData[0].name} with {leaderboardData[0].points} impact points</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overall">Overall Impact</SelectItem>
                      <SelectItem value="mentorships">Mentorships</SelectItem>
                      <SelectItem value="referrals">Referrals</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Alumni</CardTitle>
                <CardDescription>
                  {category === "overall" ? "By total impact points" :
                   category === "mentorships" ? "By mentorships provided" :
                   category === "referrals" ? "By referrals made" : 
                   "By events attended"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 w-16">Rank</th>
                        <th className="pb-3">Alumni</th>
                        <th className="pb-3 text-right">
                          {category === "overall" ? "Points" :
                           category === "mentorships" ? "Mentorships" :
                           category === "referrals" ? "Referrals" : 
                           "Events"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((entry) => (
                        <tr key={entry.id} className="border-b last:border-0">
                          <td className="py-3">
                            <div className="flex items-center">
                              {entry.rank <= 3 ? (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                  ${entry.rank === 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                                    entry.rank === 2 ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                                    'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'}`}>
                                  <Trophy className="h-4 w-4" />
                                </div>
                              ) : (
                                <span className="text-muted-foreground ml-2">{entry.rank}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {entry.name.split(" ").map(name => name[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{entry.name}</span>
                              <span className="ml-2">
                                {entry.trend === "up" ? "↑" : entry.trend === "down" ? "↓" : "→"}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-right font-medium">
                            {getMetric(entry)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Earning Points</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 50 points per mentorship session</li>
                    <li>• 100 points per successful referral</li>
                    <li>• 30 points per event attendance</li>
                    <li>• 20 points per forum answer</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Rankings</h3>
                  <p className="text-sm">
                    Rankings are updated weekly. Stay active to maintain or improve your position!
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Rewards</h3>
                  <p className="text-sm">
                    Top alumni are featured on the university website and receive special recognition at annual events.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {userRank && user?.role === "alumni" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your Ranking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">Rank #{userRank.rank}</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">{userRank.points} pts</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-medium">{userRank.mentorships}</p>
                      <p className="text-xs text-muted-foreground">Mentorships</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{userRank.referrals}</p>
                      <p className="text-xs text-muted-foreground">Referrals</p>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{userRank.eventsAttended}</p>
                      <p className="text-xs text-muted-foreground">Events</p>
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
