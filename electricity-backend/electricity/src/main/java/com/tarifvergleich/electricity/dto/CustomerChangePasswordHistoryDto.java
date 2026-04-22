package com.tarifvergleich.electricity.dto;

import java.math.BigInteger;

import com.tarifvergleich.electricity.model.CustomerChangePasswordHistory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerChangePasswordHistoryDto {

	private Integer id;
    private String email;
    private BigInteger changeRequestSubmittedOn;
    private BigInteger codeSendOn;
    private BigInteger codeVerifiedOn;
    private BigInteger passwordChangedOn;
    private BigInteger confirmationSendOn;
    private String otp;
    
    private Integer customerId;
    private Integer adminId;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CustomerChangePasswordHistoryResDto {
    	private String email;
        private BigInteger changeRequestSubmittedOn;
        private BigInteger codeSendOn;
        private BigInteger codeVerifiedOn;
        private BigInteger passwordChangedOn;
        private BigInteger confirmationSendOn;
        private String otp;
        
        private Integer customerId;
        private Integer adminId;
    }
    
    public static CustomerChangePasswordHistoryResDto mapAdminRes(CustomerChangePasswordHistory history) {
    	return CustomerChangePasswordHistoryResDto.builder()
                .email(history.getEmail())
                .otp(history.getOtp())
                .changeRequestSubmittedOn(history.getChangeRequestSubmittedOn())
                .codeSendOn(history.getCodeSendOn())
                .codeVerifiedOn(history.getCodeVerifiedOn())
                .passwordChangedOn(history.getPasswordChangedOn())
                .confirmationSendOn(history.getConfirmationSendOn())
                .customerId(history.getCustomer() != null ? history.getCustomer().getCustomerId() : null)
                .adminId(history.getAdmin() != null ? history.getAdmin().getAdminId() : null)
                .build();
    }
}
