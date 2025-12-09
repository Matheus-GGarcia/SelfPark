package com.selfpark.Model;

import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "tb_notafiscal")
public class NotaFiscal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNf;

    @Column(name = "")
    private Integer numeroNf;

    @Column(name = "")
    private LocalDate dataEmissao;

    @ManyToOne
    @JoinColumn(name = "id_pagamento")
    private Pagamento pagamento;

    public Integer getNumeroNf() {return numeroNf;}
    public void setNumeroNf(Integer numeroNf) {this.numeroNf = numeroNf;}

    public LocalDate getDataEmissao() {return dataEmissao;}
    public void setDataEmissao(LocalDate dataEmissao) {this.dataEmissao = dataEmissao;}

    public Pagamento getPagamento() {return pagamento;}
    public void setPagamento(Pagamento pagamento) {this.pagamento = pagamento;}

}