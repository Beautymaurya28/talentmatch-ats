import React from 'react';
import JobDescriptionInput from '../components/JobDescriptionInput';
import ResumeUpload from '../components/ResumeUpload';
import AnalyzeButton from '../components/AnalyzeButton';
import { HomePageProps } from '../types/types';

const HomePage: React.FC<HomePageProps> = ({
  jobDescription,
  setJobDescription,
  files,
  setFiles,
  handleAnalyze,
  isAnalyzing
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-3">Candidate Match Analysis</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Paste your job description and upload candidate resumes to analyze and rank matches automatically.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <JobDescriptionInput 
            jobDescription={jobDescription} 
            setJobDescription={setJobDescription} 
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <ResumeUpload 
            files={files} 
            setFiles={setFiles} 
          />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <AnalyzeButton 
          handleAnalyze={handleAnalyze} 
          isDisabled={jobDescription.trim() === '' || files.length === 0}
          isAnalyzing={isAnalyzing}
        />
      </div>

      <div className="bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <div className="text-blue-500 dark:text-blue-400 font-bold text-xl mb-2">1</div>
            <h4 className="font-medium mb-2 dark:text-white">Input Job Description</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Paste the complete job description including all requirements and qualifications.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <div className="text-blue-500 dark:text-blue-400 font-bold text-xl mb-2">2</div>
            <h4 className="font-medium mb-2 dark:text-white">Upload Resumes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Upload candidate resumes in PDF or DOCX format. Multiple files are supported.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <div className="text-blue-500 dark:text-blue-400 font-bold text-xl mb-2">3</div>
            <h4 className="font-medium mb-2 dark:text-white">Review Results</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get an AI-powered analysis ranking candidates based on job fit with highlighted matching skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;