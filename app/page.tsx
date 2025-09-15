"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";
import { redirect } from "next/navigation";



export default function Home() {

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      redirect('/login');
    } else {
      redirect('/dashboard');
    }
  }, [user]);

  return null;
}
