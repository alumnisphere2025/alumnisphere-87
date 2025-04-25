
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ReferralRequest() {
  const { user } = useAuth();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Request Submitted!",
        description: "Your referral request has been sent to alumni.",
        className: "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-600 text-white",
      });
      setCompany("");
      setPosition("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Request a Referral
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with alumni who can refer you to their companies. Increase your chances of landing that dream job!
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-none shadow-xl bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Submit Your Request</CardTitle>
                <CardDescription>
                  Fill out this form to request a referral from an alumni in your dream company
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="e.g. Google, Microsoft, etc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="position">Position/Role</Label>
                    <Input
                      id="position"
                      placeholder="e.g. Software Engineer, Product Manager, etc."
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      required
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="message">Message to Alumni</Label>
                    <Textarea
                      id="message"
                      placeholder="Introduce yourself and explain why you're interested in this company and role..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="min-h-[150px] resize-none border-blue-200 focus:border-blue-500"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                All referral requests are reviewed within 48 hours. You'll be notified via email when an alumni responds.
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-none shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600 dark:text-blue-400">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/40 dark:bg-black/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Be Specific</h3>
                  <p className="text-sm text-muted-foreground">Mention the exact position and team you're interested in.</p>
                </div>
                
                <div className="bg-white/40 dark:bg-black/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Highlight Relevant Skills</h3>
                  <p className="text-sm text-muted-foreground">Emphasize skills that match the job requirements.</p>
                </div>
                
                <div className="bg-white/40 dark:bg-black/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Be Professional</h3>
                  <p className="text-sm text-muted-foreground">Write a courteous message that shows your professionalism.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
