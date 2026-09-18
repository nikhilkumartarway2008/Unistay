import { PropertyItem, CostItem, TrustItem, ReviewItem } from './types';

export const PLACEHOLDER_PROPERTIES: PropertyItem[] = [
  {
    id: 'ranchi-1',
    name: 'Birla Scholar\'s Inn & PG',
    location: 'Mahilong, Ranchi (0.3 km from Sarala Birla University)',
    matchPercentage: '99% Match',
    rent: '₹7,500 / mo',
    rentNumeric: 7500,
    distance: '0.3 km',
    distanceKm: 0.3,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'Power Backup', 'Mess Food (3 Meals)', 'Study Table', 'Secure Parking', 'Washing Machine'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Double Sharing with Mess', rent: 7500, capacity: '2 Persons', description: 'Popular student PG right outside university gates with home-style meals.' },
      { name: 'Single Private Room', rent: 11000, capacity: '1 Person', description: 'Quiet private room with dedicated desk and attached bathroom.' }
    ],
    studyScore: '9.6 / 10',
    privacyScore: '8.9 / 10',
    foodAvailable: true
  },
  {
    id: 'ranchi-2',
    name: 'Greenwood Student Co-Living Ranchi',
    location: 'Namkum Bypass Road, Ranchi (1.2 km from Sarala Birla University)',
    matchPercentage: '97% Match',
    rent: '₹9,000 / mo',
    rentNumeric: 9000,
    distance: '1.2 km',
    distanceKm: 1.2,
    category: 'Shared',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Power Backup', 'Attached Bathroom', 'Rooftop Terrace', 'Security 24/7'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Twin Sharing Co-Living', rent: 9000, capacity: '2 Persons', description: 'Modern co-living residence with high-speed internet and student lounge.' }
    ],
    studyScore: '9.3 / 10',
    privacyScore: '9.0 / 10',
    foodAvailable: true
  },
  {
    id: 'ranchi-3',
    name: 'Mahilong Academic Residency',
    location: 'Near NH-33, Mahilong, Ranchi (0.5 km from Sarala Birla University)',
    matchPercentage: '95% Match',
    rent: '₹6,500 / mo',
    rentNumeric: 6500,
    distance: '0.5 km',
    distanceKm: 0.5,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['Wi-Fi', 'Mess Food', 'Power Backup', 'Water Purifier', 'Bicycle Parking'],
    roomType: 'Triple Sharing',
    roomTypes: [
      { name: 'Budget Triple Sharing', rent: 6500, capacity: '3 Persons', description: 'Affordable and friendly student hostel with reliable electricity and water.' }
    ],
    studyScore: '8.8 / 10',
    privacyScore: '7.9 / 10',
    foodAvailable: true
  },
  {
    id: 'ranchi-4',
    name: 'Sunrise Student Villa',
    location: 'Namkum Market, Ranchi (2.0 km from Sarala Birla University)',
    matchPercentage: '92% Match',
    rent: '₹12,000 / mo',
    rentNumeric: 12000,
    distance: '2.0 km',
    distanceKm: 2.0,
    category: 'Flat',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Independent Kitchen', 'Balcony', 'Power Backup', 'Car Parking', 'Wi-Fi'],
    roomType: '1BHK Flat',
    roomTypes: [
      { name: '1BHK Furnished Apartment', rent: 12000, capacity: '1-2 Persons', description: 'Independent 1BHK apartment suitable for senior or graduate students.' }
    ],
    studyScore: '9.4 / 10',
    privacyScore: '9.8 / 10',
    foodAvailable: false
  },
  {
    id: 'ranchi-5',
    name: 'Campus Edge PG for Boys & Girls',
    location: 'Mahilong Chowk, Ranchi (0.6 km from Sarala Birla University)',
    matchPercentage: '96% Match',
    rent: '₹8,000 / mo',
    rentNumeric: 8000,
    distance: '0.6 km',
    distanceKm: 0.6,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC Rooms Available', 'Mess Food', 'CCTV Security', 'Laundry Service'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'AC Double Sharing', rent: 9500, capacity: '2 Persons', description: 'Air-conditioned twin sharing with attached washroom.' },
      { name: 'Standard Double Sharing', rent: 8000, capacity: '2 Persons', description: 'Comfortable twin sharing with nutritious meals included.' }
    ],
    studyScore: '9.1 / 10',
    privacyScore: '8.4 / 10',
    foodAvailable: true
  },
  {
    id: 'ranchi-6',
    name: 'Royal Heritage Student Hostel',
    location: 'Purulia Road, Ranchi (3.5 km from Sarala Birla University)',
    matchPercentage: '89% Match',
    rent: '₹7,000 / mo',
    rentNumeric: 7000,
    distance: '3.5 km',
    distanceKm: 3.5,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Security Guard', 'Mess', 'Hot Water', 'Study Room'],
    roomType: 'Triple Sharing',
    roomTypes: [
      { name: 'Triple Sharing Room', rent: 7000, capacity: '3 Persons', description: 'Traditional student hostel with easy transit access to university.' }
    ],
    studyScore: '8.5 / 10',
    privacyScore: '7.8 / 10',
    foodAvailable: true
  },
  {
    id: 'ranchi-7',
    name: 'Apex Student Hub Mahilong',
    location: 'Mahilong Main Road, Ranchi (0.4 km from Sarala Birla University)',
    matchPercentage: '98% Match',
    rent: '₹10,500 / mo',
    rentNumeric: 10500,
    distance: '0.4 km',
    distanceKm: 0.4,
    category: 'Near Campus',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Attached Bath', 'Power Backup 24/7', 'Gym & Recreation'],
    roomType: 'Single Private Room',
    roomTypes: [
      { name: 'Executive Single Room', rent: 10500, capacity: '1 Person', description: 'Fully private single room with modern amenities and high-speed fiber internet.' }
    ],
    studyScore: '9.7 / 10',
    privacyScore: '9.3 / 10',
    foodAvailable: true
  },
  {
    id: 'ranchi-8',
    name: 'Balaji Student Niwas',
    location: 'Namkum, Ranchi (1.5 km from Sarala Birla University)',
    matchPercentage: '91% Match',
    rent: '₹6,000 / mo',
    rentNumeric: 6000,
    distance: '1.5 km',
    distanceKm: 1.5,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Homemade Food', 'RO Drinking Water', 'Secure Compound'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Twin Sharing Budget', rent: 6000, capacity: '2 Persons', description: 'Pocket-friendly student stay with home-style meals and quiet environment.' }
    ],
    studyScore: '8.6 / 10',
    privacyScore: '8.0 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-1',
    name: 'Zenith Student Living Hub',
    location: 'Koramangala 4th Block, Bengaluru (0.4 km from Christ University)',
    matchPercentage: '98% Match',
    rent: '₹14,500 / mo',
    rentNumeric: 14500,
    distance: '0.4 km',
    distanceKm: 0.4,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Power Backup', 'Attached Bathroom', 'Laundry', 'Study Table', 'Security 24/7', 'Housekeeping'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Single Private Room', rent: 22000, capacity: '1 Person', description: 'Fully furnished private room with balcony and study desk.' },
      { name: 'Double Sharing', rent: 14500, capacity: '2 Persons', description: 'Spacious twin sharing with individual beds and wardrobes.' },
      { name: 'Triple Sharing', rent: 10500, capacity: '3 Persons', description: 'Budget friendly triple sharing with en-suite bath.' }
    ],
    studyScore: '9.4 / 10',
    privacyScore: '8.8 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-2',
    name: 'Scholar\'s Den Luxury PG',
    location: 'Indiranagar Double Road, Bengaluru (1.2 km from Mount Carmel)',
    matchPercentage: '95% Match',
    rent: '₹18,000 / mo',
    rentNumeric: 18000,
    distance: '1.2 km',
    distanceKm: 1.2,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Attached Bathroom', 'Power Backup', 'Gym & Recreation', 'Parking'],
    roomType: 'Single Private Room',
    roomTypes: [
      { name: 'Executive Single', rent: 18000, capacity: '1 Person', description: 'Premium single room with attached bath and high-speed Wi-Fi.' }
    ],
    studyScore: '9.0 / 10',
    privacyScore: '9.5 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-3',
    name: 'Campus Vista Co-Living',
    location: 'Hebbal Near Main Gate, Bengaluru (0.8 km from IISc)',
    matchPercentage: '92% Match',
    rent: '₹12,500 / mo',
    rentNumeric: 12500,
    distance: '0.8 km',
    distanceKm: 0.8,
    category: 'Shared',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['Wi-Fi', 'Power Backup', 'Laundry', 'Housekeeping', 'Study Lounge'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Co-Living Double', rent: 12500, capacity: '2 Persons', description: 'Modern co-living space with shared study area and community kitchen.' }
    ],
    studyScore: '9.2 / 10',
    privacyScore: '8.0 / 10',
    foodAvailable: false
  },
  {
    id: 'prop-4',
    name: 'Academic Heights Studio Apartment',
    location: 'Jayanagar 9th Block, Bengaluru (1.5 km from Christ University)',
    matchPercentage: '90% Match',
    rent: '₹24,000 / mo',
    rentNumeric: 24000,
    distance: '1.5 km',
    distanceKm: 1.5,
    category: 'Flat',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Independent Kitchen', 'AC', 'Wi-Fi', 'Washing Machine', 'Balcony', 'Parking'],
    roomType: '1BHK Studio',
    roomTypes: [
      { name: 'Fully Furnished 1BHK', rent: 24000, capacity: '1-2 Persons', description: 'Completely independent studio apartment with kitchen and balcony.' }
    ],
    studyScore: '9.5 / 10',
    privacyScore: '9.9 / 10',
    foodAvailable: false
  },
  {
    id: 'prop-5',
    name: 'Serene Grove Student PG',
    location: 'BTM Layout Stage 2, Bengaluru (0.6 km from St. Joseph\'s)',
    matchPercentage: '89% Match',
    rent: '₹11,000 / mo',
    rentNumeric: 11000,
    distance: '0.6 km',
    distanceKm: 0.6,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Food (3 Meals)', 'Power Backup', 'Laundry', 'Security'],
    roomType: 'Triple Sharing',
    roomTypes: [
      { name: 'Triple Room with Meals', rent: 11000, capacity: '3 Persons', description: 'Affordable stay including 3 home-cooked meals daily.' }
    ],
    studyScore: '8.4 / 10',
    privacyScore: '7.5 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-6',
    name: 'Nova Student Residence',
    location: 'Koramangala 5th Block, Bengaluru (0.3 km from NMIMS)',
    matchPercentage: '97% Match',
    rent: '₹16,500 / mo',
    rentNumeric: 16500,
    distance: '0.3 km',
    distanceKm: 0.3,
    category: 'Near Campus',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Attached Bath', 'Rooftop Cafeteria', 'Power Backup'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Deluxe Twin Sharing', rent: 16500, capacity: '2 Persons', description: 'Top tier student residence right next to campus.' }
    ],
    studyScore: '9.6 / 10',
    privacyScore: '8.9 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-7',
    name: 'Pacific Student Suites',
    location: 'Vasant Vihar, Delhi (0.7 km from Delhi University North)',
    matchPercentage: '94% Match',
    rent: '₹15,000 / mo',
    rentNumeric: 15000,
    distance: '0.7 km',
    distanceKm: 0.7,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'AC', 'Meals Included', 'Housekeeping', 'Security'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Standard Twin', rent: 15000, capacity: '2 Persons', description: 'Quiet environment with dedicated study halls.' }
    ],
    studyScore: '9.1 / 10',
    privacyScore: '8.5 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-8',
    name: 'Apex Scholars Haven',
    location: 'North Campus, Delhi (0.5 km from Miranda House)',
    matchPercentage: '91% Match',
    rent: '₹13,000 / mo',
    rentNumeric: 13000,
    distance: '0.5 km',
    distanceKm: 0.5,
    category: 'Near Campus',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Power Backup', 'Library Lounge', 'Laundry'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Scholar Twin Room', rent: 13000, capacity: '2 Persons', description: 'Walking distance to colleges with excellent study vibes.' }
    ],
    studyScore: '9.3 / 10',
    privacyScore: '8.2 / 10',
    foodAvailable: false
  },
  {
    id: 'prop-9',
    name: 'Greenwood Student Co-Living',
    location: 'Powai, Mumbai (0.9 km from IIT Bombay)',
    matchPercentage: '96% Match',
    rent: '₹21,000 / mo',
    rentNumeric: 21000,
    distance: '0.9 km',
    distanceKm: 0.9,
    category: 'Shared',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Gym', 'Swimming Pool', 'Housekeeping', 'Power Backup'],
    roomType: 'Single Private Room',
    roomTypes: [
      { name: 'Private Room in 3BHK', rent: 21000, capacity: '1 Person', description: 'Premium lakeside co-living apartment near IIT Bombay.' }
    ],
    studyScore: '9.7 / 10',
    privacyScore: '9.2 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-10',
    name: 'Metro Scholastic Rooms',
    location: 'Andheri West, Mumbai (1.1 km from NMIMS Mumbai)',
    matchPercentage: '88% Match',
    rent: '₹19,500 / mo',
    rentNumeric: 19500,
    distance: '1.1 km',
    distanceKm: 1.1,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'AC', 'Attached Bath', 'Security', 'Lift Access'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'AC Twin Room', rent: 19500, capacity: '2 Persons', description: 'Conveniently located near transit and universities.' }
    ],
    studyScore: '8.8 / 10',
    privacyScore: '8.4 / 10',
    foodAvailable: false
  },
  {
    id: 'prop-11',
    name: 'Harmony Student Villa',
    location: 'Kothrud, Pune (0.4 km from COEP Pune)',
    matchPercentage: '93% Match',
    rent: '₹13,500 / mo',
    rentNumeric: 13500,
    distance: '0.4 km',
    distanceKm: 0.4,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Mess Food', 'Power Backup', 'Study Desks', 'Laundry'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Standard Twin Sharing', rent: 13500, capacity: '2 Persons', description: 'Calm residential villa converted for student living.' }
    ],
    studyScore: '9.0 / 10',
    privacyScore: '8.6 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-12',
    name: 'Symphony Campus Stay',
    location: 'Viman Nagar, Pune (0.6 km from Symbiosis Pune)',
    matchPercentage: '95% Match',
    rent: '₹16,000 / mo',
    rentNumeric: 16000,
    distance: '0.6 km',
    distanceKm: 0.6,
    category: 'Near Campus',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Attached Bath', 'Gym', 'Cafeteria'],
    roomType: 'Single Private Room',
    roomTypes: [
      { name: 'Single Suite', rent: 16000, capacity: '1 Person', description: 'Modern private room with excellent ventilation and study setup.' }
    ],
    studyScore: '9.4 / 10',
    privacyScore: '9.1 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-13',
    name: 'Horizon Student Apartments',
    location: 'Gachibowli, Hyderabad (0.8 km from IIIT Hyderabad)',
    matchPercentage: '94% Match',
    rent: '₹17,000 / mo',
    rentNumeric: 17000,
    distance: '0.8 km',
    distanceKm: 0.8,
    category: 'Flat',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'AC', 'Kitchenette', 'Washing Machine', 'Security 24/7'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Shared Apartment Twin', rent: 17000, capacity: '2 Persons', description: 'Spacious apartment style living near tech and university hubs.' }
    ],
    studyScore: '9.2 / 10',
    privacyScore: '8.8 / 10',
    foodAvailable: false
  },
  {
    id: 'prop-14',
    name: 'Beacon Scholar Residency',
    location: 'Madhapur, Hyderabad (1.0 km from ISB Hyderabad)',
    matchPercentage: '91% Match',
    rent: '₹15,500 / mo',
    rentNumeric: 15500,
    distance: '1.0 km',
    distanceKm: 1.0,
    category: 'PG / Hostel',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: false,
    amenitiesList: ['Wi-Fi', 'Power Backup', 'Housekeeping', 'Meals', 'Study Room'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Twin Sharing Deluxe', rent: 15500, capacity: '2 Persons', description: 'Premium professional-grade student housing.' }
    ],
    studyScore: '9.1 / 10',
    privacyScore: '8.5 / 10',
    foodAvailable: true
  },
  {
    id: 'prop-15',
    name: 'Elite Campus Living',
    location: 'Electronic City Phase 1, Bengaluru (0.5 km from IIIT Bangalore)',
    matchPercentage: '98% Match',
    rent: '₹14,000 / mo',
    rentNumeric: 14000,
    distance: '0.5 km',
    distanceKm: 0.5,
    category: 'Near Campus',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    verified: true,
    saved: true,
    amenitiesList: ['High-speed Wi-Fi', 'AC', 'Attached Bathroom', 'Power Backup', 'Gym', 'Laundry'],
    roomType: 'Double Sharing',
    roomTypes: [
      { name: 'Elite Twin Room', rent: 14000, capacity: '2 Persons', description: 'State-of-the-art student residence with high-speed fiber internet and study pods.' }
    ],
    studyScore: '9.8 / 10',
    privacyScore: '9.0 / 10',
    foodAvailable: true
  }
];

