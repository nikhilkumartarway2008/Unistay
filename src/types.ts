export type UserRole = 'student' | 'owner' | 'university_admin' | 'admin';

export type ScreenType = 
  | 'welcome' 
  | 'role-selection'
  | 'dashboard' 
  | 'property-details' 
  | 'living-cost' 
  | 'life-preview' 
  | 'comparison' 
  | 'reviews' 
  | 'transparency' 
  | 'booking' 
  | 'ai-assistant'
  | 'explore'
  | 'map'
  | 'saved'
  | 'profile'
  | 'ai-onboarding'
  | 'ai-profile'
  | 'ai-matches'
  | 'ai-chat'
  | 'owner-dashboard'
  | 'owner-properties'
  | 'owner-add-property'
  | 'owner-enquiries'
  | 'owner-bookings'
  | 'owner-students'
  | 'owner-insights'
  | 'owner-trust-center'
  | 'owner-earnings'
  | 'owner-maintenance'
  | 'owner-reputation'
  | 'owner-settings'
  | 'owner-ai'
  | 'community'
  | 'roommate-match'
  | 'owner-feedback'
  // Phase 6 Full Ecosystem Screens
  | 'my-stay'
  | 'move-in-inspection'
  | 'maintenance-system'
  | 'owner-operations'
  | 'owner-rooms'
  | 'owner-tenants'
  | 'owner-payouts'
  | 'university-connect'
  | 'notifications-center'
  | 'admin-control-center'
  | 'help-center'
  | 'safety-center'
  | 'dispute-center'
  // Phase 7 Student Life OS Screens
  | 'student-life-home'
  | 'my-day'
  | 'city-intelligence'
  | 'student-map-2'
  | 'settlement-mode'
  | 'student-services'
  | 'student-budget'
  | 'campus-intelligence'
  | 'events-discovery'
  | 'clubs-communities'
  | 'shared-expenses'
  | 'food-intelligence'
  | 'study-intelligence'
  | 'transport-intelligence'
  | 'copilot'
  // Phase 9 Multi-City & Partner Network Screens
  | 'multi-city-home'
  | 'city-intelligence-hub'
  | 'university-network'
  | 'partner-directory'
  | 'moving-city'
  | 'ecosystem-admin'
  // Phase 10 Super-Platform Master Screen
  | 'super-platform-overview'
  | 'login'
  | 'signup';

export interface CityItem {
  id: string;
  name: string;
  state: string;
  country: string;
  popularAreas: string[];
  universitiesCount: number;
  propertiesCount: number;
  averageRent: number;
  description: string;
  image: string;
}

export interface UniversityItem {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  campusLocation: string;
  verifiedPartner: boolean;
  studentsCount: string;
  accommodationResources: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  type: 'University' | 'Accommodation' | 'Service' | 'Moving' | 'Internet' | 'Food' | 'Student Organization';
  city: string;
  verificationStatus: 'Verified' | 'Pending' | 'Needs Review';
  rating: number;
  reviewsCount: number;
  description: string;
}


export type ImportanceLevel = 'low' | 'medium' | 'high' | 'essential';

export interface ExpenseItem {
  id: string;
  category: string;
  title: string;
  amount: number;
  date: string;
  isRecurring?: boolean;
  type?: 'Fixed' | 'Variable';
}

export interface StudentPreferences {
  university: string;
  city: string;
  locality: string;
  moveInDate: string;
  maxBudget: number;
  comfortableBudget: number;
  moveInBudget: number;
  accommodationType: string[];
  roomType: string;
  maxDistanceKm: number;
  maxTravelTimeMin: number;
  transportPreference: string;
  studyEnvironment: ImportanceLevel;
  privacyPreference: ImportanceLevel;
  socialEnvironment: ImportanceLevel;
  foodPreference: string;
  amenities: {
    wifi: ImportanceLevel;
    ac: ImportanceLevel;
    washingMachine: ImportanceLevel;
    attachedBathroom: ImportanceLevel;
    studyTable: ImportanceLevel;
    powerBackup: ImportanceLevel;
    parking: ImportanceLevel;
    security: ImportanceLevel;
    laundry: ImportanceLevel;
    housekeeping: ImportanceLevel;
  };
}

export interface MatchProfile {
  propertyId: string;
  score: number;
  category: 'Good Match' | 'Potential Match' | 'Needs More Information';
  explanation: string[];
  breakdown: {
    budget: boolean | 'partial';
    distance: boolean | 'partial';
    wifi: boolean | 'partial';
    studyEnvironment: boolean | 'partial';
    privacy: boolean | 'partial';
    food: boolean | 'partial';
  };
  estimatedTotalCost: number;
  commuteTime: string;
}

export interface PropertyItem {
  id: string;
  name: string;
  location: string;
  matchPercentage: string;
  rent: string;
  distance: string;
  category: 'PG / Hostel' | 'Flat' | 'Shared' | 'Near Campus';
  image: string;
  images?: string[];
  verified: boolean;
  saved: boolean;
  // Enhanced attributes for Phase 3 matching
  rentNumeric?: number;
  distanceKm?: number;
  amenitiesList?: string[];
  roomType?: string;
  roomTypes?: Array<{ name: string; rent: number; capacity: string; description?: string }>;
  studyScore?: string;
  privacyScore?: string;
  foodAvailable?: boolean;
  ownerId?: string;
}

