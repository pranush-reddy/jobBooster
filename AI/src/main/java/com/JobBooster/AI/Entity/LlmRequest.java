package com.JobBooster.AI.Entity;

import lombok.Data;

@Data
public class LlmRequest {
    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public String getJd() {
        return jd;
    }

    public void setJd(String jd) {
        this.jd = jd;
    }

    private String resume;
    private String jd;
}