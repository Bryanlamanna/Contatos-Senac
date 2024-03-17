
package com.ContactManager.Contatos.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ContactManager.Contatos.Model.Contato;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Integer> {
    
}
