
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Share2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { HealthRecord } from '@/lib/types';
import { HealthAnalysis } from '@/components/health-analysis';

// Mock Data
const mockHealthRecords: HealthRecord[] = [
    { id: 'rec1', patientId: 'user1', name: 'Annual Checkup.pdf', uploadDate: '2023-10-15', url: '#', sharedWith: [] },
    { id: 'rec2', patientId: 'user1', name: 'X-Ray-Report.pdf', uploadDate: '2023-09-20', url: '#', sharedWith: [] },
    { id: 'rec3', patientId: 'user1', name: 'Blood Test Results.pdf', uploadDate: '2024-01-05', url: '#', sharedWith: [] },
    { id: 'rec4', patientId: 'user1', name: 'Cardiology Report.pdf', uploadDate: '2023-12-12', url: '#', sharedWith: [] },
];

const mockHospitals = [
    { id: 'hosp1', name: 'General Hospital' },
    { id: 'hosp2', name: 'City Clinic' },
    { id: 'hosp3', name: 'Wellness Center' },
]

export default function UserDashboard() {
    const { toast } = useToast();
    
    const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(
        mockHealthRecords.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    );
    const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
    const [selectedHospital, setSelectedHospital] = useState<string>('');

    const handleShare = () => {
        if (!selectedRecord || !selectedHospital) {
            toast({
                variant: 'destructive',
                title: 'Sharing Failed',
                description: 'Please select a record and a hospital.',
            });
            return;
        }

        const hospital = mockHospitals.find(h => h.id === selectedHospital);
        toast({
            title: 'Report Shared Successfully',
            description: `${selectedRecord.name} has been shared with ${hospital?.name}.`,
        });
        // Here you would typically call an API to persist the sharing action.
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-secondary">
            <DashboardHeader userType="Patient" userName="Jane Doe" userInitials="JD" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                
                <HealthAnalysis />

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="grid gap-2">
                            <CardTitle className="font-headline text-2xl">My Health Records</CardTitle>
                            <CardDescription>Manage and share your uploaded medical documents.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>File Name</TableHead>
                                    <TableHead>Upload Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {healthRecords.length > 0 ? healthRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> {record.name}</TableCell>
                                        <TableCell>{new Date(record.uploadDate).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={record.url} target="_blank" rel="noopener noreferrer">View</a>
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                     <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                                                        <Share2 className="mr-2 h-4 w-4" /> Share
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Share Report</DialogTitle>
                                                        <DialogDescription>
                                                            You are about to share "{selectedRecord?.name}". Select a hospital to grant them one-time access.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <Select onValueChange={setSelectedHospital}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a hospital..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {mockHospitals.map(h => (
                                                                    <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                          <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button onClick={handleShare}>Confirm Share</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24">No health records found.</TableCell>
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
