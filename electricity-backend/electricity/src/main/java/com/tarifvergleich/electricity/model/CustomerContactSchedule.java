package com.tarifvergleich.electricity.model;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tarifvergleich.electricity.util.Helper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name = "customer_contact_schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerContactSchedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "day")
	private String dayOfWeek;
	
	@Column(name = "time_slot")
	private String timeSlot;
	
	private String description;
	
	private BigInteger scheduleDate;
	
	@OneToOne(mappedBy = "customerSchedule")
	@JsonIgnore
	private CustomerDelivery customerDelivery;
	
	@Column(name = "created_on")
	private BigInteger createdOn;
	
	@PrePersist
	protected void onCreate() {
		createdOn = Helper.getCurrentTimeBerlin();
	}
}
