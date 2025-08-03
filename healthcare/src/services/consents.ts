"use server";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { Consent } from '@/lib/types';

export async function getConsentsByPatient(patientId: string): Promise<Consent[]> {
    const q = query(collection(db, `users/${patientId}/consents`));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Consent));
}

export async function getConsentForHospital(patientId: string, hospitalId: string): Promise<Consent | null> {
    const q = query(collection(db, `users/${patientId}/consents`), where("hospitalId", "==", hospitalId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Consent;
}

export async function requestConsent(patientId: string, hospitalId: string, hospitalName: string) {
    const consentsCol = collection(db, `users/${patientId}/consents`);
    await addDoc(consentsCol, {
        patientId,
        hospitalId,
        hospitalName,
        requestDate: new Date().toISOString(),
        status: "Pending",
    });
}

export async function updateConsentStatus(patientId: string, consentId: string, status: "Granted" | "Revoked" | "Denied") {
    const consentRef = doc(db, `users/${patientId}/consents/${consentId}`);
    const consentSnap = await getDoc(consentRef);

    if (consentSnap.exists()) {
        await updateDoc(consentRef, { status: status === 'Denied' ? 'Revoked' : status });
        return;
    }
    
    throw new Error("Consent not found");
}
