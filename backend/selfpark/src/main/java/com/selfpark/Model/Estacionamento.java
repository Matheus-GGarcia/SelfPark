package com.selfpark.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_estacionamento")
public class Estacionamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_estacionamento;

    @Column(name = "nome")
    private String nome ;

    @Column(name = "endereco")
    private String endereco ;

    @Column(name = "cidade")
    private String cidade ;

    @Column(name = "total_vaga")
    private int total_vaga ;


    public int getTotal_vag() {return total_vaga;}
    public void setTotal_vag(int total_vag) {this.total_vaga = total_vag;}

    public String getCidade() {return cidade;}
    public void setCidade(String cidade) {this.cidade = cidade;}

    public String getEndereco() {return endereco;}
    public void setEndereco(String endereco) {this.endereco = endereco;}

    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}


}
