package com.ContactManager.Contatos.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ContactManager.Contatos.Model.Contato;
import com.ContactManager.Contatos.Repository.ContatoRepository;

@Service
public class RESTServices {
    
    @Autowired
    private ContatoRepository contatoRepository;
    
    public Contato newContato(Contato contato){
        contato.setIdContato(null);
        contatoRepository.save(contato);
        return contato;
    }

    public List<Contato> getAllContatos(){
        return contatoRepository.findAll();
    }

    public Contato getContato(Integer id){
        return contatoRepository.findById(id).orElseThrow();
    }

    public boolean deleteContato(Integer id){
         Contato contato = contatoRepository.findById(id).get();

         if(contato == null){
             return false;
         } else {
            contatoRepository.deleteById(contato.getIdContato());
            return true;
         }
    }

    public Contato updateContato(Integer id,Contato contato){

        Contato oldContato = contatoRepository.findById(id).get();

        if(oldContato == null){
            return null;
        } else {
            oldContato.setNome(contato.getNome());
            oldContato.setSobrenome(contato.getSobrenome());
            oldContato.setEmail(contato.getEmail());
            oldContato.setTelefone(contato.getTelefone());
            oldContato.setEndereco(contato.getEndereco());
            oldContato.setNotas(contato.getNotas());
            contatoRepository.save(oldContato);
            return oldContato;
        }
    }

}
