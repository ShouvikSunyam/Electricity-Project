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

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "customer_payment")
@Getter
@Setter
@Entity
public class CustomerPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "payment_method")
	private String paymentMethod;
	
	private String iban;
	
	@Column(name = "account_holder_first_name")
	private String accountHolderFirstName;
	
	@Column(name = "account_holder_last_name")
	private String accountHolderLastName;
	
	@Column(name = "sepa-concent")
	private Boolean sepaConsent;
	
	private BigInteger createdOn;
	
	@OneToOne(mappedBy = "customerPayment")
	@JsonIgnore
	private CustomerDelivery customerDeliveryId;
	
	@PrePersist
	protected void onCreate() {
		createdOn = Helper.getCurrentTimeBerlin();
	}
	
}
