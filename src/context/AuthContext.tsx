import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

export interface UserProfile {
  id: string;
  phoneNumber: string;
  role: 'STUDENT' | 'OWNER' | 'ADMIN';
  fullName: string;
  universityId?: string;
  cityId?: string;
  profilePhotoUrl?: string;
  bio?: string;
  phoneVerified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<UserProfile>;
  signup: (fullName: string, phoneNumber: string, password: string, role: 'STUDENT' | 'OWNER', universityId?: string, cityId?: string, securityQuestion?: string, securityAnswer?: string) => Promise<UserProfile>;
  loginWithGoogle: (role?: 'STUDENT' | 'OWNER') => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  savedProperties: string[];
  toggleSaveProperty: (propertyId: string) => Promise<void>;
  isPropertySaved: (propertyId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('unistay_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const parseResponseSafely = async (res: Response) => {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    } else {
      const text = await res.text();
      throw new Error(text && text.length < 100 ? text : `Server error (${res.status}): Please check backend configuration.`);
    }
  };

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('unistay_token');
    if (savedToken) {
      fetch('/api/auth/session', {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
        .then(async res => {
          if (res.ok) {
            const data = await parseResponseSafely(res);
            return data;
          }
          throw new Error('Session expired');
        })
        .then(data => {
          if (data && data.id) {
            setUser(data);
            setToken(savedToken);
            loadSavedProperties(savedToken);
          } else if (data && data.user) {
            setUser(data.user);
            setToken(savedToken);
            loadSavedProperties(savedToken);
          } else {
            localStorage.removeItem('unistay_token');
          }
        })
        .catch(() => {
          localStorage.removeItem('unistay_token');
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadSavedProperties = async (authToken: string) => {
    try {
      const res = await fetch('/api/properties/saved', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await parseResponseSafely(res);
        if (Array.isArray(data)) {
          setSavedProperties(data.map((item: any) => item.property_id));
        }
      }
    } catch (err) {
      console.error("Failed to load saved properties", err);
    }
  };

  const login = async (phoneNumber: string, password: string): Promise<UserProfile> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password })
    });
    const data = await parseResponseSafely(res);
    if (!res.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem('unistay_token', data.token);
    setToken(data.token);
    setUser(data.user);
    loadSavedProperties(data.token);
    return data.user;
  };

  const signup = async (fullName: string, phoneNumber: string, password: string, role: 'STUDENT' | 'OWNER', universityId?: string, cityId?: string, securityQuestion?: string, securityAnswer?: string): Promise<UserProfile> => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phoneNumber, password, role, universityId, cityId, securityQuestion, securityAnswer })
    });
    const data = await parseResponseSafely(res);
    if (!res.ok) throw new Error(data.error || 'Signup failed');

    localStorage.setItem('unistay_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const loginWithGoogle = async (role: 'STUDENT' | 'OWNER' = 'STUDENT'): Promise<UserProfile> => {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized.");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: googleUser.email,
        fullName: googleUser.displayName || googleUser.email?.split('@')[0],
        googleId: googleUser.uid,
        role
      })
    });
    const data = await parseResponseSafely(res);
    if (!res.ok) throw new Error(data.error || 'Google login failed');

    localStorage.setItem('unistay_token', data.token);
    setToken(data.token);
    setUser(data.user);
    loadSavedProperties(data.token);
    return data.user;
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error("Logout error", err);
      }
    }
    localStorage.removeItem('unistay_token');
    setToken(null);
    setUser(null);
    setSavedProperties([]);
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!token) return;
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    if (res.ok) {
      const updated = await res.json();
      setUser(prev => prev ? { ...prev, ...updated } : prev);
    }
  };

  const toggleSaveProperty = async (propertyId: string) => {
    if (!token) {
      alert("Please login to save properties to your permanent UniStay account.");
      return;
    }
    const isSaved = savedProperties.includes(propertyId);
    if (isSaved) {
      const res = await fetch(`/api/properties/saved/${propertyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedProperties(data.map((item: any) => item.property_id));
      }
    } else {
      const res = await fetch('/api/properties/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId })
      });
      if (res.ok) {
        const data = await res.json();
        setSavedProperties(data.map((item: any) => item.property_id));
      }
    }
  };

  const isPropertySaved = (propertyId: string) => savedProperties.includes(propertyId);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      loginWithGoogle,
      logout,
      updateProfile,
      savedProperties,
      toggleSaveProperty,
      isPropertySaved
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
