package com.selfpark.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "tb_placa")
public class Placa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "placa")
    private String placa;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;  // Mude de id_Usuario para usuario

    public Integer getId() {
        return id;
    }
    public Usuario getId_Usuario() {
        return usuario;
    }
    public String getPlaca() {
        return placa;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public void setId_Usuario(Usuario id_Usuario) {
        this.usuario = id_Usuario;
    }
    public void setPlaca(String placa) {
        this.placa = placa;
    }

}
