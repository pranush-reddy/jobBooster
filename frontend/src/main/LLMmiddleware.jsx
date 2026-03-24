import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY
});

export async function Getdata(resumedata ,JD) {
// Stream the response to get reasoning tokens in usage
const stream = await openrouter.chat.send({
  model: "arcee-ai/trinity-large-preview:free",
  messages: [
    {
      role: "user",
      content: `This is the resume data and write a JD.Write a sample email for recruiter on this applicaion. ${resumedata}+ JD: ${JD} `
    }
  ],
  stream: true
});

let response = "";
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    response += content;
    process.stdout.write(content);
  }

  // Usage information comes in the final chunk
  
}
return response;
}