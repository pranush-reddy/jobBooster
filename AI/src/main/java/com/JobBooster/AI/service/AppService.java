package com.JobBooster.AI.service;


import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.apache.coyote.Response;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AppService {



    @Value("${app.FAST_API}")
    private String fastAPI;



    public String sendFileToFastAPI(MultipartFile file) throws Exception {
        WebClient client = WebClient.builder()
                .baseUrl(fastAPI)
                .build();

        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", file.getResource())
                .filename(file.getOriginalFilename())
                .contentType(MediaType.MULTIPART_FORM_DATA);

        return client.post()
                .uri("/upload-resume")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
