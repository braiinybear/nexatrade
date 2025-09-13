"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isSignup ? "Sign up to start trading" : "Login to continue"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
          </Button>

          <div className="relative py-2">
            <Separator className="my-4" />
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              OR
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              className="text-blue-600 font-medium hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
