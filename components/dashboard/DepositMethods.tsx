
const methods = [
  { name: "India\nNetbanking", color: "bg-green-500", icon: "/globe.svg" },
  { name: "UPI", color: "bg-gray-700", icon: "/window.svg" },
  { name: "Tether (TRC20)", color: "bg-green-600", icon: "/next.svg" },
];

export default function DepositMethods() {
  return (
    <section className="px-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-gray-900">Popular deposit methods</h3>
      </div>
      <div className="w-full bg-white border rounded-2xl p-4">
        <div className="grid grid-cols-3 gap-4">
          {methods.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className={`h-14 w-14 rounded-full ${m.color} flex items-center justify-center text-white shadow`}></span>
              <p className="text-xs text-gray-800 text-center whitespace-pre-line">{m.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
