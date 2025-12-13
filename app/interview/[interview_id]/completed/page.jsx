import { supabase } from "@/services/supabaseClient";
import Link from "next/link";

export const revalidate = 0;

export default async function InterviewFeedbackPage({ params }) {
  const { interview_id } = params;

  const { data: feedbackData, error } = await supabase
    .from("interview-feedback")
    .select("*")
    .eq("interview_id", interview_id)
    .single();

  if (!feedbackData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div className="bg-white p-10 shadow rounded-xl text-center">
          <h2 className="text-xl font-bold">No feedback found.</h2>
          <p className="text-gray-500 mt-2">Interview ID may be invalid or feedback failed to generate.</p>
          <Link href="/" className="mt-5 inline-block bg-violet-600 text-white px-4 py-2 rounded-lg">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const feedback = feedbackData.feedback; 

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8">

       
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold">Interview Feedback</h1>
          <Link
            href="/dashboard"
            className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Candidate Info */}
        <div className="mb-6 p-5 bg-violet-100 rounded-lg">
          <h2 className="text-lg font-bold mb-1">Candidate Details</h2>
          <p><strong>Name:</strong> {feedbackData.userName}</p>
          <p><strong>Email:</strong> {feedbackData.userEmail}</p>
        </div>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Summary</h2>
          <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{feedback.summary}</p>
        </section>

        {/* Scores */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Scores</h2>
          <div className="grid grid-cols-2 gap-4">

            {Object.entries(feedback.scores).map(([key, value]) => (
              <div key={key} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                <p className="text-xl font-bold text-violet-600">{value}/10</p>
              </div>
            ))}

          </div>

          <div className="mt-4 p-4 bg-violet-200 rounded-lg">
            <p className="font-bold">Overall Score:</p>
            <p className="text-2xl font-extrabold text-violet-700">{feedback.overallScore}/10</p>
          </div>
        </section>

        {/* Strengths */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Strengths</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {feedback.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>

        {/* Weaknesses */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Weaknesses</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {feedback.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>

        {/* Suggestions */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Improvement Suggestions</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {feedback.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>


        <div className="mt-10 text-center">
          <Link
            href={`/interview/${interview_id}`}
            className="text-violet-600 underline"
          >
            View Interview Details
          </Link>
        </div>

      </div>
    </main>
  );
}
