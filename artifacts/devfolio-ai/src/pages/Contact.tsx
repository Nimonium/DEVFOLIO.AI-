import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function Contact() {
  const { toast } = useToast();
  const contactMutation = useSubmitContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    contactMutation.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Message sent",
            description: "We've received your message and will get back to you soon.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong. Please try again later.",
          });
        }
      }
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's talk.</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about DevFolio AI? Found a bug? Or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-white/5 bg-card">
                <h3 className="font-bold text-white mb-2">Technical Support</h3>
                <p className="text-muted-foreground text-sm">Our engineering team is ready to help you with any scanning or generation issues.</p>
              </div>
              <div className="p-6 rounded-xl border border-white/5 bg-card">
                <h3 className="font-bold text-white mb-2">Enterprise Solutions</h3>
                <p className="text-muted-foreground text-sm">Want to use DevFolio for your bootcamp or coding school? Let's discuss bulk licensing.</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 blur-[80px] pointer-events-none" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" className="bg-background/50 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Subject (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" className="bg-background/50 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us what's on your mind..." 
                          className="min-h-[150px] bg-background/50 border-white/10 focus-visible:ring-primary resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  {contactMutation.isPending ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Send Message</>
                  )}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
}
