import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Pizza, Users, Clock, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1646314274609-b4064cdd02d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="People sharing food"
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
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-md">
              Join Our Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Together We Can End Hunger
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Connect with local communities to share surplus food and make a real difference in people&apos;s lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-300 hover:scale-105"
                >
                  Donate Food
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                className="transition-transform duration-300 hover:scale-105"
              >
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
              { icon: Pizza, stat: '10K+', label: 'Meals Shared' },
              { icon: Users, stat: '500+', label: 'Active Donors' },
              { icon: Heart, stat: '1K+', label: 'Lives Impacted' },
              { icon: MapPin, stat: '20+', label: 'Cities Covered' },
            ].map(({ icon: Icon, stat, label }, i) => (
              <Card
                key={i}
                className="bg-card rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="space-y-2 text-center p-6">
                  <Icon className="w-8 h-8 text-primary dark:text-white mx-auto" />
                  <h3 className="text-4xl font-bold text-primary dark:text-white">{stat}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400">
              Making food donation simple, efficient, and impactful
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              {
                title: 'Register & List',
                desc: 'Create your account and list available food items for donation',
                icon: <Users className="w-6 h-6 text-white dark:text-primary" />,
              },
              {
                title: 'Connect & Schedule',
                desc: 'Get matched with local recipients and schedule pickup/delivery',
                icon: <Clock className="w-6 h-6 text-white dark:text-primary" />,
              },
              {
                title: 'Share & Track',
                desc: 'Complete the donation and track your impact in the community',
                icon: <Heart className="w-6 h-6 text-white dark:text-primary" />,
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-card dark:bg-gray-800 rounded-lg p-8 h-full border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  {/* Icon Container */}
                  <div className="mb-4 p-3 rounded-full w-fit shadow bg-primary dark:bg-white">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-400">{step.desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight
                    className="hidden md:block absolute top-1/2 -right-10 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-primary dark:text-white rounded-full w-8 h-8 p-1 shadow-lg"
                  />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Needs</h2>
            <p className="text-lg text-muted-foreground">
              Help us support these ongoing community initiatives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Local Food Banks',
                desc: 'Support our local food banks in providing nutritious meals',
                image: 'https://images.unsplash.com/photo-1615897570582-285ffe259530?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              },
              {
                title: 'School Meal Program',
                desc: 'Help provide healthy meals to students in need',
                image: 'https://images.unsplash.com/photo-1556543365-e08680c86612?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              },
              {
                title: 'Emergency Relief',
                desc: 'Support communities affected by recent emergencies',
                image: 'https://images.unsplash.com/photo-1599700403969-f77b3aa74837?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              },
            ].map((cause, i) => (
              <Card
                key={i}
                className="overflow-hidden bg-card rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={cause.image}
                    alt={cause.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{cause.title}</h3>
                  <p className="text-muted-foreground mb-4">{cause.desc}</p>
                  <a href='/foodmap'><Button
                    variant="secondary"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform duration-300 hover:scale-105"
                  >
                    Learn More
                  </Button></a>
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
                quote:
                  "This platform made it so easy to contribute to my community. I'm glad my surplus food is helping others.",
                author: 'Sarah J.',
                role: 'Restaurant Owner',
              },
              {
                quote:
                  "The impact we've seen through this program has been incredible. It's bringing our community together.",
                author: 'Michael R.',
                role: 'Food Bank Manager',
              },
              {
                quote:
                  "A wonderful initiative that's making a real difference. The process is simple and effective.",
                author: 'Lisa M.',
                role: 'Regular Donor',
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="bg-card rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="space-y-4 p-6">
                  <p className="text-lg italic text-gray-700 dark:text-gray-300">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90 drop-shadow-sm">
              Join our community of food donors and help create a hunger-free world
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href='/dashboard'><Button
                size="lg"
                variant="secondary"
                className="transition-transform duration-300 hover:scale-105"
              >
                Start Donating
              </Button></a>
              <a href='/contact'><Button
                size="lg"
                variant="outline"
                className="!bg-primary hover:!bg-primary/90 !text-primary-foreground transition-transform duration-300 hover:scale-105"
              >
                Learn More
              </Button></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
