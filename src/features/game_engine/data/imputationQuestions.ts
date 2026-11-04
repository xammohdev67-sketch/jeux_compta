import { SYSCOHADA_ACCOUNTS } from '../../accounting/data/accounts';
import type {
  JournalEntry,
  QuizQuestion,
  SYSCOHADAAccount,
} from '../../accounting/types/accounting';

function requireAccount(accountNumber: string): SYSCOHADAAccount {
  const account = SYSCOHADA_ACCOUNTS.find((item) => item.accountNumber === accountNumber);

  if (!account) {
    throw new Error(`Le compte ${accountNumber} est absent du catalogue SYSCOHADA.`);
  }

  return account;
}

function entry(accountNumber: string, side: JournalEntry['side'], amount: number): JournalEntry {
  const account = requireAccount(accountNumber);

  return {
    accountNumber: account.accountNumber,
    accountLabel: account.label,
    side,
    amount,
  };
}

function question(
  id: string,
  questionText: string,
  amountFCFA: number,
  debitAccount: string,
  creditAccount: string,
  explanation: string,
): QuizQuestion {
  return {
    id,
    type: 'IMPUTATION_SIMPLE',
    difficulty: 'DEBUTANT',
    questionText,
    amountFCFA,
    correctAnswers: [
      entry(debitAccount, 'DEBIT', amountFCFA),
      entry(creditAccount, 'CREDIT', amountFCFA),
    ],
    availableOptions: [
      requireAccount(debitAccount),
      requireAccount(creditAccount),
      requireAccount(debitAccount === '6011' ? '605' : '411'),
      requireAccount(creditAccount === '57' ? '52' : '57'),
    ],
    explanation,
  };
}

export const IMPUTATION_QUESTIONS: readonly QuizQuestion[] = [
  question(
    'achat-marchandises-especes',
    'L’entreprise achète des marchandises au comptant, en espèces. Quelle écriture passer ?',
    125_000,
    '6011',
    '57',
    'Les achats de marchandises sont une charge : le compte 6011 est débité. Le paiement en espèces diminue la caisse : le compte 57 est crédité. Exercice hors TVA.',
  ),
  question(
    'achat-marchandises-credit',
    'L’entreprise reçoit des marchandises et réglera son fournisseur plus tard. Quelle écriture passer ?',
    240_000,
    '6011',
    '401',
    'La réception des marchandises constate une charge au débit du compte 6011. La dette envers le fournisseur augmente au crédit du compte 401. Exercice hors TVA.',
  ),
  question(
    'reglement-fournisseur-banque',
    'L’entreprise règle une partie de sa dette fournisseur par virement bancaire. Quelle écriture passer ?',
    100_000,
    '401',
    '52',
    'Le règlement diminue la dette fournisseur : le compte 401 est débité. Le solde bancaire diminue : le compte 52 est crédité. Exercice hors frais bancaires.',
  ),
];
