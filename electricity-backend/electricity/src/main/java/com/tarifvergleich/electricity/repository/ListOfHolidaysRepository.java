package com.tarifvergleich.electricity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tarifvergleich.electricity.model.ListOfHolidays;

@Repository
public interface ListOfHolidaysRepository extends JpaRepository<ListOfHolidays, Integer> {

	List<ListOfHolidays> findAllByAdminAdminIdAndRangeIdOrderByIdAsc(Integer adminId, String rangeId);
}
