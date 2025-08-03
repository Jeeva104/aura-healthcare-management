
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Hospital, User, XCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { useToast } from "@/hooks/use-toast";
import { AccessLog, HospitalRegistration, UserRole } from "@/lib/types";

// Mock Data
const mockRegistrations: HospitalRegistration[] = [
    { id: 'reg1', name: 'Sunshine Medical Center', email: 'contact@sunshinemed.com', place: 'Miami, FL', requestDate: '2023-11-01', status: 'Pending' },
    { id: 'reg2', name: 'Oak Valley Hospital', email: 'admin@oakvalley.org', place: 'Oak Valley, CA', requestDate: '2023-10-29', status: 'Pending' },
];

const mockSystemLogs: AccessLog[] = [
    { id: 'log1', timestamp: '2023-11-02T11:30:00Z', accessorRole: 'hospital', accessorName: 'City Clinic', action: 'Accessed', recordName: 'Annual Checkup.pdf', patientId: 'user1', recordId: 'rec1' },
    { id: 'log2', timestamp: '2023-11-02T10:05:00Z', accessorRole: 'patient', accessorName: 'Jane Doe', action: 'Uploaded', recordName: 'X-Ray-Report.pdf', patientId: 'user1', recordId: 'rec2' },
    { id: 'log3', timestamp: '2023-11-01T15:00:00Z', accessorRole: 'admin', accessorName: 'AURA Admin', action: 'Approved', recordName: 'City Clinic Registration', patientId: '', recordId: '' },
];


export default function AdminDashboard() {
    const { toast } = useToast();
    const [registrations, setRegistrations] = useState<HospitalRegistration[]>(mockRegistrations);
    const [systemLogs, setSystemLogs] = useState<AccessLog[]>(mockSystemLogs);

    const handleApproval = async (id: string, approved: boolean) => {
        const status = approved ? "Approved" : "Rejected";
        setRegistrations(prev => prev.filter(r => r.id !== id));
        toast({
            title: `Registration ${status}`,
            description: `The mock hospital registration has been ${status.toLowerCase()}.`,
        });
    };

    const getIconForRole = (role: UserRole) => {
        switch (role) {
            case 'hospital': return <Hospital className="h-4 w-4 text-muted-foreground" />;
            case 'patient': return <User className="h-4 w-4 text-muted-foreground" />;
            case 'admin': return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
            default: return null;
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-secondary">
            <DashboardHeader userType="Admin" userName="AURA Admin" userInitials="A" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Pending Hospital Registrations</CardTitle>
                        <CardDescription>Review and approve new hospitals joining the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Hospital Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Request Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {registrations.length > 0 ? registrations.map((reg) => (
                                    <TableRow key={reg.id}>
                                        <TableCell className="font-medium">{reg.name}</TableCell>
                                        <TableCell>{reg.place}</TableCell>
                                        <TableCell>{new Date(reg.requestDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" onClick={() => handleApproval(reg.id, true)} className="border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-600">
                                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => handleApproval(reg.id, false)} className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-600">
                                                    <XCircle className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">No pending registrations.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">System Access Logs</CardTitle>
                        <CardDescription>An overview of all significant activities on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {systemLogs.length > 0 ? systemLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /> {new Date(log.timestamp).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="flex items-center gap-2 w-fit">
                                                {getIconForRole(log.accessorRole)} {log.accessorRole}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{log.accessorName}</TableCell>
                                        <TableCell>
                                            <Badge variant={log.action === 'Accessed' ? 'secondary' : 'default'}>{log.action}</Badge>
                                        </TableCell>
                                        <TableCell>{log.recordName || 'N/A'}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">No system logs found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
