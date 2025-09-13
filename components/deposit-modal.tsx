"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db, auth } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  increment,
} from "firebase/firestore";

export function DepositModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const depositAmount = parseFloat(amount);

    // ✅ block invalid input
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Enter a valid positive amount");
      return;
    }

    setLoading(true);
    try {
      // 1. Add transaction record
      await addDoc(collection(db, "users", user.uid, "transactions"), {
        type: "deposit",
        amount: depositAmount,
        status: "completed",
        createdAt: serverTimestamp(),
      });

      // 2. Update balance safely
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        balance: increment(depositAmount), // ✅ atomic update
      });

      setAmount("");
      onClose();
    } catch (err) {
      console.error("Deposit error:", err);
      alert("Deposit failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1" // ✅ prevents typing negatives in most browsers
          />
          <Button
            className="w-full"
            onClick={handleDeposit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Deposit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
