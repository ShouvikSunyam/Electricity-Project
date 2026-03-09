package com.example.electricity_api.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class AddressDetails {
    private String country;
    private String state;
    private String province;
    private String city;
    private String zipcode;
    private String district1;
    private String street;
}
