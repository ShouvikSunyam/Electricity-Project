package com.tarifvergleich.electricity.dto;

import java.math.BigInteger;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListOfHolidaysDto {

	private Long holidayId;

	private String name;

	private LocalDate startDate;
	private LocalDate endDate;

	private Integer year;

	// PUBLIC or COMPANY
	private String holidayType;

	private Integer adminId;

	private BigInteger createdOn;
	private BigInteger updatedOn;

	private String rangeId;
}
