import React from 'react';
import { Download, ExternalLink, Star } from 'lucide-react';
import { CandidateCardProps } from '../types/types';
import { Button } from './ui/button';

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-700 bg-green-100 border-green-200';
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(candidate.resumeFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${candidate.name.replace(/\s+/g, '_')}_resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.email}</p>
          </div>
          
          <div className={`flex items-center justify-center rounded-full px-4 py-1.5 font-bold text-sm border ${getScoreColor(candidate.matchingScore)}`}>
            {candidate.matchingScore}%
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <span 
                key={index} 
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                  candidate.matchedKeywords.includes(skill) 
                    ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                {skill}
                {candidate.matchedKeywords.includes(skill) && (
                  <Star className="inline-block h-3 w-3 ml-1 text-yellow-500" />
                )}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">Matched Keywords</h4>
          <p className="text-sm text-gray-700">
            {candidate.matchedKeywords.join(', ')}
          </p>
        </div>
        
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;