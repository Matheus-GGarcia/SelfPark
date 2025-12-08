package com.selfpark.Model;

import jakarta.persistence.*;
import java.time.*;


@Entity
@Table(name = "tb_reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;

    private LocalDate dataReserva;
    private LocalDateTime horaInicial;
    private LocalDateTime horaFim;

    @ManyToOne
    @JoinColumn(name = "id_estacionamento")
    private Estacionamento estacionamento;

    @ManyToOne
    @JoinColumn(name = "id_veiculo")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "id_vagas")
    private Vagas vaga;

    public LocalDate getDataReserva() {return dataReserva;}
    public void setDataReserva(LocalDate dataReserva) {this.dataReserva = dataReserva;}

    public LocalDateTime getHoraInicial() {return horaInicial;}
    public void setHoraInicial(LocalDateTime horaInicial) {this.horaInicial = horaInicial;}

    public LocalDateTime getHoraFim() {return horaFim;}
    public void setHoraFim(LocalDateTime horaFim) {this.horaFim = horaFim;}

    public Estacionamento getEstacionamento() {return estacionamento;}
    public void setEstacionamento(Estacionamento estacionamento) {this.estacionamento = estacionamento;}

    public Veiculo getVeiculo() {return veiculo;}
    public void setVeiculo(Veiculo veiculo) {this.veiculo = veiculo;}

    public Vagas getVaga() {return vaga;}
    public void setVaga(Vagas vaga) {this.vaga = vaga;}

}