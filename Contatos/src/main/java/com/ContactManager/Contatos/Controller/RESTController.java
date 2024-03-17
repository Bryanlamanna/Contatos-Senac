package com.ContactManager.Contatos.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ContactManager.Contatos.Model.Contato;
import com.ContactManager.Contatos.Service.RESTServices;


@RestController
@RequestMapping("/api")
public class RESTController {
    
     @Autowired
     private RESTServices restServices;

     @PostMapping("/new")
     public ResponseEntity<Contato> newContato(@RequestBody Contato contato){
        Contato newContato = restServices.newContato(contato);
        return new ResponseEntity<>(newContato,HttpStatus.CREATED); 
     }

     @GetMapping("/get/{id}")
     public ResponseEntity<Contato> getContato(@PathVariable Integer id){
        Contato contato = restServices.getContato(id);
        return new ResponseEntity<>(contato,HttpStatus.OK);
     }

     @GetMapping("/list")
     public ResponseEntity<List<Contato>> getAllContatos(){
         List<Contato> contatos = restServices.getAllContatos();
         return new ResponseEntity<>(contatos,HttpStatus.OK);
     }

     @DeleteMapping("/delete/{id}")
     public ResponseEntity<?> deleteContato(@PathVariable Integer id){
        restServices.deleteContato(id);
        return new ResponseEntity<>(HttpStatus.OK);
     }

     @PutMapping("/update/{id}")
     public ResponseEntity<Contato> updateContato(@PathVariable Integer id, @RequestBody Contato contato){
        Contato updatedContato = restServices.updateContato(id,contato);
        return new ResponseEntity<>(updatedContato,HttpStatus.OK);
     }

}
