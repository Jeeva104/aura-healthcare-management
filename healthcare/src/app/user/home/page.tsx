
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserHomePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/user/dashboard');
    }, [router]);

    return (
        <div>Loading...</div>
    );
}
