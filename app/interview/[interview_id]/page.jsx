"use client";
import React, { useContext, useEffect, useState } from "react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/services/supabaseClient";
import { InterviewDataContext } from "@/context/InterviewDataContext";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();


  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      const { data: Interviews, error } = await supabase
        .from("interviews")
        .select("jobPosition, jobDescription, duration, type, questionList")
        .eq("interview_id", interview_id);

      setLoading(false);

      if (error) {
        toast.error("Failed to fetch interview.");
        return;
      }

      if (!Interviews || Interviews.length === 0) {
        toast.error("Invalid interview link.");
        return;
      }

      setInterviewData(Interviews[0]);
    } catch (e) {
      setLoading(false);
      toast.error("Unable to load interview.");
    }
  };

  const onJoinInterview = async () => {
    if (!userEmail.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }

    setLoading(true);

    const { data: interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id);

    setLoading(false);

    if (error || !interviews || interviews.length === 0) {
      toast.error("Interview not found.");
      return;
    }

    const selectedInterview = interviews[0];

    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: selectedInterview,
    });

    router.push(`/interview/${interview_id}/start`);
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-8">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 mb-20 lg:px-33 xl:px-52">
        <Image src={"/HireMind.png"} alt="logo" width={200} height={100} className="w-[180px]" />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>

        <Image src={"/image2.png"} alt="interview" width={500} height={500} className="w-[380px] my-6" />

        <h2 className="font-bold text-xl">{interviewData?.jobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500">
          <Clock className="h-4 w-4" /> {interviewData?.duration}
        </h2>

        {/* Name Input */}
        <div className="w-full mt-3">
          <h2>Enter your full name</h2>
          <Input
            className="mt-3"
            placeholder="e.g. Rohit Singh"
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="w-full mt-3">
          <h2>Enter your Email</h2>
          <Input
            className="mt-3"
            placeholder="e.g. rohit@gmail.com"
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </div>

            <div className="p-3 bg-violet-200 flex gap-4 rounded-lg mt-5">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold">Before you Begin</h2>
            <ul>
              <li className="text-sm text-primary">- Ensure you have a stable internet connection</li>
              <li className="text-sm text-primary">- Test your camera and microphone</li>
              <li className="text-sm text-primary">- Sit in a quiet environment</li>
            </ul>
          </div>
        </div>


        <Button
          className={"mt-5 w-full font-bold"}
          disabled={loading || !userName || !userEmail}
          onClick={onJoinInterview}
        >
          <Video /> {loading && <Loader2Icon className="animate-spin ml-2" />} Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
