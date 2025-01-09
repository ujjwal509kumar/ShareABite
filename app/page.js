import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Utensils, Users, Clock, MapPin, ArrowRight } from "lucide-react";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - No changes needed as it uses overlay */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1646314274609-b4064cdd02d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Picture of distributing food"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Join Our Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Together We Can End Hunger
            </h1>
            <p className="text-xl text-white/90">
              Connect with local communities to share surplus food and make a real difference in people&apos;s lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Donate Food
              </Button>
              <Button size="lg" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Utensils, stat: "10K+", label: "Meals Shared" },
              { icon: Users, stat: "500+", label: "Active Donors" },
              { icon: Heart, stat: "1K+", label: "Lives Impacted" },
              { icon: MapPin, stat: "20+", label: "Cities Covered" }
            ].map(({ icon: Icon, stat, label }, i) => (
              <Card key={i} className="bg-card">
                <CardContent className="space-y-2 text-center p-6">
                  <Icon className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="text-4xl font-bold text-primary">{stat}</h3>
                  <p className="text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Making food donation simple, efficient, and impactful
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Register & List",
                desc: "Create your account and list available food items for donation",
                icon: <Users className="w-6 h-6 text-primary-foreground" />
              },
              {
                title: "Connect & Schedule",
                desc: "Get matched with local recipients and schedule pickup/delivery",
                icon: <Clock className="w-6 h-6 text-primary-foreground" />
              },
              {
                title: "Share & Track",
                desc: "Complete the donation and track your impact in the community",
                icon: <Heart className="w-6 h-6 text-primary-foreground" />
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-card rounded-lg p-8 h-full border">
                  <div className="mb-4 p-3 bg-primary rounded-full w-fit">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-6 h-6 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Current Needs
            </h2>
            <p className="text-lg text-muted-foreground">
              Help us support these ongoing community initiatives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Food Banks",
                desc: "Support our local food banks in providing nutritious meals",
              },
              {
                title: "School Meal Program",
                desc: "Help provide healthy meals to students in need",
              },
              {
                title: "Emergency Relief",
                desc: "Support communities affected by recent emergencies",
              }
            ].map((cause, i) => (
              <Card key={i} className="overflow-hidden bg-card">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{cause.title}</h3>
                  <p className="text-muted-foreground mb-4">{cause.desc}</p>
                  <Button variant="secondary" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform made it so easy to contribute to my community. I'm glad my surplus food is helping others.",
                author: "Sarah J.",
                role: "Restaurant Owner"
              },
              {
                quote: "The impact we've seen through this program has been incredible. It's bringing our community together.",
                author: "Michael R.",
                role: "Food Bank Manager"
              },
              {
                quote: "A wonderful initiative that's making a real difference. The process is simple and effective.",
                author: "Lisa M.",
                role: "Regular Donor"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-card">
                <CardContent className="space-y-4 p-6">
                  <p className="text-lg italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-primary" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of food donors and help create a hunger-free world
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Start Donating
              </Button>
              <Button size="lg" variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}