import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { PageType } from '../App';

interface StudentPortalProps {
  onNavigate: (page: PageType) => void;
}

export function StudentPortal({ onNavigate }: StudentPortalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [currentTab, setCurrentTab] = useState('login');
  const [hasInternship, setHasInternship] = useState(false);

  const loginForm = useForm<{ email: string; password: string }>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<{
    name: string;
    email: string;
    phone: string;
    password: string;
  }>({
    mode: 'onChange',
    defaultValues: { name: '', email: '', phone: '', password: '' },
  });

  const profileForm = useForm<{
    resume: FileList | undefined;
    college: string;
    course: string;
    year: string;
    cgpa: string;
    skills: string;
    interests: string;
    experience: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      resume: undefined,
      college: '',
      course: '',
      year: '',
      cgpa: '',
      skills: '',
      interests: '',
      experience: '',
    },
  });

  // Mock internship data
  const mockInternship = {
    id: 1,
    company: 'Tech Solutions India Pvt Ltd',
    position: 'Software Development Intern',
    duration: '6 months',
    stipend: '₹15,000/month',
    location: 'Mumbai, Maharashtra',
    startDate: '2024-07-01',
    status: 'allocated'
  };

  const onLoginSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await fetch('/api/auth/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res
          .json()
          .catch(() => ({ field: 'email', message: 'Invalid credentials' }));
        loginForm.setError(err.field as 'email' | 'password', {
          type: 'server',
          message: err.message,
        });
        return;
      }
      setIsLoggedIn(true);
      setHasProfile(false);
    } catch {
      loginForm.setError('email', {
        type: 'server',
        message: 'Network error',
      });
    }
  };

  const onRegisterSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    try {
      const res = await fetch('/api/auth/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res
          .json()
          .catch(() => ({ field: 'email', message: 'Registration failed' }));
        registerForm.setError(err.field as keyof typeof data, {
          type: 'server',
          message: err.message,
        });
        return;
      }
      setIsLoggedIn(true);
      setHasProfile(false);
    } catch {
      registerForm.setError('email', {
        type: 'server',
        message: 'Network error',
      });
    }
  };

  const onProfileSubmit = async (data: {
    resume: FileList | undefined;
    college: string;
    course: string;
    year: string;
    cgpa: string;
    skills: string;
    interests: string;
    experience: string;
  }) => {
    try {
      const formData = new FormData();
      if (data.resume?.[0]) {
        formData.append('resume', data.resume[0]);
      }
      formData.append('college', data.college);
      formData.append('course', data.course);
      formData.append('year', data.year);
      formData.append('cgpa', data.cgpa);
      formData.append('skills', data.skills);
      formData.append('interests', data.interests);
      formData.append('experience', data.experience);
      const res = await fetch('/api/student/profile', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res
          .json()
          .catch(() => ({ field: 'college', message: 'Profile creation failed' }));
        profileForm.setError(err.field as keyof typeof data, {
          type: 'server',
          message: err.message,
        });
        return;
      }
      setHasProfile(true);
    } catch {
      profileForm.setError('college', {
        type: 'server',
        message: 'Network error',
      });
    }
  };

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
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        rules={{
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="student@university.edu"
                                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        rules={{
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'At least 8 characters',
                          },
                          validate: (v) =>
                            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) ||
                            'Must include upper, lower, number',
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your password"
                                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={
                        !loginForm.formState.isValid ||
                        loginForm.formState.isSubmitting
                      }
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      🚀 Login to Dashboard
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentTab('register')}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Register here
                      </button>
                    </p>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form
                    onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        rules={{
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="student@university.edu"
                                className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        rules={{
                          required: 'Phone number is required',
                          pattern: {
                            value: /^\+?\d{10,14}$/,
                            message: 'Invalid phone number',
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        rules={{
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'At least 8 characters',
                          },
                          validate: (v) =>
                            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) ||
                            'Must include upper, lower, number',
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Create a strong password"
                                className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={
                        !registerForm.formState.isValid ||
                        registerForm.formState.isSubmitting
                      }
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      🎉 Create Account
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setCurrentTab('login')}
                        className="text-purple-600 hover:underline font-medium"
                      >
                        Login here
                      </button>
                    </p>
                  </form>
                </Form>
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
              <Form {...profileForm}>
                <div className="mb-6">
                  <FormField
                    control={profileForm.control}
                    name="resume"
                    rules={{
                      validate: {
                        fileSize: (files) =>
                          !files?.[0] ||
                          files[0].size <= 5 * 1024 * 1024 ||
                          'File must be 5MB or less',
                        fileType: (files) =>
                          !files?.[0] ||
                          ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
                            files[0].type,
                          ) ||
                          'Invalid file type',
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Resume (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const files = e.target.files;
                              field.onChange(files);
                              if (files?.[0]) {
                                console.log('Uploading resume:', files[0].name);
                              }
                            }}
                            className="mt-2"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-sm text-gray-500 mt-1">
                          Upload your resume to auto-fill the form below
                        </p>
                      </FormItem>
                    )}
                  />
                </div>

                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="college"
                      rules={{ required: 'College is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College/University</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="course"
                      rules={{ required: 'Course is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course/Degree</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="year"
                      rules={{ required: 'Year is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Study</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="cgpa"
                      rules={{ required: 'CGPA is required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CGPA/Percentage</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={profileForm.control}
                      name="skills"
                      rules={{ required: 'Skills are required' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills (comma separated)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Python, React, Java, Data Analysis"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={profileForm.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Areas of Interest</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your areas of interest..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={profileForm.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Experience (if any)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any previous internships, projects, or work experience..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      !profileForm.formState.isValid ||
                      profileForm.formState.isSubmitting
                    }
                    className="w-full"
                  >
                    Create Profile
                  </Button>
                </form>
              </Form>
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
                  {/* Mock internship listings */}
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Software Development Intern</h3>
                        <Badge variant="secondary">Open</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Tech Solutions India Pvt Ltd</p>
                      <p className="text-sm text-gray-500 mb-3">Duration: 6 months | Stipend: ₹15,000/month</p>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Node.js</Badge>
                        <Badge variant="outline">MongoDB</Badge>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Data Science Intern</h3>
                        <Badge variant="secondary">Open</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Analytics Corp India</p>
                      <p className="text-sm text-gray-500 mb-3">Duration: 4 months | Stipend: ₹12,000/month</p>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline">Python</Badge>
                        <Badge variant="outline">Machine Learning</Badge>
                        <Badge variant="outline">SQL</Badge>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Digital Marketing Intern</h3>
                        <Badge variant="secondary">Open</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">Creative Marketing Solutions</p>
                      <p className="text-sm text-gray-500 mb-3">Duration: 3 months | Stipend: ₹10,000/month</p>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline">SEO</Badge>
                        <Badge variant="outline">Social Media</Badge>
                        <Badge variant="outline">Content Writing</Badge>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
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
                {!hasInternship ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      📋
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Internship Allocated</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't been allocated an internship yet. Our smart allocation system will match you with suitable opportunities.
                    </p>
                    <Button 
                      onClick={() => setHasInternship(true)} 
                      variant="outline"
                    >
                      Refresh Status
                    </Button>
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
                          <p><strong>Company:</strong> {mockInternship.company}</p>
                          <p><strong>Position:</strong> {mockInternship.position}</p>
                          <p><strong>Duration:</strong> {mockInternship.duration}</p>
                        </div>
                        <div>
                          <p><strong>Stipend:</strong> {mockInternship.stipend}</p>
                          <p><strong>Location:</strong> {mockInternship.location}</p>
                          <p><strong>Start Date:</strong> {mockInternship.startDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Button>Accept Internship</Button>
                        <Button variant="outline">View Details</Button>
                        <Button variant="ghost">Contact Company</Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">Want to apply for other internships manually?</h4>
                      <Button variant="outline">Browse All Internships</Button>
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