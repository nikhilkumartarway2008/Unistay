import { PropertyItem, CostItem, TrustItem, ReviewItem } from './types';

export const PLACEHOLDER_PROPERTIES: PropertyItem[] = [];

export const PLACEHOLDER_COSTS: CostItem[] = [
  { category: 'Rent', amount: '₹—', description: 'Base monthly accommodation fee' },
  { category: 'Food', amount: '₹—', description: 'Mess / dining / meal plans' },
  { category: 'Electricity', amount: '₹—', description: 'Metered consumption & AC charges' },
  { category: 'Transport', amount: '₹—', description: 'University commute & transit' },
  { category: 'Laundry', amount: '₹—', description: 'Wash & fold / self-service' },
  { category: 'Maintenance', amount: '₹—', description: 'Upkeep & common area fees' },
  { category: 'Other', amount: '₹—', description: 'Wi-Fi, miscellaneous supplies' }
];

export const PLACEHOLDER_TRUST_ITEMS: TrustItem[] = [
  { category: 'Owner identity', verified: false, detail: 'Government ID & background verified' },
  { category: 'Property address', verified: false, detail: 'Geo-tagged & physical audit completed' },
  { category: 'Rent information', verified: false, detail: 'No hidden surge or undocumented fees' },
  { category: 'Amenities', verified: false, detail: 'Physical inspection of Wi-Fi, power backup & water' },
  { category: 'Photos', verified: false, detail: 'UniStay 360° unedited capture' },
  { category: 'Availability', verified: false, detail: 'Real-time room status confirmed' },
  { category: 'Student reviews', verified: false, detail: 'Cross-checked with university enrollment records' }
];

export const PLACEHOLDER_REVIEWS: ReviewItem[] = [];

