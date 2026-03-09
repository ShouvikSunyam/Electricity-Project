package com.example.electricity_api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectricityRequestDTO {
    @NotBlank private String userType;
    @NotBlank
    private String consumptionType;
    @Pattern(regexp = "\\d{5}") private String zipCode;
    @NotBlank private String city;
    @NotBlank private String street;
    @NotBlank private String houseNumber;
    @Min(1) private Integer annualConsumption;
}