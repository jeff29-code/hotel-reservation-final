package com.example.HReservation.Repository;

import com.example.HReservation.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r JOIN FETCH r.product JOIN FETCH r.user WHERE r.id = :id")
    Optional<Reservation> findByIdWithDetails(@Param("id") Long id);
    List<Reservation> findReservationsByProductId(@Param("productId") Long productId);

    @Query("SELECT COUNT(r) > 0 FROM Reservation r WHERE r.product.id = :productId " +
            "AND r.startDate <= :endDate AND r.endDate >= :startDate")
    boolean existsConflictingReservations(
            @Param("productId") Long productId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT r.startDate FROM Reservation r WHERE r.product.id = :productId")
    List<LocalDate> findUnavailableDatesByProductId(@Param("productId") Long productId);
}

