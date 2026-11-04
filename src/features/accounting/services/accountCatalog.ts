import { SYSCOHADA_ACCOUNTS } from '../data/accounts';
import type { AccountClassNumber, SYSCOHADAAccount } from '../types/accounting';

export function searchAccounts(
  query: string,
  classNumber?: AccountClassNumber,
): SYSCOHADAAccount[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('fr');

  return SYSCOHADA_ACCOUNTS.filter((account) => {
    const matchesClass = classNumber === undefined || account.classNumber === classNumber;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      account.accountNumber.includes(normalizedQuery) ||
      account.label.toLocaleLowerCase('fr').includes(normalizedQuery);

    return matchesClass && matchesQuery;
  });
}
