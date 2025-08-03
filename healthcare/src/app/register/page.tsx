
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/services/auth";
import type { UserRole } from "@/lib/types";

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
    setError("");

    try {
      await registerUser({ 
        email, 
        password, 
        role, 
        fullName, 
        hospitalName, 
        place: role === 'hospital' ? `${city}, ${state}`: undefined 
      });
      
      toast({
        title: "Registration Successful",
        description: "Redirecting to login page...",
      });
      
      setTimeout(() => {
        router.push('/login');
      }, 1000);

    } catch (err: any) {
        setError(err.message);
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: err.message,
        });
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
          <CardDescription>Join AURA Health Connect today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === 'patient' && (
                <div className="space-y-2">
                  <Label htmlFor="fullname-patient">Full Name</Label>
                  <Input id="fullname-patient" type="text" placeholder="John Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
            )}

             {role === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="fullname-admin">Full Name</Label>
                  <Input id="fullname-admin" type="text" placeholder="Admin User" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
            )}
            
            {role === 'hospital' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="hospitalname">Hospital Name</Label>
                  <Input id="hospitalname" type="text" placeholder="General Hospital" required={role === 'hospital'} value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" type="text" placeholder="Your City" required={role === 'hospital'} value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" type="text" placeholder="Your State" required={role === 'hospital'} value={state} onChange={(e) => setState(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email-patient">Email</Label>
              <Input id="email-patient" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
