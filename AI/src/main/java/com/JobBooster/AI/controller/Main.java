package com.JobBooster.AI.controller;

import com.JobBooster.AI.service.AppService;
import com.JobBooster.AI.service.OpenrouterService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class Main {

    @Autowired
    private AppService service;

    @Autowired
    private OpenrouterService openrouterService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/")
    public String Home() {
        return "Welcome Home";
    }

    @PostMapping("/upload-resume")
    public ResponseEntity<?> uploadResume(@RequestPart("file") MultipartFile file) throws Exception {
        String result = service.sendFileToFastAPI(file);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/llm-request")
    public ResponseEntity<?> generate(@RequestBody Map<String, String> request) {
        try {
            String resume = request.get("resume");
            String jd = request.get("jd");

            if (resume == null || resume.isEmpty() || jd == null || jd.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("success", false, "error", "Resume and JD are required"));
            }


            // Get response from OpenRouter
            String response = openrouterService.generateText(resume, jd);


            // Parse OpenRouter response
            JsonNode responseJson = objectMapper.readTree(response);
            String content = responseJson.get("choices").get(0).get("message").get("content").asText();


            // Parse the AI response (should be JSON string)
            JsonNode aiResponseNode = objectMapper.readTree(content);

            // ✅ CONVERT JsonNode to Map (THIS IS THE FIX)
            Map<String, Object> aiResponseMap = objectMapper.convertValue(aiResponseNode, Map.class);

            // Return success response with all data
            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("success", true);
            successResponse.put("message", "Analysis completed successfully");
            successResponse.put("data", aiResponseMap);
            successResponse.put("timestamp", System.currentTimeMillis());

            return ResponseEntity.ok(successResponse);

        } catch (Exception e) {
            System.err.println("Controller error: " + e.getMessage());
            e.printStackTrace();

            // Return error response
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            errorResponse.put("type", e.getClass().getSimpleName());
            errorResponse.put("timestamp", System.currentTimeMillis());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}