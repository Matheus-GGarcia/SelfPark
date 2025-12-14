package com.SelfPark.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String nome;
    private String senha; // Considere usar hash na prática
    private String placa;

    // Relacionamento com Placa (um usuário pode ter várias placas)
    @OneToMany(mappedBy = "usuario")
    private List<Placa> placas;

    // Relacionamento com Reserva (um usuário pode ter várias reservas)
    @OneToMany(mappedBy = "usuario")
    private List<Reserva> reservas;

    // Construtores
    public Usuario() {}

    public Usuario(String email, String nome, String telefone) {
        this.email = email;
        this.nome = nome;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }


    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public List<Reserva> getReservas() { return reservas; }
    public void setReservas(List<Reserva> reservas) { this.reservas = reservas; }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public List<Placa> getPlacas() {
        return placas;
    }

    public void setPlacas(List<Placa> placas) {
        this.placas = placas;
    }
}