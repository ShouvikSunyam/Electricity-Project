package com.tarifvergleich.electricity.dto;

import java.time.LocalDate;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tarifvergleich.electricity.model.CustomerContactSchedule;
import com.tarifvergleich.electricity.util.Helper;

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
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate scheduleDate;

	private Integer adminId;

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class CustomerContactScheduleResponse {
		private Integer id;
		private String dayOfWeek;
		private String timeSlot;
		private String description;
	}

	public static CustomerContactScheduleResponse getContactScheduleResponse(CustomerContactSchedule schedule) {

		if (schedule == null)
			return null;

		Map<String, Object> formattedTime = Helper.getLocalDateTimeFromBigInteger(schedule.getScheduleDate());
		String timeSlot = formattedTime.get("date").toString() + " "+ formattedTime.get("monthName").toString() + ", " + formattedTime.get("dayOfWeek").toString() + " "
				 + " " + formattedTime.get("year").toString();
		
		String[] getAmPmFormat = schedule.getTimeSlot().split("-");
		
		for (int i = 0; i < getAmPmFormat.length; i++) {
			if(Integer.parseInt(getAmPmFormat[i]) >= 12)
				getAmPmFormat[i] = getAmPmFormat[i] + " P.M.";
			else
				getAmPmFormat[i] = getAmPmFormat[i] + " A.M.";
		}
		
		timeSlot = timeSlot + ",  "+ String.join(" - ", getAmPmFormat);

		return CustomerContactScheduleResponse.builder().id(schedule.getId()).dayOfWeek(schedule.getDayOfWeek())
				.timeSlot(timeSlot).description(schedule.getDescription()).build();
	}
}
