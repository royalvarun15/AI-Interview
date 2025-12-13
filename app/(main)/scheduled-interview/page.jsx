import Link from "next/link";
import { supabase } from "@/services/supabaseClient";

export const revalidate = 0;

export default async function ScheduledPage() {
  
  const { data: scheduled, error } = await supabase
    .from("interviews")
    .select("interview_id, jobPosition, userEmail, duration, dateTime")
    .order("dateTime", { ascending: true });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">

      
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">Scheduled Interviews</h1>
          <Link
            href="/dashboard/create-interview"
            className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow"
          >
            + Create New
          </Link>
        </div>

        
        {(!scheduled || scheduled.length === 0) && (
          <div className="bg-white p-8 rounded-xl shadow text-center text-slate-600">
            No scheduled interviews found.
          </div>
        )}

        
        <div className="grid gap-4">
          {scheduled?.map((item) => (
            <div
              key={item.interview_id}
              className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row 
              items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="text-lg font-semibold">{item.jobPosition}</div>
                <div className="text-sm text-slate-500">
                  Candidate: {item.userEmail}
                </div>

                <div className="text-sm text-slate-500">
                  Duration: {item.duration || "30m"}
                </div>

                <div className="text-sm text-slate-400 mt-2">
                  {item.dateTime ? new Date(item.dateTime).toLocaleString() : "Not Scheduled"}
                </div>
              </div>

              
              <div className="flex items-center gap-3">
                <Link
                  href={`/interview/${item.interview_id}`}
                  className="px-4 py-2 border rounded-md text-sm"
                >
                  View
                </Link>

                <Link
                  href={`/interview/${item.interview_id}/start`}
                  className="px-4 py-2 bg-violet-600 text-white rounded-md text-sm"
                >
                  Start
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
