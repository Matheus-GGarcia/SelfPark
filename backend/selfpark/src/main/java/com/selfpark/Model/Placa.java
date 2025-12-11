
package com.SelfPark.Model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_placa")
public class Placa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroPlaca;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnore
    private Usuario usuario;

    public Placa() {}

    public Placa(String numeroPlaca) {
        this.numeroPlaca = numeroPlaca;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumeroPlaca() { return numeroPlaca; }
    public void setNumeroPlaca(String numeroPlaca) { this.numeroPlaca = numeroPlaca; }


    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}