export interface CostItem {
  category: string;
  amount: string;
  description: string;
}

export interface TrustItem {
  category: string;
  verified: boolean;
  detail: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  date: string;
  verifiedStay: boolean;
  scores: {
    cleanliness: string;
    wifi: string;
    food: string;
    water: string;
    ownerResponsiveness: string;
    studyEnvironment: string;
    privacy: string;
  };
  comment: string;
  stayDuration?: string;
  ownerResponse?: string;
}

export interface RoommateProfile {
  id: string;
  name: string;
  university: string;
  studySchedule: string;
  sleepSchedule: string;
  noisePreference: string;
  cleanliness: string;
  budget: string;
  compatibilityScore: number;
  bio: string;
  verified: boolean;
}

export interface CommunityPostItem {
  id: string;
  author: string;
  role: string;
  category: string;
  title: string;
  content: string;
  time: string;
  repliesCount: number;
  likesCount: number;
}

export interface RoomInventory {
  id: string;
  roomType: string;
  total: number;
  available: number;
  occupied: number;
  pricePerMonth: number;
  description: string;
}

export interface BookingRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  location: string;
  roomType: string;
  moveInDate: string;
  duration: string;
  monthlyRent: number;
  securityDeposit: number;
  platformFee: number;
  totalPayableNow: number;
  status: 'REQUESTED' | 'PENDING_OWNER' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus: 'Pending' | 'Successful' | 'Refunded';
  agreementStatus: 'Draft' | 'Student Accepted' | 'Completed';
  createdAt: string;
}

export interface PaymentReceipt {
  id: string;
  bookingId: string;
  transactionId: string;
  amount: number;
  date: string;
  property: string;
  studentName: string;
  status: 'Successful' | 'Pending' | 'Refunded' | 'Failed';
  type: 'Booking & Deposit' | 'Monthly Rent' | 'Service Fee';
}

export interface RentalAgreement {
  id: string;
  bookingId: string;
  propertyName: string;
  studentName: string;
  ownerName: string;
  rent: number;
  deposit: number;
  duration: string;
  rules: string[];
  noticePeriod: string;
  status: 'Draft' | 'Sent to Student' | 'Student Accepted' | 'Owner Accepted' | 'Completed';
  signatureDate?: string;
}

export interface MaintenanceRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  category: 'Electricity' | 'Water' | 'Wi-Fi' | 'Plumbing' | 'Furniture' | 'Cleaning' | 'Appliance' | 'Other';
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Submitted' | 'Acknowledged' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';
  reportedTime: string;
  studentName: string;
}

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  category: 'Booking' | 'Payment' | 'Agreement' | 'Maintenance' | 'Messages' | 'Community' | 'System';
  time: string;
  read: boolean;
}

export interface AuditLogRecord {
  id: string;
  adminName: string;
  action: string;
  target: string;
  reason: string;
  timestamp: string;
  previousState: string;
  newState: string;
}

// Phase 8 AI Agent & Predictive Intelligence Types
export interface AgentMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
  suggestedActions?: {
    id: string;
    label: string;
    actionType: string;
    payload?: any;
    requiresConfirmation?: boolean;
  }[];
  isPlan?: boolean;
  planSteps?: {
    id: string;
    stepNumber: number;
    title: string;
    status: 'pending' | 'approved' | 'completed' | 'skipped';
  }[];
}

export interface SmartTask {
  id: string;
  userId: string;
  source: 'Booking' | 'Move-in' | 'Agreement' | 'Maintenance' | 'Rent' | 'University' | 'Events' | 'Services' | 'User';
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'To do' | 'In progress' | 'Completed' | 'Cancelled';
  dueAt: string;
  createdAt: string;
}

export interface SmartNotification {
  id: string;
  userId: string;
  eventType: string;
  priority: 'Critical' | 'Important' | 'Useful' | 'Optional';
  title: string;
  content: string;
  status: 'unread' | 'read' | 'dismissed';
  createdAt: string;
}

export interface UserAiPreferences {
  personalizationLevel: 'Personalized' | 'Limited' | 'Off';
  notificationPreferences: {
    rentReminders: boolean;
    maintenanceAlerts: boolean;
    eventAlerts: boolean;
    priceWatchers: boolean;
    quietMode: boolean;
  };
  memoryPreferences: {
    preferredBudget: number;
    preferredCommuteKm: number;
    accommodationTypes: string[];
    importantAmenities: string[];
  };
}

export interface PropertyWatcher {
  id: string;
  userId: string;
  propertyId: string;
  propertyName: string;
  previousPrice?: number;
  currentPrice: number;
  priceChangedDate?: string;
  trustUpdated?: boolean;
  newReviewAvailable?: boolean;
  createdAt: string;
}

export interface AgentConfirmationModalState {
  isOpen: boolean;
  title: string;
  description: string;
  impactLevel: 'Low' | 'Medium' | 'High';
  previewDetails: { label: string; value: string }[];
  onConfirm: () => void;
  onCancel: () => void;
}


