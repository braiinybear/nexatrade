"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { redirect } from "next/navigation";



export default function Home() {

  const { user } = useAuth();
  if (!user) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }
  return null;
}
