package com.example.HReservation.Service;

import com.example.HReservation.Model.Product;
import com.example.HReservation.Model.Reservation;
import com.example.HReservation.Model.User;
import com.example.HReservation.Repository.ProductRepository;
import com.example.HReservation.Repository.ReservationRepository;
import com.example.HReservation.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<LocalDate> getUnavailableDates(Long productId) {
        return reservationRepository.findUnavailableDatesByProductId(productId);
    }

    public boolean isDateAvailable(Long productId, LocalDate startDate, LocalDate endDate) {
        return !reservationRepository.existsConflictingReservations(productId, startDate, endDate);
    }

    @Transactional
    public Reservation createReservation(Reservation reservation) {
        System.out.println("Recibida solicitud de reserva:");
        System.out.println("Producto ID: " + reservation.getProduct().getId());
        System.out.println("Usuario ID: " + reservation.getUser().getId());
        if (!isDateAvailable(reservation.getProduct().getId(), reservation.getStartDate(), reservation.getEndDate())) {
            throw new IllegalArgumentException("Las fechas seleccionadas ya están reservadas.");
        }
        // Recuperar los datos completos de la base de datos antes de guardar
        Product product = productRepository.findById(reservation.getProduct().getId())
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
        User user = userRepository.findById(reservation.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        reservation.setProduct(product);
        reservation.setUser(user);

        Reservation savedReservation = reservationRepository.save(reservation);
        System.out.println("Reserva guardada con éxito:");
        System.out.println("Producto Nombre: " + savedReservation.getProduct().getProductName());
        System.out.println("Usuario Nombre: " + savedReservation.getUser().getFirstName());

        return savedReservation;
    }
    }

