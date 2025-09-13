"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db, auth } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export function WithdrawModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) return alert("Enter a valid amount");

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const currentBalance = snap.data()?.balance || 0;

    if (withdrawAmount > currentBalance) {
      return alert("Insufficient balance!");
    }

    setLoading(true);
    try {
      // 1. Add transaction record
      await addDoc(collection(db, "users", user.uid, "transactions"), {
        type: "withdraw",
        amount: withdrawAmount,
        status: "completed",
        createdAt: serverTimestamp(),
      });

      // 2. Update balance
      await updateDoc(userRef, {
        balance: currentBalance - withdrawAmount,
      });

      setAmount("");
      onClose();
    } catch (err) {
      console.error("Withdraw error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button className="w-full" onClick={handleWithdraw} disabled={loading}>
            {loading ? "Processing..." : "Confirm Withdraw"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
