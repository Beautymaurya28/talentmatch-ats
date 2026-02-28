import React from 'react';
import CandidateCard from './CandidateCard';
import { CandidateListProps } from '../types/types';

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  // Group candidates by score ranges
  const groupedCandidates = {
    excellent: candidates.filter(c => c.matchingScore >= 90),
    good: candidates.filter(c => c.matchingScore >= 80 && c.matchingScore < 90),
    moderate: candidates.filter(c => c.matchingScore >= 70 && c.matchingScore < 80),
    fair: candidates.filter(c => c.matchingScore >= 60 && c.matchingScore < 70),
    poor: candidates.filter(c => c.matchingScore < 60)
  };

  const renderGroup = (title: string, candidates: typeof groupedCandidates.excellent, color: string) => {
    if (candidates.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className={`text-lg font-semibold ${color} mb-4`}>{title} ({candidates.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderGroup("Excellent Match (90%+)", groupedCandidates.excellent, "text-green-700")}
      {renderGroup("Good Match (80-89%)", groupedCandidates.good, "text-green-600")}
      {renderGroup("Moderate Match (70-79%)", groupedCandidates.moderate, "text-yellow-700")}
      {renderGroup("Fair Match (60-69%)", groupedCandidates.fair, "text-yellow-600")}
      {renderGroup("Poor Match (Below 60%)", groupedCandidates.poor, "text-red-600")}
    </div>
  );
};

export default CandidateList;