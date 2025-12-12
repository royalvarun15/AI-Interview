import Link from "next/link";

export default function AllInterviewsPage() {
  // sample data — replace with real API call
  const interviews = [
    { id: 1, role: "Frontend Developer", candidate: "Rahul Sharma", status: "Scheduled" },
    { id: 2, role: "Backend Developer", candidate: "Priya Verma", status: "Completed" },
    { id: 3, role: "Full Stack", candidate: "Aman Joshi", status: "Draft" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">All Interviews</h1>
          <Link href="/create" className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow">
            + Create Interview
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Candidate</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-slate-500">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {interviews.map((i) => (
                <tr key={i.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{i.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{i.candidate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={
                        "inline-block px-2 py-1 rounded-full text-xs font-medium " +
                        (i.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : i.status === "Scheduled"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-slate-100 text-slate-700")
                      }
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link href={`/interviews/${i.id}`} className="text-sm mr-3 text-violet-600">View</Link>
                    <Link href={`/interviews/${i.id}/edit`} className="text-sm text-slate-600">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </main>
  );
}
