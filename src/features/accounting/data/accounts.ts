import type { AccountClassNumber, SYSCOHADAAccount } from '../types/accounting';

export interface AccountClass {
  classNumber: AccountClassNumber;
  label: string;
  description: string;
}

export const ACCOUNT_CLASSES: readonly AccountClass[] = [
  { classNumber: 1, label: 'Ressources durables', description: 'Capitaux propres et dettes financières' },
  { classNumber: 2, label: 'Actif immobilisé', description: 'Immobilisations et comptes associés' },
  { classNumber: 3, label: 'Stocks', description: 'Stocks et en-cours' },
  { classNumber: 4, label: 'Tiers', description: 'Fournisseurs, clients, personnel et État' },
  { classNumber: 5, label: 'Trésorerie', description: 'Banques, caisse et autres comptes financiers' },
  { classNumber: 6, label: 'Charges', description: 'Charges des activités ordinaires' },
  { classNumber: 7, label: 'Produits', description: 'Produits des activités ordinaires' },
  { classNumber: 8, label: 'Autres charges et produits', description: 'Hors activités ordinaires et comptes assimilés' },
] as const;

export const SYSCOHADA_ACCOUNTS: readonly SYSCOHADAAccount[] = [
  { accountNumber: '101', label: 'Capital social', classNumber: 1 },
  { accountNumber: '102', label: 'Capital par dotation', classNumber: 1 },
  { accountNumber: '103', label: 'Capital personnel', classNumber: 1 },
  { accountNumber: '104', label: "Compte de l'exploitant", classNumber: 1 },
  { accountNumber: '105', label: 'Primes liées aux capitaux propres', classNumber: 1 },
  { accountNumber: '106', label: 'Écarts de réévaluation', classNumber: 1 },
  { accountNumber: '11', label: 'Réserves', classNumber: 1 },
  { accountNumber: '12', label: 'Report à nouveau', classNumber: 1 },
  { accountNumber: '13', label: "Résultat net de l'exercice", classNumber: 1 },
  { accountNumber: '14', label: "Subventions d'investissement", classNumber: 1 },
  { accountNumber: '16', label: 'Emprunts et dettes assimilées', classNumber: 1 },
  { accountNumber: '19', label: 'Provisions financières pour risques et charges', classNumber: 1 },

  { accountNumber: '20', label: 'Charges immobilisées', classNumber: 2 },
  { accountNumber: '21', label: 'Immobilisations incorporelles', classNumber: 2 },
  { accountNumber: '22', label: 'Terrains', classNumber: 2 },
  { accountNumber: '23', label: 'Bâtiments, installations et agencements', classNumber: 2 },
  { accountNumber: '231', label: 'Bâtiments industriels', classNumber: 2 },
  { accountNumber: '232', label: 'Bâtiments administratifs et commerciaux', classNumber: 2 },
  { accountNumber: '24', label: 'Matériel', classNumber: 2 },
  { accountNumber: '244', label: 'Matériel et mobilier', classNumber: 2 },
  { accountNumber: '245', label: 'Matériel de transport', classNumber: 2 },
  { accountNumber: '25', label: "Avances et acomptes versés sur immobilisations", classNumber: 2 },
  { accountNumber: '26', label: 'Titres de participation', classNumber: 2 },
  { accountNumber: '27', label: 'Autres immobilisations financières', classNumber: 2 },
  { accountNumber: '28', label: 'Amortissements', classNumber: 2 },
  { accountNumber: '29', label: 'Dépréciations des immobilisations', classNumber: 2 },

  { accountNumber: '31', label: 'Marchandises', classNumber: 3 },
  { accountNumber: '311', label: 'Marchandises A', classNumber: 3 },
  { accountNumber: '32', label: 'Matières premières et fournitures liées', classNumber: 3 },
  { accountNumber: '321', label: 'Matières premières A', classNumber: 3 },
  { accountNumber: '33', label: 'Autres approvisionnements', classNumber: 3 },
  { accountNumber: '34', label: 'Produits en cours', classNumber: 3 },
  { accountNumber: '35', label: 'Services en cours', classNumber: 3 },
  { accountNumber: '36', label: 'Produits finis', classNumber: 3 },
  { accountNumber: '37', label: 'Produits intermédiaires et résiduels', classNumber: 3 },
  { accountNumber: '38', label: 'Stocks en cours de route, en dépôt ou en consignation', classNumber: 3 },
  { accountNumber: '39', label: 'Dépréciations des stocks', classNumber: 3 },

  { accountNumber: '401', label: 'Fournisseurs', classNumber: 4 },
  { accountNumber: '408', label: 'Fournisseurs, factures non parvenues', classNumber: 4 },
  { accountNumber: '409', label: 'Fournisseurs débiteurs', classNumber: 4 },
  { accountNumber: '411', label: 'Clients', classNumber: 4 },
  { accountNumber: '416', label: 'Clients douteux ou litigieux', classNumber: 4 },
  { accountNumber: '418', label: 'Clients, produits à recevoir', classNumber: 4 },
  { accountNumber: '419', label: 'Clients créditeurs', classNumber: 4 },
  { accountNumber: '421', label: 'Personnel, avances et acomptes', classNumber: 4 },
  { accountNumber: '422', label: 'Personnel, rémunérations dues', classNumber: 4 },
  { accountNumber: '431', label: 'Sécurité sociale', classNumber: 4 },
  { accountNumber: '441', label: 'État, subventions à recevoir', classNumber: 4 },
  { accountNumber: '443', label: 'État, TVA facturée', classNumber: 4 },
  { accountNumber: '444', label: 'État, TVA due ou crédit de TVA', classNumber: 4 },
  { accountNumber: '445', label: 'État, TVA récupérable', classNumber: 4 },
  { accountNumber: '447', label: 'État, impôts et taxes retenus à la source', classNumber: 4 },
  { accountNumber: '49', label: 'Dépréciations et provisions pour risques à court terme', classNumber: 4 },

  { accountNumber: '50', label: 'Titres de placement', classNumber: 5 },
  { accountNumber: '511', label: 'Chèques à encaisser', classNumber: 5 },
  { accountNumber: '512', label: 'Effets à encaisser', classNumber: 5 },
  { accountNumber: '52', label: 'Banques', classNumber: 5 },
  { accountNumber: '53', label: 'Établissements financiers et assimilés', classNumber: 5 },
  { accountNumber: '54', label: 'Instruments de trésorerie', classNumber: 5 },
  { accountNumber: '56', label: 'Banques, crédits de trésorerie', classNumber: 5 },
  { accountNumber: '57', label: 'Caisse', classNumber: 5 },
  { accountNumber: '58', label: 'Régies d’avances et accréditifs', classNumber: 5 },
  { accountNumber: '59', label: 'Dépréciations et provisions pour risques à court terme', classNumber: 5 },

  { accountNumber: '6011', label: 'Achats de marchandises dans la Région', classNumber: 6 },
  { accountNumber: '6012', label: 'Achats de marchandises hors Région', classNumber: 6 },
  { accountNumber: '6021', label: 'Achats de matières premières dans la Région', classNumber: 6 },
  { accountNumber: '604', label: 'Achats de matières et fournitures consommables', classNumber: 6 },
  { accountNumber: '605', label: 'Autres achats', classNumber: 6 },
  { accountNumber: '608', label: 'Achats d’emballages', classNumber: 6 },
  { accountNumber: '61', label: 'Transports', classNumber: 6 },
  { accountNumber: '62', label: 'Services extérieurs A', classNumber: 6 },
  { accountNumber: '63', label: 'Services extérieurs B', classNumber: 6 },
  { accountNumber: '64', label: 'Impôts et taxes', classNumber: 6 },
  { accountNumber: '65', label: 'Autres charges', classNumber: 6 },
  { accountNumber: '66', label: 'Charges de personnel', classNumber: 6 },
  { accountNumber: '67', label: 'Frais financiers et charges assimilées', classNumber: 6 },
  { accountNumber: '68', label: 'Dotations aux amortissements', classNumber: 6 },
  { accountNumber: '69', label: 'Dotations aux provisions et dépréciations', classNumber: 6 },
  { accountNumber: '6031', label: 'Variations des stocks de marchandises', classNumber: 6 },

  { accountNumber: '701', label: 'Ventes de marchandises', classNumber: 7 },
  { accountNumber: '702', label: 'Ventes de produits finis', classNumber: 7 },
  { accountNumber: '703', label: 'Ventes de produits intermédiaires', classNumber: 7 },
  { accountNumber: '704', label: 'Ventes de produits résiduels', classNumber: 7 },
  { accountNumber: '705', label: 'Travaux facturés', classNumber: 7 },
  { accountNumber: '706', label: 'Services vendus', classNumber: 7 },
  { accountNumber: '71', label: 'Production stockée', classNumber: 7 },
  { accountNumber: '72', label: 'Production immobilisée', classNumber: 7 },
  { accountNumber: '73', label: 'Variations des stocks de biens et services produits', classNumber: 7 },
  { accountNumber: '75', label: 'Autres produits', classNumber: 7 },
  { accountNumber: '77', label: 'Revenus financiers et produits assimilés', classNumber: 7 },
  { accountNumber: '78', label: 'Transferts de charges', classNumber: 7 },
  { accountNumber: '79', label: 'Reprises de provisions et dépréciations', classNumber: 7 },

  { accountNumber: '81', label: 'Valeurs comptables des cessions d’immobilisations', classNumber: 8 },
  { accountNumber: '82', label: 'Produits des cessions d’immobilisations', classNumber: 8 },
  { accountNumber: '83', label: 'Charges hors activités ordinaires', classNumber: 8 },
  { accountNumber: '84', label: 'Produits hors activités ordinaires', classNumber: 8 },
  { accountNumber: '85', label: 'Dotations hors activités ordinaires', classNumber: 8 },
  { accountNumber: '86', label: 'Reprises hors activités ordinaires', classNumber: 8 },
  { accountNumber: '87', label: 'Participation des travailleurs', classNumber: 8 },
  { accountNumber: '89', label: 'Impôts sur le résultat', classNumber: 8 },
] as const satisfies readonly SYSCOHADAAccount[];

export const ACCOUNT_CATALOG_COUNT = 100;

export function getAccountClassCount(classNumber: AccountClassNumber): number {
  return SYSCOHADA_ACCOUNTS.filter((account) => account.classNumber === classNumber).length;
}
