package com.example.electricity_api.controller;

import com.example.electricity_api.dto.AddressResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
public class AddressController {
    @Value("${google.api.key}")
    private String googleApiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    public AddressController(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }


    @GetMapping("/cities")
    public ResponseEntity<?> getAddressByZip(@RequestParam("zip") String zip) {
        System.out.println("I ma here");
        try {
            String country = "DE";
            String url = String.format(
                    "https://maps.googleapis.com/maps/api/geocode/json?components=country:%s|postal_code:%s&key=%s",
                    country, zip, googleApiKey);

            String jsonResponse = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode results = root.path("results");

            if (!results.isArray() || results.size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No results found for ZIP: " + zip);
            }

            List<Map<String, Object>> responseList = new ArrayList<>();

            for (JsonNode result : results) {
                // Extract bounding viewport coordinates
                JsonNode viewport = result.path("geometry").path("viewport");
                double southwestLat = viewport.path("southwest").path("lat").asDouble();
                double southwestLng = viewport.path("southwest").path("lng").asDouble();
                double northeastLat = viewport.path("northeast").path("lat").asDouble();
                double northeastLng = viewport.path("northeast").path("lng").asDouble();
                List<Double> coordinates = Arrays.asList(southwestLat, southwestLng, northeastLat, northeastLng);

                // Extract city name from address_components (locality + political)
                String cityName = "Unknown";
                for (JsonNode component : result.path("address_components")) {
                    JsonNode types = component.path("types");
                    boolean hasLocality = false;
                    boolean hasPolitical = false;

                    for (JsonNode typeNode : types) {
                        String type = typeNode.asText();
                        if ("locality".equals(type)) hasLocality = true;
                        if ("political".equals(type)) hasPolitical = true;
                    }

                    if (hasLocality && hasPolitical) {
                        cityName = component.path("long_name").asText();
                        break;
                    }
                }

                // Extract postcode_localities array or empty list
                JsonNode postcodeLocalitiesNode = result.path("postcode_localities");
                List<String> postcodeLocalities = new ArrayList<>();
                if (postcodeLocalitiesNode.isArray()) {
                    for (JsonNode loc : postcodeLocalitiesNode) {
                        postcodeLocalities.add(loc.asText());
                    }
                }

                // Build combined map object per result
                Map<String, Object> combinedResult = new HashMap<>();
                combinedResult.put("cityName", cityName);
                combinedResult.put("postcode_localities", postcodeLocalities);
                combinedResult.put("coordinates", coordinates);

                responseList.add(combinedResult);
            }

            return ResponseEntity.ok(responseList);

        } catch (Exception e) {
            logger.error("Error fetching address for zip " + zip, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing request");
        }
    }



    @GetMapping("/streets")
    public ResponseEntity<?> getStreetNames(
            @RequestParam("southwestLat") double southLat,
            @RequestParam("southwestLng") double westLng,
            @RequestParam("northeastLat") double northLat,
            @RequestParam("northeastLng") double eastLng) {

        try {
            String overpassQuery = String.format(Locale.US,
                    "[out:json][timeout:25];" +
                            "way[\"highway\"](%f,%f,%f,%f);" +
                            "out tags;",
                    southLat, westLng, northLat, eastLng);

            String url = "https://overpass-api.de/api/interpreter";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);

            // Send raw string as body, no MultiValueMap
            HttpEntity<String> requestEntity = new HttpEntity<>(overpassQuery, headers);

            // Use POST here, not GET
            ResponseEntity<String> response = restTemplate.exchange(
                    url, HttpMethod.POST, requestEntity, String.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                return ResponseEntity.status(response.getStatusCode())
                        .body("Error from Overpass API");
            }

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode elements = root.path("elements");

            Set<String> streetNames = new TreeSet<>(); // Sorted, unique names

            for (JsonNode element : elements) {
                JsonNode tags = element.path("tags");
                if (tags.has("name")) {
                    streetNames.add(tags.get("name").asText());
                }
            }

            return ResponseEntity.ok(streetNames);

        } catch (Exception e) {
            logger.error("Error fetching street names", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing street request");
        }
    }

    @GetMapping("/streets-by-zip")
    public ResponseEntity<?> getStreetsByZip(@RequestParam("zip") String zip) {
        try {
            // Step 1: Get city info from Google
            String country = "DE";
            String geocodeUrl = String.format(
                    "https://maps.googleapis.com/maps/api/geocode/json?components=country:%s|postal_code:%s&key=%s",
                    country, zip, googleApiKey);

            String geoResponse = restTemplate.getForObject(geocodeUrl, String.class);
            JsonNode geoRoot = objectMapper.readTree(geoResponse);
            JsonNode results = geoRoot.path("results");

            if (!results.isArray() || results.size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No results found for ZIP: " + zip);
            }

            // Step 2: Extract bounding box of first result
            JsonNode viewport = results.get(0).path("geometry").path("viewport");
            double southLat = viewport.path("southwest").path("lat").asDouble();
            double westLng = viewport.path("southwest").path("lng").asDouble();
            double northLat = viewport.path("northeast").path("lat").asDouble();
            double eastLng = viewport.path("northeast").path("lng").asDouble();

            // Step 3: Query Overpass API for streets
            String overpassQuery = String.format(Locale.US,
                    "[out:json][timeout:25];" +
                            "way[\"highway\"](%f,%f,%f,%f);" +
                            "out tags;",
                    southLat, westLng, northLat, eastLng);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.TEXT_PLAIN);
            HttpEntity<String> requestEntity = new HttpEntity<>(overpassQuery, headers);

            ResponseEntity<String> overpassResponse = restTemplate.exchange(
                    "https://overpass-api.de/api/interpreter",
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(overpassResponse.getBody());
            JsonNode elements = root.path("elements");

            Set<String> streetNames = new TreeSet<>();
            for (JsonNode element : elements) {
                JsonNode tags = element.path("tags");
                if (tags.has("name")) {
                    streetNames.add(tags.get("name").asText());
                }
            }

            // Step 4: Return results
            Map<String, Object> response = new HashMap<>();
            response.put("zip", zip);
            response.put("city", results.get(0).path("address_components")
                    .get(0).path("long_name").asText());
            response.put("streets", streetNames);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error fetching streets for ZIP " + zip, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching streets");
        }
    }

