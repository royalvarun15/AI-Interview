import { LayoutDashboard, Calendar, List, WalletCards, Settings, User2Icon, Code2Icon, BriefcaseBusinessIcon, Puzzle, Component } from "lucide-react";

export const SideBarOptions=[
    {
        name: 'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name: 'Scheduled Interview',
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon:List,
        path:'/all-interview'
    },
    {
        name: 'Billing',
        icon:WalletCards,
        path:'/billing'
    },
    {
        name: 'Setting',
        icon:Settings,
        path:'/settings'
    },
]

export const InterviewType = [
    {
        title:'Technical',
        icon:Code2Icon
    },
    {
        title:'Behavioral',
        icon:User2Icon
    },
    {
        title:'Experiance',
        icon:BriefcaseBusinessIcon
    },
    {
        title:'Problem Solving',
        icon:Puzzle
    },
    {
        title:'Leadership',
        icon: Component
    },
]

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer.  
Your task is to generate structured interview questions strictly in JSON format.

JOB INFORMATION:
- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration (minutes): {{duration}}
- Interview Type: {{type}}

REQUIREMENTS:
1. Analyze the job description and extract required skills, responsibilities, and experience level.
2. Based on the interview duration, generate an appropriate number of questions.
   - 10 minutes → 3–4 questions
   - 15 minutes → 5–7 questions
   - 20 minutes → 8–10 questions
3. Include a mix of:
   - Technical
   - Behavioral
   - Problem Solving
   - Experience-based
   - Leadership (if applicable)
4. Make questions practical, role-specific, and realistic.

OUTPUT FORMAT (STRICT JSON ONLY):

{
  "interviewQuestions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Problem Solving | Experience | Leadership"
    }
  ]
}

DO NOT include explanations, markdown, comments, or text outside the JSON.
Return ONLY the JSON object.
`;


export const FEEDBACK_PROMPT = `
You are an AI interview evaluator. Analyze the following interview conversation and produce structured feedback strictly in JSON format.

CONVERSATION (CANDIDATE + INTERVIEWER MESSAGES):
{{conversation}}

YOUR TASKS:
1. Evaluate the candidate's answers based on:
   - Clarity
   - Technical knowledge
   - Problem-solving ability
   - Communication
   - Confidence
   - Relevancy to job role
2. Identify strengths and weaknesses from the conversation.
3. Give a score from 1–10 in each category.
4. Provide short, actionable improvement suggestions.
5. Avoid judging personal traits — focus only on interview performance.

OUTPUT FORMAT (STRICT JSON ONLY — NO MARKDOWN, NO COMMENTS):
{
  "overallScore": number,
  "summary": "short paragraph",
  "scores": {
    "communication": number,
    "technicalKnowledge": number,
    "problemSolving": number,
    "confidence": number,
    "relevancy": number
  },
  "strengths": [
    "string"
  ],
  "weaknesses": [
    "string"
  ],
  "suggestions": [
    "string"
  ]
}

Return **only** the JSON object and nothing else.
`;


