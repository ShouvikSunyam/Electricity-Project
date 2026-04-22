package com.tarifvergleich.electricity.model;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tarifvergleich.electricity.util.Helper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_change_password_history")
@Setter
@Getter
@Builder
public class CustomerChangePasswordHistory {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "change_request_submitted_on")
	private BigInteger changeRequestSubmittedOn;
	
	private String email;
	
	private String otp;
	
	@Column(name = "code_send_on")
	private BigInteger codeSendOn;
	
	@Column(name = "code_verified_on")
	private BigInteger codeVerifiedOn;
	
	@Column(name = "wrong_code_last_tried_on")
	private BigInteger wrongCodeLastTriedOn;
	
	@Column(name = "password_changed_on")
	private BigInteger passwordChangedOn;
	
	@Column(name = "confirmation_send_on")
	private BigInteger confirmationSendOn;
	
	@ManyToOne
	@JoinColumn(name = "customer_id")
	@JsonIgnore
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name = "admin_id")
	@JsonIgnore
	private AdminUser admin;
	
	@PrePersist
	protected void onCreate() {
		this.changeRequestSubmittedOn = Helper.getCurrentTimeBerlin();
	}
	
	public void setCustomerRef(Customer customer) {
		this.customer = customer;
	}
	
	public void setAdminRef(AdminUser admin) {
		this.admin = admin;
	}
	
	
}
