package com.selfpark.Model;

import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "tb_pagamento")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPagamento;

    private Double valor;
    private String metodo;
    private String status;
    private LocalDate dataPagamento;

    @ManyToOne
    @JoinColumn(name = "id_reserva")
    private Reserva reserva;

    public Double getValor() {return valor;}
    public void setValor(Double valor) {this.valor = valor;}

    public String getMetodo() {return metodo;}
    public void setMetodo(String metodo) {this.metodo = metodo;}

    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}

    public LocalDate getDataPagamento() {return dataPagamento;}
    public void setDataPagamento(LocalDate dataPagamento) {this.dataPagamento = dataPagamento;}

    public Reserva getReserva() {return reserva;}
    public void setReserva(Reserva reserva) {this.reserva = reserva;}

}