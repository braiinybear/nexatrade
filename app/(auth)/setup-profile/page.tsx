"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { countries, currencies } from "@/lib/constants";

export default function SetupProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("Demo");

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // Generate random 9-digit account number
    const accountNumber =
      "#" + Math.floor(100000000 + Math.random() * 900000000);

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name,
      country,
      currency,
      phone,
      accountType,
      accountNumber,
      balance: 10000.0, // default balance for demo accounts
      createdAt: new Date().toISOString(),
    });

    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              className="w-full border rounded-md p-3"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              className="w-full border rounded-md p-3"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              className="w-full border rounded-md p-3"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="Demo">Demo</option>
              <option value="Real" disabled>
                Real (disabled for now)
              </option>
            </select>
          </div>

          <Button
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
          >
            Save & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