export const PLACEHOLDER_COSTS: CostItem[] = [
  { category: 'Rent', amount: '₹14,500', description: 'Base monthly accommodation fee' },
  { category: 'Food', amount: '₹3,500', description: 'Mess / dining / meal plans' },
  { category: 'Electricity', amount: '₹800', description: 'Metered consumption & AC charges' },
  { category: 'Transport', amount: '₹600', description: 'University commute & transit' },
  { category: 'Laundry', amount: '₹400', description: 'Wash & fold / self-service' },
  { category: 'Maintenance', amount: '₹300', description: 'Upkeep & common area fees' },
  { category: 'Other', amount: '₹500', description: 'Wi-Fi, miscellaneous supplies' }
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

export const PLACEHOLDER_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    role: 'B.Tech CSE, Christ University',
    date: 'August 2026',
    verifiedStay: true,
    scores: {
      cleanliness: '4.8 / 5',
      wifi: '4.9 / 5',
      food: '4.5 / 5',
      water: '5.0 / 5',
      ownerResponsiveness: '4.8 / 5',
      studyEnvironment: '4.9 / 5',
      privacy: '4.6 / 5'
    },
    comment: 'Exceptional stay! The high-speed fiber internet never drops, and the study room is super quiet for exams. Highly recommended for students.',
    stayDuration: '1 Year Stay'
  },
  {
    id: 'rev-2',
    author: 'Ananya Iyer',
    role: 'B.Com, Mount Carmel College',
    date: 'July 2026',
    verifiedStay: true,
    scores: {
      cleanliness: '4.7 / 5',
      wifi: '4.8 / 5',
      food: '4.6 / 5',
      water: '4.8 / 5',
      ownerResponsiveness: '4.9 / 5',
      studyEnvironment: '4.8 / 5',
      privacy: '4.7 / 5'
    },
    comment: 'Very secure and clean. The housekeeping is regular and management is very helpful with student requests.',
    stayDuration: '6 Months Stay'
  }
];


