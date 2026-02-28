import React from 'react';
import { FileText } from 'lucide-react';
import { JobDescriptionInputProps } from '../types/types';

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ 
  jobDescription, 
  setJobDescription 
}) => {
  const placeholderText = `Enter the job description here, including:

- Required skills and qualifications
- Experience level requirements
- Primary responsibilities
- Technical requirements
- Preferred qualifications

Example:
We are looking for a React.js Developer with 3+ years of experience in building responsive web applications. The ideal candidate should have expertise in JavaScript, React, Redux, and CSS. Experience with TypeScript, Node.js, and AWS is a plus.`;

  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <div className="bg-primary-100 p-2 rounded-lg">
          <FileText className="h-5 w-5 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 ml-3">Job Description</h3>
      </div>
      
      <div className="relative h-[calc(100%-4rem)]">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder={placeholderText}
          className="w-full h-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none bg-white shadow-sm hover:shadow-md"
          aria-label="Job Description"
        />
        
        <div className="absolute bottom-3 right-3 flex gap-3 text-xs text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm">
          <span>{jobDescription.length} characters</span>
          <span className="border-l border-gray-300 pl-3">
            {jobDescription.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;