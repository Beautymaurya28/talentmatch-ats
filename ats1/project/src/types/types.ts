export interface CandidateType {
  id: string;
  name: string;
  email: string;
  skills: string[];
  matchingScore: number;
  matchedKeywords: string[];
  resumeFile: File;
}

export interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
}

export interface ResumeUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export interface AnalyzeButtonProps {
  handleAnalyze: () => void;
  isDisabled: boolean;
  isAnalyzing: boolean;
}

export interface CandidateCardProps {
  candidate: CandidateType;
}

export interface CandidateListProps {
  candidates: CandidateType[];
}

export interface HomePageProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  handleAnalyze: () => void;
  isAnalyzing: boolean;
}

export interface ResultsPageProps {
  candidates: CandidateType[];
  jobDescription: string;
  resetApp: () => void;
}