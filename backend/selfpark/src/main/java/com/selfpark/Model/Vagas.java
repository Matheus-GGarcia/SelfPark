package com.selfpark.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "tb_vagas")
public class Vagas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVaga;

    private Integer numerosVagas;
    private String tipo;
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_estacionamento")
    private Estacionamento estacionamento;

    


    public Integer getNumerosVagas() {return numerosVagas;}
    public void setNumerosVagas(Integer numerosVagas) {this.numerosVagas = numerosVagas;}

    public String getTipo() {return tipo;}
    public void setTipo(String tipo) {this.tipo = tipo;}

    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}

    public Estacionamento getEstacionamento() {return estacionamento;}
    public void setEstacionamento(Estacionamento estacionamento) {this.estacionamento = estacionamento;}

}