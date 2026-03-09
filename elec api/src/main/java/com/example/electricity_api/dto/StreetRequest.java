package com.example.electricity_api.dto;

import lombok.Data;

@Data
public class StreetRequest {
    private String street;   // street name typed by user
    private Long cityId;
}
