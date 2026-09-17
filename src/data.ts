import { PropertyItem, CostItem, TrustItem, ReviewItem } from './types';

export const PLACEHOLDER_PROPERTIES: PropertyItem[] = [
  {
    id: 'prop-1',
    name: 'Apex Student Residence',
    location: 'North Campus Gate · 0.8 km from University',
    matchPercentage: '95% Match',
    rent: '₹11,500 / mo',
    distance: '0.8 km',
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    verified: true,
    saved: true,
    rentNumeric: 11500,
    distanceKm: 0.8,
    amenitiesList: ['Wi-Fi', 'AC', 'Washing Machine', 'Attached Bathroom', 'Study Table', 'Power Backup', 'Security/CCTV', 'Laundry'],
    roomType: 'Private Room',
    studyScore: 'Quiet Environment',
    privacyScore: 'High Privacy',
    foodAvailable: true
  },
  {
    id: 'prop-2',
    name: 'Scholar Haven Living',
    location: 'Student Hub District · 1.4 km from University',
    matchPercentage: '88% Match',
    rent: '₹9,200 / mo',
    distance: '1.4 km',
    category: 'Shared',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    verified: true,
    saved: false,
    rentNumeric: 9200,
    distanceKm: 1.4,
    amenitiesList: ['Wi-Fi', 'Washing Machine', 'Study Table', 'Power Backup', 'Security/CCTV'],
    roomType: 'Shared Room',
    studyScore: 'Social & Collaborative',
    privacyScore: 'Medium',
    foodAvailable: true
  },
  {
    id: 'prop-3',
    name: 'Verdant Campus Flats',
    location: 'University Avenue · 0.4 km from University',
    matchPercentage: '92% Match',
    rent: '₹16,000 / mo',
    distance: '0.4 km',
    category: 'Flat',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    verified: true,
    saved: false,
    rentNumeric: 16000,
    distanceKm: 0.4,
    amenitiesList: ['Wi-Fi', 'AC', 'Washing Machine', 'Attached Bathroom', 'Study Table', 'Power Backup', 'Parking', 'Security/CCTV', 'Housekeeping'],
    roomType: 'Private Room',
    studyScore: 'Quiet Environment',
    privacyScore: 'High Privacy',
    foodAvailable: false
  },
  {
    id: 'prop-4',
    name: 'Metro Student Suites',
    location: 'Transit Plaza · 2.1 km from University',
    matchPercentage: '82% Match',
    rent: '₹8,500 / mo',
    distance: '2.1 km',
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    verified: true,
    saved: true,
    rentNumeric: 8500,
    distanceKm: 2.1,
    amenitiesList: ['Wi-Fi', 'Study Table', 'Power Backup', 'Security/CCTV', 'Laundry'],
    roomType: 'Shared Room',
    studyScore: 'Balanced',
    privacyScore: 'Medium',
    foodAvailable: true
  }
];

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
  { category: 'Owner identity', verified: true, detail: 'Government ID & background verified' },
  { category: 'Property address', verified: true, detail: 'Geo-tagged & physical audit completed' },
  { category: 'Rent information', verified: true, detail: 'No hidden surge or undocumented fees' },
  { category: 'Amenities', verified: true, detail: 'Physical inspection of Wi-Fi, power backup & water' },
  { category: 'Photos', verified: true, detail: 'UniStay 360° unedited capture' },
  { category: 'Availability', verified: true, detail: 'Real-time room status confirmed' },
  { category: 'Student reviews', verified: true, detail: 'Cross-checked with university enrollment records' }
];

export const PLACEHOLDER_REVIEWS: ReviewItem[] = [];
