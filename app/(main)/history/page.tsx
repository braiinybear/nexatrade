"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuth } from "@/lib/hooks/useAuth";

export default function HistoryPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setTransactions(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-start px-2 py-2 sm:px-6 sm:py-6">
      <div className="w-full max-w-md sm:max-w-xl mx-auto">
        <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-900 text-center tracking-tight">Operation History</h1>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300 mb-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-gray-500 text-base sm:text-lg">No transactions yet.</p>
            </div>
          )}
          <div className="space-y-2 sm:space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-200 shadow-sm p-2 sm:p-4 rounded-lg sm:rounded-xl w-full"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full ${tx.type === "deposit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {tx.type === "deposit" ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6m0 0l-7 7m7-7l7 7" /></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v13m0 0l-7-7m7 7l7-7" /></svg>
                    )}
                  </span>
                  <div>
                    <p className="font-semibold capitalize text-gray-800 text-sm sm:text-base">{tx.type}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {tx.createdAt?.toDate().toLocaleString() || "Pending..."}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-base sm:text-lg font-bold ${tx.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                >
                  {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
