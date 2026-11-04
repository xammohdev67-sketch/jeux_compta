export type AccountClassNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type AccountSide = 'DEBIT' | 'CREDIT';

export interface SYSCOHADAAccount {
  accountNumber: string;
  label: string;
  classNumber: AccountClassNumber;
}

export interface JournalEntry {
  accountNumber: string;
  accountLabel: string;
  side: AccountSide;
  amount: number;
}

export interface QuizQuestion {
  id: string;
  type: 'NATURE_COMPTE' | 'IMPUTATION_SIMPLE' | 'EQUILIBRE_JOURNAL' | 'RAPIDE_CHRONO';
  difficulty: 'DEBUTANT' | 'INTERMEDIAIRE' | 'EXPERT';
  questionText: string;
  contextText?: string;
  amountFCFA?: number;
  correctAnswers: JournalEntry[];
  availableOptions: SYSCOHADAAccount[];
  explanation: string;
}
