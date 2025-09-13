"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Wallet, LineChart, Briefcase } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER BALANCE SECTION */}
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold">$0.00</h1>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              💳
            </div>
            <p className="text-sm mt-2">Deposit</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              📈
            </div>
            <p className="text-sm mt-2">Trade</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              💵
            </div>
            <p className="text-sm mt-2">Withdraw</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-blue-600 p-4 rounded-full shadow">
              ⋯
            </div>
            <p className="text-sm mt-2">More</p>
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 space-y-4 p-4">
        {/* OCTA REWARDS */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">Challenges</Button>
              <Button variant="outline" size="sm">My rewards</Button>
            </div>
            <div className="mt-4 bg-blue-100 p-4 rounded-xl">
              <p className="font-medium">Unlock your welcome cashback reward</p>
              <Button className="mt-2 w-full bg-blue-600 text-white">Activate</Button>
            </div>
          </CardContent>
        </Card>

        {/* TOP DAILY MOVERS */}
        <div>
          <h2 className="font-semibold mb-2">Top daily movers</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="font-medium">NAS100</p>
                <p className="text-green-600">+0.47%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="font-medium">NZDUSD</p>
                <p className="text-red-600">-0.39%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SPACE CHANNELS */}
        <div>
          <h2 className="font-semibold mb-2">Space channels</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <div>
                <p className="font-medium">GBPUSD chart patterns</p>
                <p className="text-sm text-gray-600">GBPUSD formed the Triangle pattern</p>
              </div>
              <div>
                <p className="font-medium">USDJPY chart patterns</p>
                <p className="text-sm text-gray-600">USDJPY formed a bearish H&S pattern</p>
              </div>
              <div>
                <p className="font-medium">ETHUSD support and resistance</p>
                <p className="text-sm text-gray-600">ETHUSD is moving in the 4,280–4,800 range</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
