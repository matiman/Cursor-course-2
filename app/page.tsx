"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Star, Zap, Users, BookOpen, Award, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Transform Your Learning Journey</h1>
            <p className="text-xl mb-8">Access premium courses and resources to accelerate your growth. Join thousands of successful learners today.</p>
            <div className="flex gap-4 justify-center">
              <Link href="/store">
                <Button size="lg" variant="secondary">Explore Courses</Button>
              </Link>
              <Link href="/feature-request">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">Request Features</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Premium Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Access high-quality courses crafted by industry experts to help you succeed.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Verified Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Learn with confidence through our verified and tested curriculum.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Expert Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get guidance from experienced instructors and join a community of learners.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop"
                    alt="Web Development"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle>Web Development Masterclass</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Master modern web development with hands-on projects and real-world applications.</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$99.99</span>
                  <Button>Learn More</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=500&fit=crop"
                    alt="Data Science"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle>Data Science Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Learn data analysis, visualization, and machine learning from scratch.</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$129.99</span>
                  <Button>Learn More</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&h=500&fit=crop"
                    alt="Mobile Development"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle>Mobile App Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build cross-platform mobile applications using modern frameworks.</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$89.99</span>
                  <Button>Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground mb-4">"The courses are well-structured and the instructors are incredibly knowledgeable. I've learned more in 3 months than I did in a year of self-study."</p>
                <p className="font-semibold">- Sarah Johnson, Web Developer</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-muted-foreground mb-4">"The practical projects and hands-on experience have been invaluable. I landed my dream job thanks to the skills I learned here."</p>
                <p className="font-semibold">- Michael Chen, Software Engineer</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">Subscribe to our newsletter for the latest courses, learning tips, and exclusive offers.</p>
            <div className="flex gap-4">
              <Input type="email" placeholder="Enter your email" className="max-w-sm" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of successful learners and transform your career today.</p>
          <Link href="/store">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
