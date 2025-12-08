
package com.selfpark.Model;


import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "tb_usuario")
public class Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "senha")
    private String senha;

    @OneToMany(mappedBy = "usuario")
    private List<Veiculo> veiculos;

    public String getNome() {return nome;}
    public String getTelefone() {return telefone;}
    public String getSenha() {return senha;}
    public String getEmail() {return email;}

    public int getId() {return id;}

    public void setNome(String nome) {this.nome = nome;}
    public void setEmail(String email) {this.email = email;}
    public void setTelefone(String telefone) {this.telefone = telefone;}
    public void setSenha(String senha) {this.senha = senha;}





@Entity
@Table(nome = "tb_usuario")
public class Usuario{
    

}