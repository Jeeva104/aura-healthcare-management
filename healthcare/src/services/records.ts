"use server";
import { db, storage } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { HealthRecord } from '@/lib/types';

export async function getRecordsByPatient(patientId: string): Promise<HealthRecord[]> {
    const q = query(collection(db, `users/${patientId}/records`));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HealthRecord));
}

export async function uploadRecord(file: File, patientId: string) {
    const storageRef = ref(storage, `health-records/${patientId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    const recordsCol = collection(db, `users/${patientId}/records`);
    await addDoc(recordsCol, {
        patientId,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        url,
        sharedWith: [],
    });
}
