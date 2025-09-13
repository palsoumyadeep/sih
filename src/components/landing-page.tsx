import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageType } from '../App';
import exampleImage from 'figma:asset/7acefe40a2d61f4c1b35614c20cc46f2d641e704.png';

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: "50,000+", label: "Students Registered" },
    { number: "2,500+", label: "Companies Partnered" },
    { number: "15,000+", label: "Successful Placements" },
    { number: "500+", label: "Cities Covered" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  PM Internship Scheme
                </h1>
                <p className="text-xs text-gray-600">Empowering India's Future</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-orange-600 font-medium">भारत सरकार</p>
                <p className="text-xs text-gray-600">Government of India</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-white to-green-100/30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff9933' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full text-white text-sm font-medium shadow-lg">
                  🇮🇳 A Digital India Initiative
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">
                    Transform Your
                  </span>
                  <br />
                  <span className="text-gray-800">Future Today</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Join India's largest internship program connecting talented students with leading companies. 
                  Build skills, gain experience, and shape the future of Digital India.
                </p>
              </div>

              {/* Animated Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent transition-all duration-500">
                    {stats[currentStat].number}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stats[currentStat].label}
                  </div>
                </div>
                <div className="flex justify-center mt-3 space-x-1">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStat ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => onNavigate('student')}
                >
                  🎓 Start Your Journey
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
                  onClick={() => onNavigate('company')}
                >
                  🏢 Partner With Us
                </Button>
              </div>
            </div>

            {/* Right Content - PM Modi Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={exampleImage}
                    alt="Prime Minister Narendra Modi"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl p-6 text-white shadow-xl z-20">
                  <div className="text-center">
                    <div className="text-2xl font-bold">Vision 2030</div>
                    <div className="text-sm opacity-90">Skilled India</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 -left-10 w-20 h-20 bg-orange-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute bottom-20 -right-5 w-16 h-16 bg-green-200 rounded-full opacity-50 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Cards */}
      <section className="py-20 bg-gradient-to-r from-white via-orange-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-4">
              Choose Your Portal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access dedicated portals designed for students, companies, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Student Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2" onClick={() => onNavigate('student')}>
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Student Portal</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Register, build your profile, explore opportunities, and get matched with perfect internships through our AI system
                  </p>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Smart Profile Builder</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>AI-Powered Matching</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 group-hover:shadow-lg transition-all duration-300">
                    Access Student Portal →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-green-200 transform hover:-translate-y-2" onClick={() => onNavigate('company')}>
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Company Portal</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Partner with us to hire talented interns, manage applications, and build your future workforce
                  </p>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Easy Job Posting</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Candidate Management</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Analytics Dashboard</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white group-hover:shadow-lg transition-all duration-300">
                    Company Registration →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-orange-200 transform hover:-translate-y-2" onClick={() => onNavigate('admin')}>
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">⚙️</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Admin Portal</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Comprehensive dashboard with analytics, smart allocation engine, and complete system management
                  </p>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>Smart Allocation AI</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>Real-time Analytics</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>System Management</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 group-hover:shadow-lg transition-all duration-300">
                    Admin Access →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PM Modi Message Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full text-white text-sm font-medium">
                  🎯 Vision for India
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Message from Hon'ble Prime Minister</h3>
                <blockquote className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-orange-500 pl-6">
                  "This internship scheme is a cornerstone of our vision to build a skilled and employable workforce 
                  that will drive India's growth in the 21st century. Our youth are our greatest asset, 
                  and through this initiative, we aim to provide them with practical experience and 
                  industry exposure that will make them job-ready and globally competitive."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-green-500 rounded"></div>
                  <div>
                    <p className="font-bold text-orange-600">- Narendra Modi</p>
                    <p className="text-sm text-gray-600">Prime Minister of India</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-green-200 rounded-2xl transform rotate-3"></div>
                <img
                  src={exampleImage}
                  alt="Prime Minister Narendra Modi"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-4">
              Portal Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology and AI-powered solutions for seamless internship management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📝",
                title: "Easy Registration",
                description: "Simple, user-friendly registration process for students and companies",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: "🤖",
                title: "Smart Allocation",
                description: "AI-powered matching based on skills, preferences, and requirements",
                color: "from-green-500 to-green-600"
              },
              {
                icon: "💬",
                title: "24/7 Chatbot Support",
                description: "Instant help, resume scoring, and doubt resolution",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                description: "Comprehensive insights and performance tracking",
                color: "from-purple-500 to-purple-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-bold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">Real impact, real careers, real futures</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                college: "IIT Delhi",
                company: "Tech Giants Inc.",
                image: "https://images.unsplash.com/photo-1585313428215-d4ffd7231287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXZlcnNlJTIwaW5kaWFuJTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NTc3MzQyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                story: "From a 6-month internship to a full-time software engineer role. The PM scheme changed my life!"
              },
              {
                name: "Arjun Patel",
                college: "NIT Trichy",
                company: "DataFlow Solutions",
                image: "https://images.unsplash.com/photo-1585313428215-d4ffd7231287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXZlcnNlJTIwaW5kaWFuJTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NTc3MzQyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                story: "The smart allocation system matched me perfectly with a data science role. Couldn't be happier!"
              },
              {
                name: "Sneha Kumar",
                college: "BITS Pilani",
                company: "Creative Marketing Hub",
                image: "https://images.unsplash.com/photo-1585313428215-d4ffd7231287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkaXZlcnNlJTIwaW5kaWFuJTIwc3R1ZGVudHMlMjBncm91cHxlbnwxfHx8fDE3NTc3MzQyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                story: "The portal's resume scoring helped me improve my profile and land my dream marketing internship!"
              }
            ].map((story, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h4 className="font-bold text-gray-800">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.college}</p>
                    <p className="text-sm font-medium text-green-600">{story.company}</p>
                  </div>
                  <blockquote className="text-gray-700 text-sm italic text-center">
                    "{story.story}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">PM</span>
                </div>
                <span className="font-bold text-lg">PM Internship Scheme</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering India's youth through skill development and industry exposure.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Scheme</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Eligibility</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Technical Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Report Issue</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>📧 support@pminternship.gov.in</li>
                <li>📞 1800-123-4567 (Toll-free)</li>
                <li>💬 Live Chat Support</li>
                <li>🕒 Mon-Fri, 9 AM - 6 PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 Government of India. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-2">PM Internship Scheme Portal - A Digital India Initiative</p>
          </div>
        </div>
      </footer>
    </div>
  );
}