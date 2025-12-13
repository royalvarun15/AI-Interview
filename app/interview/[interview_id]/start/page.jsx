"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);


  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY));
  console.log("VAPI KEY:", process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);


  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState([]);
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    vapi.on("error", (err) => {
      console.error("VAPI ERROR:", err);
      toast.error("A call error occurred.");
    });
  }, [vapi]);

  useEffect(() => {
    if (interviewInfo?.interviewData?.questionList?.length > 0) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    const questionList = interviewInfo.interviewData.questionList
      ?.map((q) => q.question)
      .join(", ");
  
    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo.userName}, how are you? Ready for your interview on ${interviewInfo.interviewData.jobPosition}?`,
      
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
  
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
  
      model: {
        provider: "google",
        model: "gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `
  You are an AI interviewer.
  Ask the following questions one by one:
  ${questionList}
  
  Guidelines:
  - Ask one question at a time and wait for candidate response.
  - Give short encouraging feedback.
  - Rephrase if they struggle.
  - End with a brief summary of performance.
  `.trim(),
          },
        ],
      },
    };
  
    vapi.start(assistantOptions);
  };
  

  const stopInterview = () => {
    vapi.stop();
  };


  useEffect(() => {
    if (!vapi) return;
  
    const handleCallStart = () => {
      toast("Call Connected...");
    };
  
    const handleSpeechStart = () => setActiveUser(false);
  
    const handleSpeechEnd = () => setActiveUser(true);
  
    const handleCallEnd = () => {
      toast("Interview Ended");
      GenerateFeedback();
    };
  
    const handleMessage = (msg) => {
      setConversation(msg?.conversation || []);
    };
  
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);
  
    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
    };
  
  }, [vapi]);
  

  const GenerateFeedback = async () => {
    try {
      const result = await axios.post("/api/ai_feedback", { conversation });
  
      // Safety: ensure something was returned
      let text = result.data.feedback || result.data.raw || "";
  
      if (!text) {
        console.warn("⚠ No feedback received from AI");
        return;
      }
  
    
      text = text.replace(/```json/g, "")
                 .replace(/```/g, "")
                 .trim();
  
 
      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(text);
      } catch (err) {
        console.warn("⚠ AI did not return JSON. Saving raw text instead.");
        parsedFeedback = { summary: text };
      }
  
     
      await supabase.from("interview-feedback").insert([
        {
          userName: interviewInfo.userName,
          userEmail: interviewInfo.userEmail,
          interview_id,
          feedback: parsedFeedback,
          recommended: false,
        },
      ]);
  
      router.replace(`/interview/${interview_id}/completed`);
    } catch (err) {
      console.error("FEEDBACK ERROR:", err);
      toast.error("Failed to save feedback.");
    }
  };
  

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
     
        <div className="bg-white h-[300px] rounded-lg border flex flex-col gap-1 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/AI.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

   
        <div className="bg-white h-[300px] rounded-lg border flex flex-col gap-6 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-35 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

    
      <div className="flex gap-2 justify-end mt-5">
        <Mic className="h-10 w-10 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />

        {!loading ? (
          <Phone
            onClick={stopInterview}
            className="h-10 w-10 p-3 bg-red-500 text-white rounded-full cursor-pointer"
          />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </div>
    </div>
  );
}

export default StartInterview;
