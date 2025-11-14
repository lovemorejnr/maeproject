import type { DocumentVaultData } from '../types';

export const DOCUMENT_VAULT_DATA: DocumentVaultData = {
  kpis: {
    total: 7,
    totalSize: '29.5',
    active: 6,
    archived: 1,
    storageUsed: 29.5,
    storageLimit: 1,
  },
  insights: {
    expiring: {
      title: 'Expiring Documents',
      description: '8 vehicle registrations expire within 30 days. Immediate renewal required.',
    },
    compliance: {
      title: 'Compliance Score',
      description: '94% of required documents are up-to-date. Excellent compliance rating.',
    },
    security: {
      title: 'Security Scan',
      description: 'All documents encrypted and secure. No security issues detected.',
    },
  },
  documents: [
    {
      name: 'Toyota_Camry_2024_Registration.pdf',
      size: '2.4 MB',
      tags: ['Legal', 'Active'],
      type: 'Vehicle Registration',
      description: 'Official vehicle registration document',
    },
    {
      name: 'Honda_Accord_2023_Insurance.pdf',
      size: '1.8 MB',
      tags: ['Insurance', 'Active'],
      type: 'Insurance Certificate',
      description: 'Comprehensive insurance certificate',
    },
    {
      name: 'Mercedes_C_Class_2024_Invoice.pdf',
      size: '3.2 MB',
      tags: ['Financial', 'Active'],
      type: 'Purchase Invoice',
      description: 'Original purchase invoice from supplier',
    },
  ],
};
