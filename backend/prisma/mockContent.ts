const mockContent = [
  {
    name: 'Annual Partner Review Process',
    description:
      'Procedure to review partner performance and approve profit distributions.',
    contentType: 'procedure',
    workpaperType: ['taxPlanning', 'compliance'],
    entityType: ['partnership'],
    gettingStartedSteps:
      'Confirm active partners, import earnings data, and assign reviewers.',
    tags: ['partner', 'review', 'distribution'],
  },
  {
    name: 'Annual Partner Review Process',
    description:
      'Procedure to review partner performance and approve profit distributions.',
    contentType: 'procedure',
    workpaperType: ['taxPlanning', 'compliance'],
    entityType: ['partnership'],
    gettingStartedSteps:
      'Confirm active partners, import earnings data, and assign reviewers.',
    tags: ['partner', 'review', 'distribution'],
  },
  {
    name: 'Asset Disposal Summary Report',
    description:
      'Tracks asset sales, disposal dates, and calculates gains/losses.',
    contentType: 'report',
    workpaperType: ['taxPlanning', 'compliance'],
    entityType: ['company', 'partnership'],
    gettingStartedSteps:
      'List all disposals during the year and attach sale documentation.',
    tags: ['assets', 'capital gains', 'depreciation'],
  },
  {
    name: 'ATO Correspondence Tracker',
    description: 'Centralised log of all communication exchanged with the ATO.',
    contentType: 'report',
    workpaperType: ['compliance'],
    entityType: ['individual', 'trust', 'company'],
    gettingStartedSteps: 'Import ATO reference numbers and upload notices.',
    tags: ['ATO', 'correspondence', 'compliance'],
  },

  {
    name: 'Year-End Finalisation Checklist',
    description:
      'Checklist to ensure all year-end tasks are completed before closing the books.',
    contentType: 'checklist',
    workpaperType: ['compliance', 'itr'],
    entityType: ['company', 'trust'],
    gettingStartedSteps:
      'Go through each task related to reconciliations, provisions, and filings.',
    tags: ['year-end', 'closing', 'compliance'],
  },
  {
    name: 'Payroll Compliance Checklist',
    description:
      'A checklist for verifying payroll obligations are met each period.',
    contentType: 'checklist',
    workpaperType: ['fbt', 'compliance'],
    entityType: ['company'],
    gettingStartedSteps:
      'Confirm payment cycles, super contributions, and lodgement schedules.',
    tags: ['payroll', 'compliance', 'fbt'],
  },

  {
    name: 'SMSF Contribution Limit Calculator',
    description:
      'Calculates concessional and non-concessional super contributions against limits.',
    contentType: 'calculation',
    workpaperType: ['compliance', 'taxPlanning'],
    entityType: ['individual'],
    gettingStartedSteps:
      'Enter contribution details and age to assess compliance with caps.',
    tags: ['super', 'SMSF', 'limits'],
  },

  {
    name: 'Depreciation Schedule Template',
    description:
      'Automates calculation of depreciation for assets over useful life.',
    contentType: 'calculation',
    workpaperType: ['compliance', 'itr'],
    entityType: ['company', 'partnership'],
    gettingStartedSteps:
      'List assets, acquisition dates, and methods (Diminishing or Prime Cost).',
    tags: ['depreciation', 'assets', 'tax'],
  },

  {
    name: 'Trust Distribution Basics',
    description:
      'Covers foundational principles and documentation requirements for trust distributions.',
    contentType: 'wiki',
    workpaperType: ['taxPlanning'],
    entityType: ['trust'],
    gettingStartedSteps:
      'Understand income attribution, resolutions, and timing obligations.',
    tags: ['trust', 'distribution', 'planning'],
  },

  {
    name: 'Capital Allowances Reference',
    description:
      'Summarises depreciation rules, effective life estimates, and instant asset write-off thresholds.',
    contentType: 'wiki',
    workpaperType: ['compliance'],
    entityType: ['company', 'partnership'],
    gettingStartedSteps:
      'Refer to this when classifying or reviewing fixed asset purchases.',
    tags: ['depreciation', 'assets', 'capital'],
  },
];

export default mockContent;
