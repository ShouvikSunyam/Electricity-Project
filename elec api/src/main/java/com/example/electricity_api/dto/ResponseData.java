package com.example.electricity_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class ResponseData {
    private List<AddressDetails> result;
}
