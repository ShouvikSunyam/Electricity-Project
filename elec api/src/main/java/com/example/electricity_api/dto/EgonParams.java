package com.example.electricity_api.dto;

import lombok.Data;

@Data
public class EgonParams {
    private String iso3 = "DEU"; // Default to Germany as per your example
    private String geo = "S";    // "S" usually stands for Suggest/Search mode
}
