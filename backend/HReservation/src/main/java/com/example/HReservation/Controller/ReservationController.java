package com.example.HReservation.Controller;

import com.example.HReservation.Model.Reservation;
import com.example.HReservation.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/reservaciones")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/unavailable-dates/{productId}")
    public ResponseEntity<List<String>> getUnavailableDates(@PathVariable Long productId) {
        List<LocalDate> unavailableDates = reservationService.getUnavailableDates(productId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        List<String> formattedDates = unavailableDates.stream()
                .map(date -> date.format(formatter))
                .collect(Collectors.toList());
        return ResponseEntity.ok(formattedDates);
    }

    @PostMapping("/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        try {
            Reservation savedReservation = reservationService.createReservation(reservation);

            // Cargar los datos completos de producto y usuario
            savedReservation.setProduct(savedReservation.getProduct());
            savedReservation.setUser(savedReservation.getUser());

            return ResponseEntity.ok(savedReservation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/is-available")
    public ResponseEntity<Boolean> isDateAvailable(
            @RequestParam Long productId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        boolean available = reservationService.isDateAvailable(productId, start, end);
        return ResponseEntity.ok(available);
    }
}

