package com.example.electricity_api.service;

import org.springframework.http.HttpStatusCode;

public class DownstreamApiException extends Exception {
    private final HttpStatusCode status;
    private final String responseBody;

    public DownstreamApiException(HttpStatusCode status, String responseBody) {
        super("Downstream API error: " + status);
        this.status = status;
        this.responseBody = responseBody;
    }

    public HttpStatusCode getStatus() {
        return status;
    }

    public String getResponseBody() {
        return responseBody;
    }
}