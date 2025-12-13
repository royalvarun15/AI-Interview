import Link from "next/link";
import { supabase } from "@/services/supabaseClient";

export const revalidate = 0; 

export default async function AllInterviewsPage() {
  
  const { data: interviews, error } = await supabase
    .from("interviews")
    .select("interview_id, jobPosition, userEmail, questionList");

  
  const { data: feedback } = await supabase
    .from("interview-feedback")
    .select("interview_id");

 
  const completedIds = new Set(feedback?.map((f) => f.interview_id));

  const getStatus = (interview) => {
    if (!interview.questionList || interview.questionList.length === 0) {
      return "Draft";
    }
    if (completedIds.has(interview.interview_id)) {
      return "Completed";
    }
    return "Scheduled";
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">All Interviews</h1>
          <Link
            href="/dashboard/create-interview"
            className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow"
          >
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

              {interviews?.map((i) => {
                const status = getStatus(i);

                return (
                  <tr key={i.interview_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{i.jobPosition}</td>

                    <td className="px-6 py-4 whitespace-nowrap">{i.userEmail}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          "inline-block px-2 py-1 rounded-full text-xs font-medium " +
                          (status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : status === "Scheduled"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-slate-200 text-slate-700")
                        }
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link
                        href={`/interview/${i.interview_id}`}
                        className="text-sm mr-3 text-violet-600"
                      >
                        View
                      </Link>

                      <Link
                        href={`/interview/${i.interview_id}/edit`}
                        className="text-sm text-slate-600"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}
