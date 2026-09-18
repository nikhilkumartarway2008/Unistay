import React, { useState } from 'react';
import { ScreenType, UserRole, PropertyItem, StudentPreferences } from './types';
import { PLACEHOLDER_PROPERTIES } from './data';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { PropertyDetailsScreen } from './components/PropertyDetailsScreen';
import { LivingCostScreen } from './components/LivingCostScreen';
import { LifePreviewScreen } from './components/LifePreviewScreen';
import { ComparisonScreen } from './components/ComparisonScreen';
import { ReviewsScreen } from './components/ReviewsScreen';
import { TransparencyScreen } from './components/TransparencyScreen';
import { BookingScreen } from './components/BookingScreen';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ExploreScreen } from './components/ExploreScreen';
import { MapScreen } from './components/MapScreen';
import { SavedScreen } from './components/SavedScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BookingRecord } from './types';

// Phase 3 AI Screens
import { AiOnboardingScreen } from './components/AiOnboardingScreen';
import { AiMatchesScreen } from './components/AiMatchesScreen';
import { OwnerAiScreen } from './components/OwnerAiScreen';

// Owner Screens
import { OwnerDashboardScreen } from './components/OwnerDashboardScreen';
import { OwnerAddPropertyScreen } from './components/OwnerAddPropertyScreen';
import { OwnerWorkspace } from './components/OwnerWorkspace';
import { useAuth } from './context/AuthContext';

// Phase 5 Screens
import { CommunityScreen } from './components/CommunityScreen';
import { RoommateScreen } from './components/RoommateScreen';
import { OwnerFeedbackScreen } from './components/OwnerFeedbackScreen';

// Phase 6 Full Ecosystem Screens
import { MyStayScreen } from './components/MyStayScreen';
import { MoveInInspectionScreen } from './components/MoveInInspectionScreen';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { OwnerOperationsScreen } from './components/OwnerOperationsScreen';
import { UniversityConnectScreen } from './components/UniversityConnectScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { AdminControlCenterScreen } from './components/AdminControlCenterScreen';
import { HelpSafetyScreen } from './components/HelpSafetyScreen';

// Phase 7 Student Life OS Screens
import { StudentLifeHome } from './components/StudentLifeHome';
import { MyDayScreen } from './components/MyDayScreen';
import { CityIntelligenceScreen } from './components/CityIntelligenceScreen';
import { StudentMap2Screen } from './components/StudentMap2Screen';
import { SettlementModeScreen } from './components/SettlementModeScreen';
import { StudentServicesScreen } from './components/StudentServicesScreen';
import { StudentBudgetScreen } from './components/StudentBudgetScreen';
import { CampusIntelligenceScreen } from './components/CampusIntelligenceScreen';
import { SharedExpensesScreen } from './components/SharedExpensesScreen';
import { CopilotScreen } from './components/CopilotScreen';
import { ActionCenterScreen } from './components/ActionCenterScreen';
import { SmartTasksScreen } from './components/SmartTasksScreen';
import { DecisionSupportScreen } from './components/DecisionSupportScreen';

// Phase 9 Multi-City & Partner Network Screens
import { MultiCityHomeScreen } from './components/MultiCityHomeScreen';
import { CityIntelligenceHubScreen } from './components/CityIntelligenceHubScreen';
import { UniversityNetworkScreen } from './components/UniversityNetworkScreen';
import { PartnerDirectoryScreen } from './components/PartnerDirectoryScreen';
import { MovingCityScreen } from './components/MovingCityScreen';
// Phase 10 Super-Platform Master Screen
import { SuperPlatformOverview } from './components/SuperPlatformOverview';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { ExpenseItem } from './types';

