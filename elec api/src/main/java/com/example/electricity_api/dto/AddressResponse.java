package com.example.electricity_api.dto;


import java.util.List;

public class AddressResponse {
    private String city;
    private List<Double> coordinates; // list of 4 coords

    public AddressResponse(String city, List<Double> coordinates) {
        this.city = city;
        this.coordinates = coordinates;
    }

    // Getters and setters (or use Lombok @Data)
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public List<Double> getCoordinates() {
        return coordinates;
    }
    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }
}