    @GetMapping("/validate-address")
    public ResponseEntity<?> validateAddress(
            @RequestParam("street") String street,
            @RequestParam("housenumber") String houseNumber,
            @RequestParam("postcode") String postcode) {

        if (street == null || street.isBlank() ||
                houseNumber == null || houseNumber.isBlank() ||
                postcode == null || postcode.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("valid", false, "message", "Missing required fields"));
        }

        try {
            // Prepare the request payload
            ObjectNode requestBody = objectMapper.createObjectNode();
            ObjectNode address = requestBody.putObject("address");
            address.put("regionCode", "DE");
            address.putArray("addressLines").add(street + " " + houseNumber);
            address.put("postalCode", postcode);

            // Call the Google Address Validation API
            String url = "https://addressvalidation.googleapis.com/v1:validateAddress?key=" + googleApiKey;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                return ResponseEntity.status(response.getStatusCode())
                        .body(Map.of("valid", false, "message", "Error from Google Address Validation API"));
            }

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode result = root.path("result");
            JsonNode verdict = result.path("verdict");
            JsonNode addressNode = result.path("address");
            JsonNode location = result.path("geocode").path("location");

            boolean hasUnconfirmed = verdict.path("hasUnconfirmedComponents").asBoolean(false);

            // If street_number or others are unconfirmed, mark as invalid
            if (hasUnconfirmed) {
                return ResponseEntity.ok(Map.of(
                        "valid", false,
                        "message", "Address has unconfirmed components",
                        "formatted_address", addressNode.path("formattedAddress").asText(),
                        "location", Map.of(
                                "lat", location.path("latitude").asDouble(),
                                "lng", location.path("longitude").asDouble()
                        )
                ));
            }

            // Otherwise, it's a confirmed, valid address
            return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "formatted_address", addressNode.path("formattedAddress").asText(),
                    "location", Map.of(
                            "lat", location.path("latitude").asDouble(),
                            "lng", location.path("longitude").asDouble()
                    )
            ));

        } catch (Exception e) {
            logger.error("Google Address Validation failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("valid", false, "message", "Internal error validating address"));
        }
    }

}