export default function App() {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentCity, setCurrentCity] = useState<string>('Bengaluru');
  const [properties, setProperties] = useState<PropertyItem[]>(PLACEHOLDER_PROPERTIES);

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [studentPreferences, setStudentPreferences] = useState<StudentPreferences | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProperty = (prop: PropertyItem) => {
    setProperties(prev => [prop, ...prev]);
  };

  const handleUpdateProperty = (updated: PropertyItem) => {
    setProperties(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleAddBooking = (booking: BookingRecord) => {
    setBookings(prev => [booking, ...prev]);
  };

  // ROLE-BASED AUTOMATIC ROUTING: If user is authenticated as OWNER, render professional OwnerWorkspace
  if (user && (user.role === 'OWNER' || user.role?.toLowerCase() === 'owner')) {
    return (
      <OwnerWorkspace 
        properties={properties}
        onAddProperty={handleAddProperty}
        onUpdateProperty={handleUpdateProperty}
        onDeleteProperty={handleDeleteProperty}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-zinc-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      <Navbar 
        currentScreen={currentScreen} 
        userRole={userRole}
        onNavigate={handleNavigate} 
        onOpenAi={() => setIsAiOpen(true)} 
      />

      <main className="transition-all duration-300">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onNavigate={() => handleNavigate('role-selection')} />
        )}
        {currentScreen === 'role-selection' && (
          <RoleSelectionScreen 
            onNavigate={handleNavigate} 
            onSelectRole={setUserRole} 
          />
        )}

        {/* Student Experience */}
        {currentScreen === 'dashboard' && (
          <DashboardScreen 
            onNavigate={handleNavigate} 
            onOpenAi={() => setIsAiOpen(true)} 
            onSelectProperty={setSelectedProperty}
            properties={properties}
            onUpdateProperty={handleUpdateProperty}
          />
        )}
        {currentScreen === 'property-details' && (
          <PropertyDetailsScreen 
            onNavigate={handleNavigate} 
            property={selectedProperty || properties[0] || {
              id: 'fallback',
              name: 'Sample Student Stay',
              location: 'University Campus',
              matchPercentage: '95% Match',
              rent: '₹14,000 / mo',
              distance: '0.5 km',
              category: 'PG / Hostel',
              image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
              verified: true,
              saved: false
            }} 
          />
        )}
        {currentScreen === 'living-cost' && (
          <LivingCostScreen 
            onNavigate={handleNavigate} 
            selectedProperty={selectedProperty}
          />
        )}
        {currentScreen === 'life-preview' && (
          <LifePreviewScreen 
            onNavigate={handleNavigate} 
            selectedProperty={selectedProperty}
          />
        )}
        {currentScreen === 'comparison' && (
          <ComparisonScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'reviews' && (
          <ReviewsScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'transparency' && (
          <TransparencyScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'booking' && (
          <BookingScreen 
            onNavigate={handleNavigate} 
            property={selectedProperty || properties[0] || null} 
            onAddBooking={handleAddBooking}
          />
        )}
        {currentScreen === 'explore' && (
          <ExploreScreen 
            onNavigate={handleNavigate} 
            onSelectProperty={setSelectedProperty}
            properties={properties}
            onUpdateProperty={handleUpdateProperty}
          />
        )}
        {currentScreen === 'map' && (
          <MapScreen 
            onNavigate={handleNavigate} 
            onSelectProperty={setSelectedProperty} 
          />
        )}
        {currentScreen === 'saved' && (
          <SavedScreen 
            onNavigate={handleNavigate} 
            onSelectProperty={setSelectedProperty} 
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen 
            onNavigate={handleNavigate} 
          />
        )}
        {currentScreen === 'ai-onboarding' && (
          <AiOnboardingScreen 
            onNavigate={handleNavigate}
            onSavePreferences={setStudentPreferences}
          />
        )}
        {currentScreen === 'ai-matches' && (
          <AiMatchesScreen 
            onNavigate={handleNavigate}
            properties={properties}
            preferences={studentPreferences}
            onSelectProperty={setSelectedProperty}
          />
        )}

        {/* Owner Experience */}
        {currentScreen === 'owner-dashboard' && (
          <OwnerDashboardScreen 
            onNavigate={handleNavigate}
            properties={properties}
            onDeleteProperty={handleDeleteProperty}
            onUpdateProperty={handleUpdateProperty}
            enquiries={enquiries}
          />
        )}
        {currentScreen === 'owner-ai' && (
          <OwnerAiScreen 
            onNavigate={handleNavigate}
            properties={properties}
          />
        )}
        {currentScreen === 'owner-properties' && (
          <OwnerDashboardScreen 
            onNavigate={handleNavigate}
            properties={properties}
            onDeleteProperty={handleDeleteProperty}
            onUpdateProperty={handleUpdateProperty}
            enquiries={enquiries}
          />
        )}
        {currentScreen === 'community' && (
          <CommunityScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'roommate-match' && (
          <RoommateScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'owner-feedback' && (
          <OwnerFeedbackScreen onNavigate={handleNavigate} properties={properties} />
        )}

        {/* Phase 6 Full Ecosystem Screens */}
        {currentScreen === 'my-stay' && (
          <MyStayScreen onNavigate={handleNavigate} bookings={bookings} />
        )}
        {currentScreen === 'move-in-inspection' && (
          <MoveInInspectionScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'maintenance-system' && (
          <MaintenanceScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'owner-operations' && (
          <OwnerOperationsScreen onNavigate={handleNavigate} properties={properties} />
        )}
        {currentScreen === 'university-connect' && (
          <UniversityConnectScreen onNavigate={handleNavigate} onSelectProperty={setSelectedProperty} />
        )}
        {currentScreen === 'notifications-center' && (
          <NotificationsScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'admin-control-center' && (
          <AdminControlCenterScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'help-center' && (
          <HelpSafetyScreen onNavigate={handleNavigate} mode="help" />
        )}
        {currentScreen === 'safety-center' && (
          <HelpSafetyScreen onNavigate={handleNavigate} mode="safety" />
        )}

        {/* Phase 7 Student Life OS Screens */}
        {currentScreen === 'student-life-home' && (
          <StudentLifeHome onNavigate={handleNavigate} bookings={bookings} expenses={expenses} />
        )}
        {currentScreen === 'my-day' && (
          <MyDayScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'city-intelligence' && (
          <CityIntelligenceScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'student-map-2' && (
          <StudentMap2Screen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'settlement-mode' && (
          <SettlementModeScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'student-services' && (
          <StudentServicesScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'student-budget' && (
          <StudentBudgetScreen onNavigate={handleNavigate} expenses={expenses} setExpenses={setExpenses} />
        )}
        {currentScreen === 'campus-intelligence' && (
          <CampusIntelligenceScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'shared-expenses' && (
          <SharedExpensesScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'copilot' && (
          <CopilotScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'action-center' && (
          <ActionCenterScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'smart-tasks' && (
          <SmartTasksScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'decision-support' && (
          <DecisionSupportScreen onNavigate={handleNavigate} selectedProperty={selectedProperty || undefined} />
        )}
        {currentScreen === 'multi-city-home' && (
          <MultiCityHomeScreen onNavigate={handleNavigate} currentCity={currentCity} onSelectCity={setCurrentCity} />
        )}
        {currentScreen === 'city-intelligence-hub' && (
          <CityIntelligenceHubScreen onNavigate={handleNavigate} currentCity={currentCity} />
        )}
        {currentScreen === 'university-network' && (
          <UniversityNetworkScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'partner-directory' && (
          <PartnerDirectoryScreen onNavigate={handleNavigate} />
        )}
        {currentScreen === 'moving-city' && (
          <MovingCityScreen onNavigate={handleNavigate} onSelectCity={setCurrentCity} />
        )}
        {currentScreen === 'super-platform-overview' && (
          <SuperPlatformOverview onNavigate={handleNavigate} currentCity={currentCity} />
        )}
        {currentScreen === 'login' && (
          <LoginScreen onNavigate={handleNavigate} setUserRole={setUserRole} />
        )}
        {currentScreen === 'signup' && (
          <SignupScreen onNavigate={handleNavigate} setUserRole={setUserRole} />
        )}



      </main>

      {currentScreen !== 'welcome' && currentScreen !== 'role-selection' && (
        <BottomNav 
          currentScreen={currentScreen} 
          userRole={userRole}
          onNavigate={handleNavigate} 
          onOpenAi={() => setIsAiOpen(true)} 
        />
      )}

      <AiAssistantModal 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        userRole={userRole}
      />
    </div>
  );
}
