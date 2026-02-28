import React, { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import CandidateList from '../components/CandidateList';
import { ResultsPageProps, CandidateType } from '../types/types';

const ResultsPage: React.FC<ResultsPageProps> = ({ candidates, jobDescription, resetApp }) => {
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateType[]>(candidates);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [scoreFilter, setScoreFilter] = useState<string>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCandidates(term, scoreFilter);
  };

  const handleScoreFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value;
    setScoreFilter(filter);
    filterCandidates(searchTerm, filter);
  };

  const filterCandidates = (term: string, score: string) => {
    let filtered = [...candidates];
    
    if (term) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(term.toLowerCase()) ||
        candidate.email.toLowerCase().includes(term.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
      );
    }
    
    if (score !== 'all') {
      const minScore = parseInt(score);
      filtered = filtered.filter(candidate => candidate.matchingScore >= minScore);
    }
    
    setFilteredCandidates(filtered);
  };

  const exportToCsv = () => {
    const headers = ['Name', 'Email', 'Skills', 'Matching Score', 'Matched Keywords'];
    
    const csvRows = [
      headers.join(','),
      ...filteredCandidates.map(candidate => {
        return [
          `"${candidate.name}"`,
          `"${candidate.email}"`,
          `"${candidate.skills.join(', ')}"`,
          `"${candidate.matchingScore}%"`,
          `"${candidate.matchedKeywords.join(', ')}"`
        ].join(',');
      })
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'candidate_results.csv');
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <button 
          onClick={resetApp}
          className="flex items-center text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition mb-4 md:mb-0"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Analysis
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={exportToCsv}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">Analysis Results</h2>
        
        <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-md p-4 mb-6">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Job Description Summary</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {jobDescription.length > 200 
              ? `${jobDescription.substring(0, 200)}...` 
              : jobDescription}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="w-full md:w-1/2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Candidates
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, email or skills..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <label htmlFor="scoreFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Matching Score
            </label>
            <select
              id="scoreFilter"
              value={scoreFilter}
              onChange={handleScoreFilter}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Scores</option>
              <option value="90">90% and above</option>
              <option value="80">80% and above</option>
              <option value="70">70% and above</option>
              <option value="60">60% and above</option>
            </select>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
            {filteredCandidates.length} {filteredCandidates.length === 1 ? 'Candidate' : 'Candidates'} Found
          </h3>
          
          <CandidateList candidates={filteredCandidates} />
          
          {filteredCandidates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No candidates match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;