package com.example.electricity_api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ElectricityService {
    private static final Logger log = LoggerFactory.getLogger(ElectricityService.class);

    @Value("${external.api.url}")
    private String externalApiUrl;

    @Value("${eon.api.url}")
    private String eonApiUrl;

    @Value("${external.api.token}")
    private String bearerToken;  // Loaded from environment variable

    private final RestTemplate restTemplate;

    public ElectricityService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getElectricityProvider(String zip, String city, String street, String houseNumber, int consum, String type, String branch, String changeType) {
        try {
            // Construct the external API URL with query parameters
            String url = String.format("%s?zip=%s&city=%s&street=%s&houseNumber=%s&consum=%d&type=%s&branch=%s&changeType=%s",
                    externalApiUrl, zip, city, street, houseNumber, consum, type, branch, changeType);

            // Set the Authorization header with the Bearer token
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + bearerToken);

            // Set the headers into an HttpEntity
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Make the GET request to the external API with the Bearer token
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            // Return the response body (API response)
            return response.getBody();
        }
        catch (HttpClientErrorException | HttpServerErrorException ex) {
            // Catch 4xx and 5xx errors
            System.err.println("HTTP Status Code: " + ex.getStatusCode());
            System.err.println("Response Body: " + ex.getResponseBodyAsString());
            return "Error: " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString();
        } catch (RestClientException ex) {
            // Catch other errors (e.g., connection issues)
            System.err.println("Client error: " + ex.getMessage());
            return "Error: " + ex.getMessage();
        }

    }

    public String getAllPreviousProviders() throws DownstreamApiException {
        try {
            String url = eonApiUrl + "/beforeProvider/1133"; // Replace with a working rateId
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(bearerToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            log.error("HTTP error: {}", ex.getResponseBodyAsString());
            throw new DownstreamApiException(ex.getStatusCode(), ex.getResponseBodyAsString());

        } catch (RestClientException ex) {
            log.error("REST client error: {}", ex.getMessage(), ex);
            throw new DownstreamApiException(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage());

        } catch (Exception ex) {
            log.error("Unexpected error: {}", ex.getMessage(), ex);
            throw new DownstreamApiException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }


    public String submitOrder(String orderPayloadJson) throws DownstreamApiException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(bearerToken);

            HttpEntity<String> entity = new HttpEntity<>(orderPayloadJson, headers);
            String orderUrl = eonApiUrl + "/order";

            log.info("Calling downstream API: {}", orderUrl);
            log.debug("Payload: {}", orderPayloadJson);

            ResponseEntity<String> response = restTemplate.exchange(orderUrl, HttpMethod.PUT, entity, String.class);

            log.info("Downstream response: {}", response.getStatusCode());

            String body = response.getBody();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(body);
            if (root.has("error") && root.get("error").asBoolean()) {
                String message = root.has("message") ? root.get("message").asText() : "Unknown logical error";
                log.warn("Logical error returned from downstream: {}", message);
                throw new DownstreamApiException(HttpStatus.BAD_REQUEST, body);
            }

            return body;

        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            log.error("API error ({}): {}", ex.getStatusCode(), ex.getResponseBodyAsString());
            throw new DownstreamApiException(ex.getStatusCode(), ex.getResponseBodyAsString());
        } catch (RestClientException ex) {
            log.error("RestClientException: {}", ex.getMessage(), ex);
            throw new DownstreamApiException(HttpStatus.INTERNAL_SERVER_ERROR, "REST error: " + ex.getMessage());

        } catch (Exception ex) {
            log.error("Unexpected error: {}", ex.getMessage(), ex);
            throw new DownstreamApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error: " + ex.getMessage());
        }
    }

}

