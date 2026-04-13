package com.tarifvergleich.electricity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerContactScheduleRequestDto {

	private Integer id;
	private Integer customerId;
	private Integer deliveryId;
    private String dayOfWeek;
    private String timeSlot;
    private String description;
}
