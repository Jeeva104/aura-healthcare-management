
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/admin/dashboard');
    }, [router]);

    return (
        <div>Loading...</div>
    );
}
