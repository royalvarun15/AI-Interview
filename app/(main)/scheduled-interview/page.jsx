import Link from "next/link";

export default function ScheduledPage() {
  // sample data — replace with real API call
  const scheduled = [
    { id: 1, role: "Frontend Developer", candidate: "Rahul Sharma", datetime: "2025-12-20 10:00 AM", duration: "30m" },
    { id: 2, role: "Backend Developer", candidate: "Priya Verma", datetime: "2025-12-22 2:00 PM", duration: "45m" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">Scheduled Interviews</h1>
          <Link href="/create" className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow">
            + Create New
          </Link>
        </div>

        {scheduled.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center text-slate-600">No scheduled interviews.</div>
        ) : (
          <div className="grid gap-4">
            {scheduled.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{item.role}</div>
                  <div className="text-sm text-slate-500">{item.candidate} · {item.duration}</div>
                  <div className="text-sm text-slate-400 mt-2">{item.datetime}</div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/interviews/${item.id}`} className="px-4 py-2 border rounded-md text-sm">View</Link>
                  <button className="px-4 py-2 bg-violet-600 text-white rounded-md text-sm">Start</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
