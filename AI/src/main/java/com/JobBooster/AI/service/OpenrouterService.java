package com.JobBooster.AI.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenrouterService {

    private final WebClient webClient;

    @Autowired
    private ObjectMapper objectMapper;  // ✅ Inject ObjectMapper

    public OpenrouterService(
            WebClient.Builder webClientBuilder,
            @Value("${openrouter.api.key}") String apiKey
    ) {
        this.webClient = webClientBuilder
                .baseUrl("https://openrouter.ai/api/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("HTTP-Referer", "http://localhost:5173")
                .defaultHeader("X-Title", "JobBooster-AI")
                .build();
    }

    public String generateText(String resume, String jd) {
        try {
            // System prompt (instructions)
            String systemPrompt =
                    "You are JobBooster AI, an advanced resume and career optimization assistant. " +
                            "You MUST compare the candidate's RESUME and JOB_DESCRIPTION and return ONLY a single JSON object. " +
                            "Do NOT include markdown, explanations, reasoning, or any text outside the JSON. " +
                            "The JSON should be strict, valid, and must NOT contain trailing commas.\n\n" +

                            "Include EXACTLY the following fields:\n" +
                            "1. \"overall_fit_score\" — Integer (0–100) showing how well the resume matches the JD.\n" +
                            "2. \"project_score\" — Integer (0–100) showing how well the candidate's PROJECTS match the JD.\n" +
                            "3. \"role_overview\" — 4-6 lines summarizing the role on the JD context.\n" +
                            "4. \"resume_highlights\" — 3–5 lines summarizing the candidate’s strengths.\n" +
                            "5. \"missing_keywords\" — Array of skills, tools, technologies, or responsibilities required in the JD but absent in the resume.\n" +
                            "6. \"matching_strengths\" — Array of resume items that strongly align with the JD.\n" +
                            "7. \"actionable_tips\" — Array of clear steps to improve the resume & skillset.\n" +
                            "8. \"recruiter_email\" — A ready-to-send email to the recruiter on the application .Make sure it is formal to send and include profile details as well.\n" +
                            "9. \"cover_letter\" — A detailed, fully personalized cover letter tailored to this JD.\n" +
                            "10. \" keywordmatch_score\" - Integer(0-100) of how many keys are matched with given JD and resume"+
                            "11. \"optimized_resume_structure\" — An object containing the improved resume sections using ATS-friendly formatting align with the JD and detials from resumedata, matching skills with JD:\n" +
                            "     - \"summary\" — A rewritten 2–3 line professional summary aligned to the JD.\n" +
                            "     - \"skills\" — Array of hard/soft skills relevant to the JD.\n" +
                            "     - \"achievements\" — Array of measurable achievements.\n" +
                            "     - \"certifications\" — Array of relevant certifications.\n" +
                            "     - \"projects\" — Array of json improved project descriptions using the format: 'Implemented X using Y which resulted in Z% improvement'.\n\n" +

                            "Return the response using the EXACT JSON structure shown below, with NO extra fields:\n" +
                            "{\n" +
                            "  \"overall_fit_score\": 0,\n" +
                            "  \"project_score\": 0,\n" +
                            "  \"company_overview\": \"\",\n" +
                            "  \"resume_highlights\": \"\",\n" +
                            "  \"missing_keywords\": [],\n" +
                            "  \"matching_strengths\": [],\n" +
                            "  \"actionable_tips\": [],\n" +
                            "  \"recruiter_email\": \"\",\n" +
                            "  \"cover_letter\": \"\",\n" +
                            "  \"optimized_resume_structure\": {\n" +
                            "       \"summary\": \"\",\n" +
                            "       \"skills\": [],\n" +
                            "       \"achievements\": [],\n" +
                            "       \"certifications\": [],\n" +
                            "       \"projects\": {[\"Name\": \"description \"],[\"Name\":\"description\"]}\n" +
                            "  }\n" +
                            "}";
            // User message with actual resume and JD data
            String userMessage = "RESUME:\n" + resume + "\n\nJOB_DESCRIPTION:\n" + jd;

            // Build request body properly
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "meta-llama/llama-3.1-8b-instruct");
            requestBody.put("temperature", 0.2);

            // Messages array with system and user roles
            List<Map<String, String>> messages = List.of(
                    Map.of("role", "system", "content", systemPrompt),
                    Map.of("role", "user", "content", userMessage)
            );
            requestBody.put("messages", messages);

            // Convert to JSON string
            String jsonBody = objectMapper.writeValueAsString(requestBody);

            System.out.println("Sending request to OpenRouter...");
            System.out.println("Request body: " + jsonBody.substring(0, Math.min(200, jsonBody.length())) + "...");

            return webClient.post()
                    .uri("/chat/completions")
                    .header("Content-Type", "application/json")
                    .bodyValue(jsonBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .doOnError(e -> {
                        if (e instanceof WebClientResponseException) {
                            WebClientResponseException ex = (WebClientResponseException) e;
                            System.err.println("OpenRouter Error Status: " + ex.getStatusCode());
                            System.err.println("OpenRouter Error Body: " + ex.getResponseBodyAsString());
                        }
                    })
                    .block();

        } catch (Exception e) {
            System.err.println("Error in generateText: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to generate text from OpenRouter", e);
        }
    }
}