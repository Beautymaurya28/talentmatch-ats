import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import ThemeToggle from './components/ThemeToggle';
import { CandidateType } from './types/types';

function App() {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<CandidateType[]>([]);

  const handleAnalyze = () => {
    if (jobDescription.trim() === '' || files.length === 0) {
      alert('Please enter a job description and upload at least one resume.');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data - in a real app, this would come from the backend
      const mockCandidates: CandidateType[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          skills: ['React', 'TypeScript', 'Node.js', 'UI/UX', 'Agile'],
          matchingScore: 92,
          matchedKeywords: ['React', 'TypeScript', 'UI/UX'],
          resumeFile: files[0],
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.chen@example.com',
          skills: ['JavaScript', 'React', 'CSS', 'Python', 'AWS'],
          matchingScore: 85,
          matchedKeywords: ['JavaScript', 'React', 'CSS'],
          resumeFile: files[0],
        },
        {
          id: '3',
          name: 'Jessica Williams',
          email: 'jessica.w@example.com',
          skills: ['Angular', 'JavaScript', 'HTML', 'CSS', 'Git'],
          matchingScore: 78,
          matchedKeywords: ['JavaScript', 'HTML', 'CSS'],
          resumeFile: files[0],
        },
        {
          id: '4',
          name: 'David Rodriguez',
          email: 'david.r@example.com',
          skills: ['React Native', 'JavaScript', 'Mobile Development', 'Firebase'],
          matchingScore: 73,
          matchedKeywords: ['JavaScript', 'Mobile Development'],
          resumeFile: files[0],
        },
        {
          id: '5',
          name: 'Emma Thompson',
          email: 'emma.t@example.com',
          skills: ['UX Research', 'UI Design', 'Figma', 'User Testing'],
          matchingScore: 65,
          matchedKeywords: ['UI Design', 'User Testing'],
          resumeFile: files[0],
        }
      ];
      
      setCandidates(mockCandidates);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const resetApp = () => {
    setJobDescription('');
    setFiles([]);
    setShowResults(false);
    setCandidates([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-blue-900 dark:bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">TalentMatch ATS</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <HomePage 
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            files={files}
            setFiles={setFiles}
            handleAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <ResultsPage 
            candidates={candidates} 
            jobDescription={jobDescription}
            resetApp={resetApp}
          />
        )}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 TalentMatch ATS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;