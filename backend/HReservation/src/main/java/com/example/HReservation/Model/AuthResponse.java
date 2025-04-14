package com.example.HReservation.Model;

public class AuthResponse {
    private String token;
    private String message;
    private String role;
    private Long id;
    private String email;
    private String firstName;  // Nombre del usuario
    private String lastName;   // Apellido del usuario


    public AuthResponse(String token, String message, String role, String email, String firstName, String lastName, Long id) {
        this.token = token;
        this.message = message;
        this.role = role;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id=id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

}
