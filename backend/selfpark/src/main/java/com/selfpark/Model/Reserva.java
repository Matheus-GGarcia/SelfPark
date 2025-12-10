package com.selfpark.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "data_entrada")
    private LocalDateTime entradaData;

    @Column(name = "data_saida")
    private LocalDateTime saidaData;

    @Column(name = "status_pagamento")
    private String status_pagamento;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;  // Mude de idUsuario para usuario

    @ManyToOne
    @JoinColumn(name = "id_placa")
    private Placa placa;  // Mude de idPlaca para placa


    public Integer getId(){
        return id;
    }
    public LocalDateTime getDataEntrada(){
        return entradaData;
    }
    public LocalDateTime getDataSaida(){
        return saidaData;
    }
    public String getPagamento(){
        return status_pagamento;
    } 

    public void setId(Integer id) {
        this.id = id;
    }
    public void setDataEntrada(LocalDateTime data){
        this.entradaData = data;
    }
    public void setDataSaida(LocalDateTime data){
        this.saidaData = data;
    }
    public void setPagamento(String paga){
        this.status_pagamento = paga;
    } 
}


