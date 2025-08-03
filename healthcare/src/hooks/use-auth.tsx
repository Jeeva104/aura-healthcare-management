
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
import { User } from '@/lib/types';
// import { getCurrentUser } from '@/services/auth';

// --- MOCK IMPLEMENTATION ---
// This is a mock implementation to bypass Firebase Auth for UI development.

interface AuthContextType {
    user: User | null;
    firebaseUser: any | null; // Using 'any' for mock firebase user
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    firebaseUser: null,
    loading: true,
});

const mockUser: User = {
    id: 'mock-user-id',
    email: 'mock@example.com',
    fullName: 'Mock User',
    role: 'patient',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In this mock setup, we can simulate a logged-in user.
        // Or we can leave it null and let the login page handle redirection.
        // For dashboard components that rely on the hook, we can provide a mock user.
        const path = window.location.pathname;
        if (path.includes('/dashboard')) {
            setUser(mockUser); // Provide a mock user for dashboard views
            setFirebaseUser({ uid: 'mock-firebase-uid' });
        }
        setLoading(false);
        
    }, []);

    return (
        <AuthContext.Provider value={{ user, firebaseUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
