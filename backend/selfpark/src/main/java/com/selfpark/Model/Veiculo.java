package com.selfpark.Model;


import jakarta.persistence.*;
import org.springframework.context.annotation.Primary;

@Entity
@Table(name = "tb_veiculo")
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_veiculo;

    @Column(name = "placa")
    private String placa;
    @Column(name = "modelo")
    private String modelo;
    @Column(name = "cor")
    private String cor;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    public void setPlaca(String placa) {this.placa = placa;}
    public void setCor(String cor) {this.cor = cor;}
    public void setModelo(String modelo) {this.modelo = modelo;}
    public String getCor() {return cor;}
    public String getModelo() {return modelo;}
    public String getPlaca() {return placa;}

}
