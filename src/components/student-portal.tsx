import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { api } from "../api";
import { PageType } from '../App';

interface StudentPortalProps {
  onNavigate: (page: PageType) => void;
}

export function StudentPortal({ onNavigate }: StudentPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [currentTab, setCurrentTab] = useState('login');
  const [hasInternship, setHasInternship] = useState(false);
  const [internships, setInternships] = useState<any[]>([]);
  const [myInternship, setMyInternship] = useState<any | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const student = await api.student.login(data);
      setIsLoggedIn(true);
      setHasProfile(!!student.college);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const student = await api.student.register(data);
      setIsLoggedIn(true);
      setHasProfile(!!student.college);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api.student.profile(data);
      setHasProfile(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await api.student.uploadResume(formData);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn && hasProfile) {
      (async () => {
        try {
          const list = await api.internships.list();
          setInternships(list);
          const mine = await api.student.myInternship();
          setMyInternship(mine);
          setHasInternship(!!mine);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [isLoggedIn, hasProfile]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Welcome Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-medium">
                🎓 Student Portal
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Journey
                </span>
                <br />
                <span className="text-gray-800">Starts Here</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Join thousands of students who have transformed their careers through our internship program. 
                Get matched with top companies using our AI-powered system.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">15,000+</div>
                <div className="text-sm text-gray-600">Students Placed</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login/Register Form */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</CardTitle>
                <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700">
                  ← Back
                </Button>
              </div>
              <p className="text-gray-600">Access your student dashboard</p>
            </CardHeader>
            <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                      <Input 
                        id="email" name="email" 
                        type="email" 
                        required 
                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="student@university.edu"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-gray-700">Password</Label>
                      <Input 
                        id="password" name="password" 
                        type="password" 
                        required 
                        className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 transition-all duration-300 transform hover:scale-105">
                    🚀 Login to Dashboard
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account? <button type="button" onClick={() => setCurrentTab('register')} className="text-blue-600 hover:underline font-medium">Register here</button>
                  </p>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                      <Input 
                        id="name" name="name" 
                        required 
                        className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                      <Input 
                        id="email" name="email" 
                        type="email" 
                        required 
                        className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="student@university.edu"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                      <Input 
                        id="phone" name="phone" 
                        type="tel" 
                        required 
                        className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-gray-700">Password</Label>
                      <Input 
                        id="password" name="password" 
                        type="password" 
                        required 
                        className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 transition-all duration-300 transform hover:scale-105">
                    🎉 Create Account
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Already have an account? <button type="button" onClick={() => setCurrentTab('login')} className="text-purple-600 hover:underline font-medium">Login here</button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Your Profile</h1>
              <p className="text-gray-600 mt-2">Let's build your professional profile to match you with perfect internships</p>
            </div>
            <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700">
              ← Back to Home
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <span className="ml-2 text-blue-600 font-medium">Profile Setup</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <span className="ml-2 text-gray-500">Skill Assessment</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <span className="ml-2 text-gray-500">Matching</span>
              </div>
            </div>
          </div>
          
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Complete Your Profile</CardTitle>
              <p className="text-gray-600">This is a one-time setup to help our AI match you with the right internships.</p>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700">
                  🎯 <strong>Pro Tip:</strong> Complete profiles have 3x higher chances of getting matched with top internships!
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="resume">Upload Resume (Optional)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload your resume to auto-fill the form below
                </p>
              </div>
              
              <form onSubmit={handleProfileCreation} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="college">College/University</Label>
                    <Input id="college" name="college" required />
                  </div>
                  <div>
                    <Label htmlFor="course">Course/Degree</Label>
                    <Input id="course" name="course" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">Year of Study</Label>
                    <Input id="year" name="year" required />
                  </div>
                  <div>
                    <Label htmlFor="cgpa">CGPA/Percentage</Label>
                    <Input id="cgpa" name="cgpa" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input id="skills" name="skills" placeholder="e.g., Python, React, Java, Data Analysis" required />
                </div>
                
                <div>
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <Textarea id="interests" name="interests" placeholder="Describe your areas of interest..." />
                </div>
                
                <div>
                  <Label htmlFor="experience">Previous Experience (if any)</Label>
                  <Textarea id="experience" name="experience" placeholder="Describe any previous internships, projects, or work experience..." />
                </div>
                
                <Button type="submit" className="w-full">
                  Create Profile
                </Button>
              </form>
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
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Student!</span>
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="internships" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="internships">View Internships</TabsTrigger>
            <TabsTrigger value="my-internship">My Internship</TabsTrigger>
          </TabsList>

          <TabsContent value="internships" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Internships</CardTitle>
                  <p className="text-gray-600">Browse and explore ongoing internship opportunities</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {internships.map((intern) => (
                      <div key={intern.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{intern.title}</h3>
                          <Badge variant="secondary">Open</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{intern.location || 'Location N/A'}</p>
                        <p className="text-sm text-gray-500 mb-3">Duration: {intern.duration || 'N/A'} | Stipend: {intern.stipend || 'N/A'}</p>
                        <div className="flex gap-2 mb-3">
                          {intern.required_skills?.split(',').map((s: string) => (
                            <Badge key={s} variant="outline">{s.trim()}</Badge>
                          ))}
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    ))}
                    {internships.length === 0 && (
                      <p className="text-gray-500">No internships available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-internship" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Internship Status</CardTitle>
              </CardHeader>
              <CardContent>
                {!hasInternship || !myInternship ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      📋
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Internship Allocated</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't been allocated an internship yet. Our smart allocation system will match you with suitable opportunities.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-green-800">Internship Allocated! 🎉</h3>
                        <Badge className="bg-green-100 text-green-800">Allocated</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Title:</strong> {myInternship.title}</p>
                          <p><strong>Duration:</strong> {myInternship.duration || 'N/A'}</p>
                          <p><strong>Stipend:</strong> {myInternship.stipend || 'N/A'}</p>
                        </div>
                        <div>
                          <p><strong>Location:</strong> {myInternship.location || 'N/A'}</p>
                          <p><strong>Skills:</strong> {myInternship.required_skills}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}