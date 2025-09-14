import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from "../api";
import { PageType } from '../App';

interface CompanyPortalProps {
  onNavigate: (page: PageType) => void;
}

export function CompanyPortal({ onNavigate }: CompanyPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('login');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api.company.login(data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api.company.register(data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateInternship = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api.company.createInternship(data);
      alert('Internship posted successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Company Benefits */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white text-sm font-medium">
                🏢 Company Portal
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Build Your
                </span>
                <br />
                <span className="text-gray-800">Dream Team</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with India's brightest talents. Our platform helps you find, assess, and hire 
                the perfect interns for your organization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-green-600">2,500+</div>
                <div className="text-sm text-gray-600">Partner Companies</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-blue-600">50,000+</div>
                <div className="text-sm text-gray-600">Student Pool</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center">
                <div className="text-2xl font-bold text-purple-600">87%</div>
                <div className="text-sm text-gray-600">Match Success</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-3">Why Choose Our Platform?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>AI-powered candidate matching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Streamlined hiring process</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Government support & incentives</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Login/Register Form */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Partner With Us</CardTitle>
                <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700">
                  ← Back
                </Button>
              </div>
              <p className="text-gray-600">Access your company dashboard</p>
            </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Company Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Official Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                  <div>
                    <Label htmlFor="website">Company Website</Label>
                    <Input id="website" name="website" type="url" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Register Company
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Company!</span>
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="internships">My Internships</TabsTrigger>
            <TabsTrigger value="create">Create Internship</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Internships</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      💼
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Applications</p>
                      <p className="text-3xl font-bold">48</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      📄
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Hired Interns</p>
                      <p className="text-3xl font-bold">12</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      👥
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New application received</p>
                      <p className="text-sm text-gray-600">Software Development Intern - John Doe</p>
                    </div>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Internship posted successfully</p>
                      <p className="text-sm text-gray-600">Data Science Intern position</p>
                    </div>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="internships" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Posted Internships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Software Development Intern</h3>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Full-stack development role</p>
                    <p className="text-sm text-gray-500 mb-3">Duration: 6 months | Stipend: ₹15,000/month</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Applications: 25 | Slots: 2</p>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View Applications</Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Data Science Intern</h3>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Machine learning and analytics</p>
                    <p className="text-sm text-gray-500 mb-3">Duration: 4 months | Stipend: ₹12,000/month</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Applications: 18 | Slots: 1</p>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View Applications</Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Digital Marketing Intern</h3>
                      <Badge variant="secondary">Closed</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">SEO and content marketing</p>
                    <p className="text-sm text-gray-500 mb-3">Duration: 3 months | Stipend: ₹10,000/month</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Applications: 5 | Selected: 1</p>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Internship</CardTitle>
                <p className="text-gray-600">Post a new internship opportunity for students</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateInternship} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position">Position Title</Label>
                      <Input id="position" name="position" required />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" name="description" rows={4} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration (months)</Label>
                      <Input id="duration" name="duration" type="number" min="1" max="12" required />
                    </div>
                    <div>
                      <Label htmlFor="stipend">Monthly Stipend (₹)</Label>
                      <Input id="stipend" name="stipend" type="number" min="0" required />
                    </div>
                    <div>
                      <Label htmlFor="slots">Number of Slots</Label>
                      <Input id="slots" name="slots" type="number" min="1" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input id="skills" name="skills" placeholder="e.g., Python, React, Communication Skills" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" required />
                    </div>
                    <div>
                      <Label htmlFor="workMode">Work Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Minimum Requirements</Label>
                    <Textarea id="requirements" name="requirements" rows={3} placeholder="Education, experience, etc." />
                  </div>

                  <Button type="submit" className="w-full">
                    Post Internship
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Internship Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-gray-600">Applied for: Software Development Intern</p>
                        <p className="text-sm text-gray-500">IIT Delhi, Computer Science</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">Python</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">View Profile</Button>
                      <Button size="sm" variant="outline">Download Resume</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">Jane Smith</h3>
                        <p className="text-gray-600">Applied for: Data Science Intern</p>
                        <p className="text-sm text-gray-500">NIT Trichy, Data Science</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Machine Learning</Badge>
                      <Badge variant="outline">SQL</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">View Profile</Button>
                      <Button size="sm" variant="outline">Download Resume</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">Raj Patel</h3>
                        <p className="text-gray-600">Applied for: Digital Marketing Intern</p>
                        <p className="text-sm text-gray-500">Delhi University, Commerce</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Accepted</Badge>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">SEO</Badge>
                      <Badge variant="outline">Content Writing</Badge>
                      <Badge variant="outline">Social Media</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">View Profile</Button>
                      <Button size="sm" variant="outline">Contact</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}