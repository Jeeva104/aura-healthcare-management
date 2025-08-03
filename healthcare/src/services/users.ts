"use server";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { User } from '@/lib/types';

export async function findUserByAbhaId(abhaId: string): Promise<User | null> {
    // In a real scenario, ABHA ID would be a field in the user document.
    // Here we simulate it by treating the user's UID as the ABHA ID.
    const userDocRef = doc(db, 'users', abhaId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists() && userDoc.data().role === 'patient') {
        return userDoc.data() as User;
    }
    return null;
}
