export type UserRole = "patient" | "hospital" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  hospitalName?: string;
}

export interface HealthRecord {
    id: string;
    patientId: string;
    name: string;
    uploadDate: string;
    url: string;
    sharedWith: string[];
}

export interface Consent {
    id: string;
    patientId: string;
    hospitalId: string;
    hospitalName: string;
    requestDate: string;
    status: "Pending" | "Granted" | "Revoked";
}

export interface AccessLog {
    id: string;
    accessorId: string; // Can be hospital or patient
    accessorRole: UserRole;
    accessorName: string;
    patientId: string;
    recordId: string;
    recordName: string;
    timestamp: string;
    action: "Accessed" | "Uploaded" | "Revoked" | "Granted";
}

export interface HospitalRegistration {
    id: string;
    name: string;
    email: string;
    place: string;
    requestDate: string;
    status: "Pending" | "Approved" | "Rejected";
}
