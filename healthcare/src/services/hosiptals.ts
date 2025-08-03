"use server";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { HospitalRegistration } from '@/lib/types';

export async function getPendingRegistrations(): Promise<HospitalRegistration[]> {
    const q = query(collection(db, "hospitalRegistrations"), where("status", "==", "Pending"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as HospitalRegistration);
}

export async function updateRegistrationStatus(hospitalId: string, status: "Approved" | "Rejected") {
    const hospitalRef = doc(db, "hospitalRegistrations", hospitalId);
    await updateDoc(hospitalRef, { status });
}
