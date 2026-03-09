package com.example.electricity_api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ElectricityRequest {
    private String userType;
    private String consumptionType;
    private String zipCode;
    private String city;
    private String street;
    private String houseNumber;
    private Integer annualConsumption;
}
