
"use server";
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User, UserRole } from '@/lib/types';

interface RegisterParams {
    email: string;
    password: any;
    role: UserRole;
    fullName?: string;
    hospitalName?: string;
    place?: string;
}

export async function registerUser({ email, password, role, fullName, hospitalName, place }: RegisterParams) {
    
    if (!email) throw new Error("Email is required.");

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData: Partial<User> = {
        id: user.uid,
        email: user.email!,
        role: role,
    };

    if (role === 'hospital') {
        if (!hospitalName) throw new Error("Hospital name is required for hospital role.");
        if (!place) throw new Error("Place is required for hospital role.");
        userData.hospitalName = hospitalName;
        userData.fullName = hospitalName; 

        await setDoc(doc(db, "hospitalRegistrations", user.uid), {
            id: user.uid,
            name: hospitalName,
            email: email,
            place: place,
            requestDate: new Date().toISOString(),
            status: "Pending",
        });
    } else {
         if (!fullName) throw new Error("Full name is required.");
         userData.fullName = fullName;
    }

    await setDoc(doc(db, "users", user.uid), userData);

    return userData as User;
}

export async function loginUser(email: string, password: any): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
        throw new Error("User data not found.");
    }

    const userData = userDoc.data() as User;
    
    if (userData.role === 'hospital') {
        const hospitalRegDoc = await getDoc(doc(db, "hospitalRegistrations", user.uid));
        if (!hospitalRegDoc.exists() || hospitalRegDoc.data().status !== 'Approved') {
            await signOut(auth);
            throw new Error("Hospital registration not approved or not found.");
        }
    }
    
    return userData;
}

export async function logoutUser() {
    return await signOut(auth);
}

export async function getCurrentUser(): Promise<User | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  return userDoc.exists() ? (userDoc.data() as User) : null;
}
