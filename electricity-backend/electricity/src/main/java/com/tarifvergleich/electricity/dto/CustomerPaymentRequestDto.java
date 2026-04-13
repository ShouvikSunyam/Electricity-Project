package com.tarifvergleich.electricity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerPaymentRequestDto {

	private Integer customerId;
    private Integer deliveryId;
    private PaymentDto paymentData;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PaymentDto{
    	private String paymentMethod;
        private String iban;
        private AccountHolderDto accountHolder;
        private Boolean sepaConsent;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AccountHolderDto {
        private String firstName;
        private String lastName;
    }

}
