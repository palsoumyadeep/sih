import React, { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { StudentPortal } from "./components/student-portal";
import { CompanyPortal } from "./components/company-portal";
import { AdminPortal } from "./components/admin-portal";
import { Chatbot } from "./components/chatbot";

export type PageType =
  | "landing"
  | "student"
  | "company"
  | "admin";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>("landing");
  const [showChatbot, setShowChatbot] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={setCurrentPage} />;
      case "student":
        return <StudentPortal onNavigate={setCurrentPage} />;
      case "company":
        return <CompanyPortal onNavigate={setCurrentPage} />;
      case "admin":
        return <AdminPortal onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-all duration-300 transform hover:scale-110 animate-pulse"
      >
        <span className="text-2xl">🤖</span>
      </button>

      {/* Chatbot Component */}
      {showChatbot && (
        <Chatbot onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
}