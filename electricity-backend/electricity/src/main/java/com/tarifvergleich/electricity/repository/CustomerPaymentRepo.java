package com.tarifvergleich.electricity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tarifvergleich.electricity.model.CustomerPayment;

@Repository
public interface CustomerPaymentRepo extends JpaRepository<CustomerPayment, Integer> {

}
