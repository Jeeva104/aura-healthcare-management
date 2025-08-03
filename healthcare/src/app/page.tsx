import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { FileLock, Users, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 tracking-tight">
            Your Health Data, Unified and Secure.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            AURA provides a seamless and secure platform for patients and hospitals to share and manage health records with full consent-based control.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Access Your Dashboard</Link>
            </Button>
          </div>
        </section>

        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">A Revolution in Healthcare Data</h2>
              <p className="text-md md:text-lg text-muted-foreground mt-2">Empowering patients and providers with AURA.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                    <FileLock className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">Secure Data Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Upload and share your health records confidently. Our platform ensures your data is encrypted and only accessible with your explicit consent.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">Role-Based Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Tailored dashboards for patients, hospitals, and admins ensure that users only see the information and tools relevant to their role.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline mt-4">Consent Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    You are in control. Grant or revoke access to your health records at any time. All access requests are logged for full transparency.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Built on Trust and Technology</h2>
                    <p className="text-muted-foreground mb-6">
                        AURA Health Connect is built on a foundation of cutting-edge technology to ensure your data is always safe, secure, and available when you need it. We leverage Firebase for robust authentication, secure storage, and a reliable database, ensuring compliance and peace of mind.
                    </p>
                    <Button asChild>
                        <Link href="/register">Create a free account</Link>
                    </Button>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                    <Image src="https://placehold.co/600x400" alt="Secure data illustration" layout="fill" objectFit="cover" data-ai-hint="healthcare technology" />
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AURA Health Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
