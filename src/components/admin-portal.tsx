import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { PageType } from '../App';

interface AdminPortalProps {
  onNavigate: (page: PageType) => void;
}

export function AdminPortal({ onNavigate }: AdminPortalProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [isAllocating, setIsAllocating] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setIsLoggedIn(true);
    }
  };

  const handleCreateInternship = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    const formData = new FormData(e.currentTarget);
    await fetch('/api/internships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    e.currentTarget.reset();
  };

  const handleAssignInternship = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    const formData = new FormData(e.currentTarget);
    await fetch('/api/internships/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    e.currentTarget.reset();
  };

  const handleSmartAllocation = () => {
    setIsAllocating(true);
    // "API_CALL: Smart allocation endpoint - POST /api/admin/smart-allocation"
    
    // Simulate allocation process
    setTimeout(() => {
      setIsAllocating(false);
      alert('Smart allocation completed successfully! 45 students have been allocated internships.');
    }, 8000);
  };

  // Mock data for charts
  const studentsByCollege = [
    { name: 'IIT Delhi', students: 120 },
    { name: 'IIT Mumbai', students: 98 },
    { name: 'NIT Trichy', students: 85 },
    { name: 'BITS Pilani', students: 76 },
    { name: 'Others', students: 245 }
  ];

  const internshipsByDomain = [
    { name: 'Software Development', value: 45, color: '#3B82F6' },
    { name: 'Data Science', value: 25, color: '#10B981' },
    { name: 'Digital Marketing', value: 20, color: '#F59E0B' },
    { name: 'Finance', value: 15, color: '#EF4444' },
    { name: 'Design', value: 10, color: '#8B5CF6' }
  ];

  const monthlyRegistrations = [
    { month: 'Jan', students: 120, companies: 15 },
    { month: 'Feb', students: 180, companies: 22 },
    { month: 'Mar', students: 240, companies: 18 },
    { month: 'Apr', students: 320, companies: 28 },
    { month: 'May', students: 420, companies: 35 },
    { month: 'Jun', students: 380, companies: 32 }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Admin Features */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-sm font-medium">
                ⚙️ Admin Portal
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Command
                </span>
                <br />
                <span className="text-gray-800">Center</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Comprehensive dashboard to manage the entire PM Internship ecosystem. 
                Monitor, analyze, and optimize the platform's performance.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Admin Capabilities</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">1,247</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">156</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">423</div>
                  <div className="text-sm text-gray-600">Placements</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "🤖 Smart Allocation Engine",
                "📊 Real-time Analytics Dashboard",
                "👥 User Management System",
                "🔒 Security & Compliance Tools"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <span className="text-lg">{feature.split(' ')[0]}</span>
                  <span className="text-gray-700">{feature.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Admin Access</CardTitle>
                <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-gray-500 hover:text-gray-700">
                  ← Back
                </Button>
              </div>
              <p className="text-gray-600">Secure administrator login</p>
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-3 mt-4">
                <p className="text-xs text-gray-700">
                  🔒 This is a secure area. Only authorized personnel can access.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Admin Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="admin@pminternship.gov.in"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-gray-700">Admin Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Enter secure password"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 transition-all duration-300 transform hover:scale-105">
                  🔐 Login as Administrator
                </Button>
                <p className="text-center text-xs text-gray-500">
                  Protected by enterprise-grade security
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isAllocating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6">
              <img 
                src="https://i.gifer.com/ZKZg.gif" 
                alt="Allocating..."
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                🤖
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Allocation in Progress...</h3>
            <p className="text-gray-600 mb-6">
              Our AI engine is analyzing student profiles and matching them with suitable internships.
            </p>
            <Progress value={75} className="mb-4" />
            <p className="text-sm text-gray-500">Processing 245 student profiles...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Administrator!</span>
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="allocation">Smart Allocation</TabsTrigger>
        </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-3xl font-bold">1,247</p>
                      <p className="text-sm text-green-600">↑ 12% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      👨‍🎓
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Registered Companies</p>
                      <p className="text-3xl font-bold">156</p>
                      <p className="text-sm text-green-600">↑ 8% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      🏢
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Internships</p>
                      <p className="text-3xl font-bold">89</p>
                      <p className="text-sm text-green-600">↑ 15% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      💼
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Successful Placements</p>
                      <p className="text-3xl font-bold">423</p>
                      <p className="text-sm text-green-600">↑ 22% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      ✅
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Students by College</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studentsByCollege}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Internships by Domain</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={internshipsByDomain}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {internshipsByDomain.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Registration Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRegistrations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="companies" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">245</p>
                    <p className="text-sm text-gray-600">Pending Profile Completion</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-gray-600">Awaiting Allocation</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">423</p>
                    <p className="text-sm text-gray-600">Successfully Placed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Student Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Rahul Sharma</p>
                      <p className="text-sm text-gray-600">IIT Delhi, Computer Science</p>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-1">Profile Complete</Badge>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Priya Patel</p>
                      <p className="text-sm text-gray-600">NIT Trichy, Data Science</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Profile Pending</Badge>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Amit Kumar</p>
                      <p className="text-sm text-gray-600">BITS Pilani, Mechanical</p>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-1">Profile Complete</Badge>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-600">Pending Verification</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">144</p>
                    <p className="text-sm text-gray-600">Verified Companies</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-sm text-gray-600">Active Job Postings</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Company Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">TechCorp Solutions</p>
                      <p className="text-sm text-gray-600">IT Services, Mumbai</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Pending Verification</Badge>
                      <p className="text-sm text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">DataFlow Analytics</p>
                      <p className="text-sm text-gray-600">Data Science, Bangalore</p>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-1">Verified</Badge>
                      <p className="text-sm text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Creative Marketing Hub</p>
                      <p className="text-sm text-gray-600">Marketing, Delhi</p>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-1">Verified</Badge>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="internships" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateInternship} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" required />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">Duration</Label>
                          <Input id="duration" name="duration" required />
                        </div>
                        <div>
                          <Label htmlFor="stipend">Stipend</Label>
                          <Input id="stipend" name="stipend" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" required />
                      </div>
                      <div>
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input id="skills" name="skills" />
                      </div>
                      <Button type="submit">Create Internship</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assign Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAssignInternship} className="space-y-4">
                      <div>
                        <Label htmlFor="studentId">Student Email/ID</Label>
                        <Input id="studentId" name="studentId" required />
                      </div>
                      <div>
                        <Label htmlFor="internshipId">Internship ID</Label>
                        <Input id="internshipId" name="internshipId" required />
                      </div>
                      <Button type="submit">Assign</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="allocation" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Allocation Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Students Ready for Allocation</span>
                      <span className="font-semibold">245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available Internship Slots</span>
                      <span className="font-semibold">189</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Allocation Success Rate</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Allocation Run</span>
                      <span className="font-semibold">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Smart Allocation Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      🤖
                    </div>
                    <p className="text-gray-600 mb-6">
                      Our AI-powered engine analyzes student profiles, skills, preferences, and company requirements to make optimal matches.
                    </p>
                    <Button 
                      onClick={handleSmartAllocation}
                      className="w-full"
                      size="lg"
                    >
                      Start Smart Allocation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Allocations</CardTitle>
                <p className="text-gray-600">Students waiting for internship allocation</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Neha Singh</p>
                      <p className="text-sm text-gray-600">IIT Mumbai, Computer Science | Skills: React, Python, ML</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Waiting</Badge>
                      <p className="text-sm text-gray-500">Profile Score: 92/100</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Arjun Reddy</p>
                      <p className="text-sm text-gray-600">NIT Warangal, Data Science | Skills: Python, SQL, Statistics</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Waiting</Badge>
                      <p className="text-sm text-gray-500">Profile Score: 88/100</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Kavya Nair</p>
                      <p className="text-sm text-gray-600">BITS Goa, Digital Marketing | Skills: SEO, Content, Analytics</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">Waiting</Badge>
                      <p className="text-sm text-gray-500">Profile Score: 85/100</p>
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