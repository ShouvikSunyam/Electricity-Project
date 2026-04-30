package com.tarifvergleich.electricity.dto;

import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tarifvergleich.electricity.model.ListOfHolidays;

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

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;

	// PUBLIC or COMPANY
	private String holidayType;

	private Integer adminId;

	private BigInteger createdOn;
	private BigInteger updatedOn;

	private String rangeId;
	
	private Integer year;

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class ListOfHolidaysResponseDto {

		private Long holidayId;
		private String name;
		private BigInteger startDate;
		private BigInteger endDate;

		// PUBLIC or COMPANY
		private String holidayType;
		private BigInteger createdOn;
		private String rangeId;
	}

	public static ListOfHolidaysResponseDto mapAdminListOfHolidays(ListOfHolidays holidays) {
		if (holidays == null)
			return null;
		
		return ListOfHolidaysResponseDto.builder().holidayId(holidays.getId()).rangeId(holidays.getRangeId())
				.name(holidays.getName()).startDate(holidays.getStartDate()).endDate(holidays.getEndDate())
				.holidayType(holidays.getHolidayType()).createdOn(holidays.getCreatedOn()).build();
	}

	public static String getMonthName(ListOfHolidaysResponseDto dto) {
		if (dto == null || dto.getStartDate() == null)
			return null;
		
		long val = dto.getStartDate().longValue();
	    Instant instant = (val > 10000000000L) ? Instant.ofEpochMilli(val) : Instant.ofEpochSecond(val);

		return instant.atZone(ZoneId.of("Europe/Berlin")).getMonth()
				.getDisplayName(TextStyle.FULL, Locale.ENGLISH);
	}
}
