package com.example.electricity_api.controller;

import com.example.electricity_api.dto.AddressDetails;
import com.example.electricity_api.dto.EgonResponse;
import com.example.electricity_api.service.EgonAddressService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/address")

public class EgonAddressController {
    @Value("${egon.api.token}")
    private String apiKey; // Your Egon API token

    private final RestTemplate restTemplate = new RestTemplate();

    // -----------------------
    // Step 1: Suggest cities by ZIP
    // -----------------------
    @GetMapping("/zipcode")
    public ResponseEntity<?> getCitiesByZip(@RequestParam String zip) {

        System.out.println("I am at zipcode api");
        String url = "https://api.egon.com/v4/suggest/zipcode";

        Map<String, Object> requestBody = Map.of(
                "data", Map.of(
                        "query", zip,
                        "zip_level", "L"
                ),
                "par", Map.of(
                        "iso3", "DEU"
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            Map<String, Object> body = response.getBody();
            if (body == null || !body.containsKey("data")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No results for ZIP: " + zip);
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>)
                    ((Map) body.get("data")).get("results");

            return ResponseEntity.ok(results);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching cities for ZIP: " + zip);
        }
    }

    // -----------------------
    // Step 2: Suggest streets by city
    // -----------------------
    @GetMapping("/streets")
    public ResponseEntity<?> getStreetsByCity(
            @RequestParam String streetName,
            @RequestParam Long cityId // use city_id from previous response
    ) {
        System.out.println("I am at street api");
        String url = "https://api.egon.com/v4/suggest/street";

        Map<String, Object> requestBody = Map.of(
                "data", Map.of(
                        "query", streetName,
                        "restrict_id", cityId
                ),
                "par", Map.of(
                        "iso3", "DEU"
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            Map<String, Object> body = response.getBody();
            if (body == null || !body.containsKey("data")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No streets found for city: " + streetName);
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>)
                    ((Map) body.get("data")).get("results");

            return ResponseEntity.ok(results);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching streets for city: " + streetName);
        }
    }
}
