package com.ContactManager.Contatos.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contato")
public class Contato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idContato;
    
    private String nome;
    private String sobrenome;
    private String email;
    private String telefone;
    private String endereco;  
    private String notas;

}
