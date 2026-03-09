package com.example.electricity_api.dto;

import com.example.electricity_api.dto.AddressDetails;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class EgonResponse {
    private ResponseData data;
    private StatusInfo status; // Captures API status codes
}

