import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-36 bg-background text-foreground">
                <div className="container mx-auto px-6 text-center">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-foreground animate-bounce" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Get in Touch</h1>
                    <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                        Have questions about food donation? We’re here to help you make a difference in your community.
                    </p>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-12">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Mail, title: "Email Us", details: "ujjwal509kumar@gmail.com", subtext: "We’ll respond within 24 hours", image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { icon: Phone, title: "Call Us", details: "+91 123456789", subtext: "Mon-Fri, 9am-6pm", image: "https://images.unsplash.com/uploads/1413222992504f1b734a6/1928e537?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { icon: MapPin, title: "Visit Us", details: "Mailasandra, Bengaluru", subtext: "Stop by anytime", image: "https://images.unsplash.com/photo-1557766131-dca3a8acae87?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                        { icon: Clock, title: "Hours", details: "Monday - Friday", subtext: "9:00 AM - 6:00 PM", image: "https://images.unsplash.com/photo-1575265114485-3f3fa47ef052?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                    ].map((item, i) => (
                        <Card key={i} className="bg-card border border-border shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                            <CardContent className="p-6 flex flex-col items-center">
                                <div className="w-full h-32 relative mb-4">
                                    <Image src={item.image} alt={`${item.title} image`} fill style={{ objectFit: "cover" }} className="rounded-md" />
                                </div>
                                <div className="w-14 h-14 bg-muted/10 rounded-full flex items-center justify-center mb-4">
                                    <item.icon className="w-8 h-8 text-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground font-medium">{item.details}</p>
                                <p className="text-sm text-muted-foreground">{item.subtext}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Contact Form and FAQ */}
            <section className="py-16">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="bg-card border border-border shadow-md">
                        <CardContent className="p-8">
                            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input label="First Name" placeholder="John" className="rounded-lg" />
                                    <Input label="Last Name" placeholder="Doe" className="rounded-lg" />
                                </div>
                                <Input label="Email" type="email" placeholder="john@example.com" className="rounded-lg" />
                                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" className="rounded-lg" />
                                <Textarea label="Message" placeholder="Tell us how we can help..." className="rounded-lg" />
                                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* FAQ Accordion */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible>
                            {[
                                {
                                    q: "What types of food can I donate?",
                                    a: "We accept non-perishable food items, fresh produce, prepared meals (safety-compliant), and packaged goods within expiration dates. All donations must follow local food safety standards.",
                                },
                                {
                                    q: "How is the food distributed?",
                                    a: "Local food banks and community organizations handle distribution, supported by trained staff, safety inspections, and real-time tracking.",
                                },
                                {
                                    q: "Is my donation tax-deductible?",
                                    a: "Yes. We provide detailed receipts, annual contribution statements, and IRS-compliant documentation.",
                                },
                                {
                                    q: "Can I volunteer?",
                                    a: "Absolutely! Opportunities include food collection, distribution, administrative roles, and special event support.",
                                },
                                {
                                    q: "What safety measures do you follow?",
                                    a: "Temperature-controlled storage, regular inspections, staff training, and quality control ensure food safety.",
                                },
                            ].map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-none">
                                    <AccordionTrigger className="text-lg font-semibold hover:text-primary flex justify-between items-center p-4">
                                        <span>{faq.q}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm px-4 py-2">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-muted/10">
                <div className="container mx-auto">
                    <Card className="overflow-hidden rounded-lg border border-border">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.439720673665!2d77.48497569221308!3d12.916722798295615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f1e2d2b1ff3%3A0x2e0fa12643b34936!2sMailasandra%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1736700290288!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Card>
                </div>
            </section>
        </div>
    );
}
