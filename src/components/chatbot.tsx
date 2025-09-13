import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your PM Internship Scheme assistant. I can help you with scheme information, resume scoring, and answer your doubts. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [resumeSuggestions, setResumeSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('eligibility') || lowerMessage.includes('eligible')) {
      return "To be eligible for PM Internship Scheme:\n• Must be a student currently enrolled in a recognized institution\n• Should be in 2nd year or above\n• Minimum CGPA of 6.0 or 60%\n• Age between 18-25 years\n• Indian citizen";
    }
    
    if (lowerMessage.includes('stipend') || lowerMessage.includes('salary') || lowerMessage.includes('payment')) {
      return "Stipend details:\n• Varies by company and role (₹8,000 - ₹25,000/month)\n• Government provides additional allowance of ₹5,000/month\n• Certificate and performance bonus on completion\n• Some companies offer full-time job opportunities";
    }
    
    if (lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
      return "Internship duration:\n• Minimum: 2 months\n• Maximum: 12 months\n• Most common: 3-6 months\n• Extension possible based on performance\n• Part-time and full-time options available";
    }
    
    if (lowerMessage.includes('application') || lowerMessage.includes('apply') || lowerMessage.includes('process')) {
      return "Application process:\n1. Register on the portal\n2. Complete your profile\n3. Upload resume (optional)\n4. Browse available internships\n5. Smart allocation system will match you\n6. Manual application also available\n7. Interview with selected companies";
    }
    
    if (lowerMessage.includes('documents') || lowerMessage.includes('required')) {
      return "Required documents:\n• College ID card\n• Academic transcripts\n• Resume/CV\n• Aadhaar card\n• Bank account details\n• Passport size photograph\n• Bonafide certificate from college";
    }
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      setShowResumeUpload(true);
      return "I can help you score your resume and provide improvement suggestions! Please upload your resume using the form below, and I'll analyze it for you.";
    }
    
    if (lowerMessage.includes('smart allocation') || lowerMessage.includes('matching')) {
      return "Smart Allocation System:\n• AI analyzes your profile, skills, and preferences\n• Matches with suitable company requirements\n• Considers location preferences\n• Factors in academic background\n• Success rate: 87%\n• Results typically within 48 hours";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "Contact support:\n• Email: support@pminternship.gov.in\n• Phone: 1800-123-4567 (Toll-free)\n• WhatsApp: +91-98765-43210\n• Office hours: 9 AM - 6 PM (Mon-Fri)\n• Live chat: Available 24/7";
    }
    
    return "I understand you're asking about the PM Internship Scheme. I can help with:\n• Eligibility criteria\n• Application process\n• Stipend details\n• Required documents\n• Resume scoring\n• Smart allocation system\n\nPlease ask me about any of these topics!";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // "API_CALL: Chatbot message endpoint - POST /api/chatbot/message"
    
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInput('');
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // "API_CALL: Resume analysis endpoint - POST /api/chatbot/analyze-resume"
      
      // Simulate resume analysis
      setTimeout(() => {
        const score = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
        setResumeScore(score);
        
        const suggestions = [
          "Add more specific technical skills relevant to your field",
          "Include quantifiable achievements (e.g., 'Increased efficiency by 20%')",
          "Add a professional summary at the top",
          "Include relevant coursework and projects",
          "Use action verbs to describe your experiences",
          "Ensure consistent formatting throughout"
        ];
        
        setResumeSuggestions(suggestions.slice(0, Math.floor(Math.random() * 3) + 3));
        
        const analysisMessage: Message = {
          id: messages.length + 1,
          text: `Resume Analysis Complete!\n\nYour Resume Score: ${score}/100\n\n${score >= 90 ? 'Excellent!' : score >= 80 ? 'Very Good!' : score >= 70 ? 'Good!' : 'Needs Improvement'}\n\nCheck below for detailed suggestions to improve your resume.`,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, analysisMessage]);
      }, 2000);
    }
  };

  const quickQuestions = [
    "What are the eligibility criteria?",
    "How much stipend will I get?",
    "What documents are required?",
    "How does smart allocation work?",
    "Score my resume"
  ];

  return (
    <div className="fixed bottom-20 right-6 w-96 h-[600px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-0 z-50 flex flex-col overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div>
              <CardTitle className="text-lg">PM Assistant</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm opacity-90">Always here to help</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            ✕
          </Button>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line shadow-md ${
                  message.isBot
                    ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Resume Upload Section */}
        {showResumeUpload && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border">
            <Label htmlFor="resume-upload" className="text-sm font-medium">
              Upload Resume for Analysis
            </Label>
            <Input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="mt-2"
            />
            {resumeScore && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Resume Score:</span>
                  <Badge 
                    variant={resumeScore >= 80 ? "default" : "secondary"}
                    className={resumeScore >= 80 ? "bg-green-600" : ""}
                  >
                    {resumeScore}/100
                  </Badge>
                </div>
                {resumeSuggestions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Suggestions:</p>
                    <ul className="text-xs space-y-1">
                      {resumeSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setShowResumeUpload(false)}
                >
                  Close Analysis
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
            <div className="space-y-1">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start text-xs h-auto py-2"
                  onClick={() => setInput(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex space-x-2 p-3 bg-gray-50 rounded-2xl">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about PM Internship Scheme..."
            className="flex-1 border-0 bg-white rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          <Button 
            type="submit" 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-4"
          >
            🚀
          </Button>
        </form>
      </CardContent>
    </div>
  );
}