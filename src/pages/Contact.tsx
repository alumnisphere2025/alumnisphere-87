
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b mb-8">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">My Portfolio</Link>
          <div className="flex items-center gap-4">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <Input placeholder="Your name" required />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" required />
              </div>
              <div>
                <label className="block mb-2">Message</label>
                <Textarea 
                  placeholder="Your message..."
                  className="min-h-[150px]"
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Contact;
