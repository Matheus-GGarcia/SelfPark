package com.selfpark.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "tb_pjuridica")
public class UsuarioPJ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pj")
    private Integer id_pj;

    @Column(name = "empresa")
    private String empresa;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "senha")
    private String senha;

    @Column(name = "cnpj")
    private String cnpj;


    public String getCnpj() {return cnpj;}
    public String getSenha() {return senha;}
    public String getTelefone() {return telefone;}
    public String getEmail() {return email;}
    public String getEmpresa() {return empresa;}
    public int getId_pj() {return id_pj;}

    public void setCnpj(String cnpj) {this.cnpj = cnpj;}
    public void setSenha(String senha) {this.senha = senha;}
    public void setTelefone(String telefone) {this.telefone = telefone;}
    public void setEmail(String email) {this.email = email;}
    public void setEmpresa(String empresa) {this.empresa = empresa;}

}
