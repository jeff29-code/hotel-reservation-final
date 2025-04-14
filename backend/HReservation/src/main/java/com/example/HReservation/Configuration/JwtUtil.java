package com.example.HReservation.Configuration;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.stereotype.Component;


import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode("JsdhUWiYEiV5jTzOnc9Qq9bxEmV4kJrSY0p3G/W3A1Y=")); // Clave secreta segura

    private final long expirationTime = 86400000; // 1 día en milisegundos (24 horas)

    /**
     * Genera un token JWT para el usuario dado.
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey, Jwts.SIG.HS256) // ✅ Corrección para `jjwt 0.12.3`
                .compact();
    }

    /**
     * Extrae el nombre de usuario del token JWT.
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parser() // ✅ `parser()` en lugar de `parserBuilder()`
                .verifyWith(secretKey) // ✅ Método actualizado
                .build() // ✅ Ahora es obligatorio `build()`
                .parseSignedClaims(token) // ✅ Nuevo método
                .getPayload()
                .getSubject();
    }

    /**
     * Valida si el token JWT es válido.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey) // ✅ Nuevo método en `0.12.3`
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expirado");
        } catch (MalformedJwtException e) {
            System.out.println("Token mal formado");
        } catch (SignatureException e) {
            System.out.println("Firma inválida");
        } catch (Exception e) {
            System.out.println("Token inválido");
        }
        return false;
    }
}