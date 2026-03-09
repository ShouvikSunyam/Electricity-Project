package com.example.electricity_api.controller;

import com.example.electricity_api.service.DownstreamApiException;
import com.example.electricity_api.service.ElectricityService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/electricity")
public class ElectricityController {

    private final ElectricityService electricityService;

    // Constructor-based injection of the service
    @Autowired
    public ElectricityController(ElectricityService electricityService) {
        this.electricityService = electricityService;
    }

    @GetMapping("/provider")
    public ResponseEntity<String> getElectricityProvider(@RequestParam String zip,
                                                         @RequestParam String city,
                                                         @RequestParam String street,
                                                         @RequestParam String houseNumber,
                                                         @RequestParam int consum,
                                                         @RequestParam String type,
                                                         @RequestParam String branch,
                                                         @RequestParam String changeType
    ) throws JsonProcessingException {

        // Delegate the business logic to the service
        String result = electricityService.getElectricityProvider(zip, city, street, houseNumber, consum, type, branch, changeType);

        // Return the response from the external API
        return ResponseEntity.ok(result);
    }

    @GetMapping("/previous-providers")
    public ResponseEntity<String> getAllPreviousProviders() {
        try {
            String response = electricityService.getAllPreviousProviders();
            return ResponseEntity.ok(response);
        } catch (DownstreamApiException ex) {
            return ResponseEntity.status(ex.getStatus()).body(ex.getMessage());
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody String payload) {
        try {
            String result = electricityService.submitOrder(payload);
            return ResponseEntity.ok(result);

        } catch (DownstreamApiException ex) {
            // Return the real status and message to the frontend
            return ResponseEntity
                    .status(ex.getStatus())
                    .body(ex.getResponseBody());
        }
    }

}
