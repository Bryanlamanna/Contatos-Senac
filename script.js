const novoBtn = document.querySelector('.novo-btn');
const cadForm = document.querySelector('.cadastrar');
const cancelarBtn = document.querySelector('.cancelar-btn');
let cadFormShow = false;
const details = document.querySelector('.detalhes');
const nameDetails = document.querySelector('.nome');
const telefoneDetails = document.querySelector('.telefone');
const sobrenomeDetails = document.querySelector('#sobrenomeDt');
const emailDetails = document.querySelector('#emailDt');
const enderecoDetails = document.querySelector('#enderecoDt');
const notasDetails = document.querySelector('#notasDt');
const cadastrarBtn = document.querySelector('.cadastrar-btn');
let contatinhos = JSON.parse(localStorage.getItem('contatos')) || [];
const formulario = document.querySelector('form');
const tableContatos = document.querySelector('.table');
const idc = document.querySelector('#idc');
const deleteBtn = document.querySelector('#deletar');

deleteBtn.addEventListener('click', () =>{

    contatinhos.splice(idc.value, 1);

    localStorage.setItem('contatos', JSON.stringify(contatinhos));

    window.location.reload();
});

document.querySelector('.tabela-body').addEventListener('click', function(event) {
    let elementoClicado = event.target;

    // Verifica se o elemento clicado é uma celula da tabela
    if (elementoClicado.tagName === 'TD') {
        // Coloque aqui o código para exibir a mensagem ou qualquer ação desejada
        let index = elementoClicado.parentNode.rowIndex;
        
        let contato = contatinhos[index- 1];

        idc.value = index -1;

        nameDetails.textContent = contato.nome;
        telefoneDetails.textContent = contato.telefone;
        sobrenomeDetails.textContent = contato.sobrenome;
        emailDetails.textContent = contato.email;
        enderecoDetails.textContent = contato.endereco;
        notasDetails.textContent = contato.notas;
        
        details.style.display = 'block';

    }
})

cancelarBtn.addEventListener('click', () => {
        formulario.reset();
        cadForm.style.display = 'none';
        cadFormShow = false;
})

novoBtn.addEventListener('click', () => {
    if (cadFormShow) {
        cadForm.style.display = 'none';
        cadFormShow = false;
    } else {
        cadForm.style.display = 'block';
        cadFormShow = true;
    }
})

function cadastrar() {
    event.preventDefault();

    let id;

    if (contatinhos === null) {
        id = 1;
    } else {
        id = contatinhos.length + 1;
    }
    
    let nome = document.querySelector('#nome').value;
    let sobrenome = document.querySelector('#sobrenome').value;
    let email = document.querySelector('#email').value;
    let telefone = document.querySelector('#telefone').value;
    let endereco = document.querySelector('#endereco').value;
    let notas = document.querySelector('#notas').value;

    let contato = {
        id: id,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        notas: notas
    }

    if (checkBlanks(contato)) {
        formulario.reset();

        if (contatinhos === null) {
            contatinhos = [];
        }
    
        contatinhos.push(contato);
    
        console.log(contatinhos);
    
        localStorage.setItem('contatos', JSON.stringify(contatinhos));
    
        window.location.reload();

        
    } else {
        alert('Por favor, preencha todos os campos');
    }
   
}

function carregarContatos() {
    
    if (contatinhos.length < 0) {
        return;
        
    }
  
        for (let i = 0; i < contatinhos.length; i++) {
        
            let contato = contatinhos[i];
    
            // Seleciona a tabela
            let tabela = document.querySelector('.table');
    
            // Cria um novo elemento de linha (tr)
            let novaLinha = document.createElement('tr');
    
            // Cria uma célula de dados (td) para conter o nome
            let novaCelula = document.createElement('td');

            novaCelula.classList.add('td-nome');
    
            // Define o texto dentro da célula de dados (td)
            novaCelula.textContent = contato.nome;
    
            // Adiciona a célula de dados à linha
            novaLinha.appendChild(novaCelula);
    
            // Adiciona a linha à tabela
            tabela.querySelector('tbody').appendChild(novaLinha);
    
    }

    
}


function checkBlanks(contato) {
    
    if (contato.nome === '' || contato.sobrenome === '' || contato.email === '' || contato.telefone === '' || contato.endereco === '') {
        return false;
    }
        return true;
}

cadastrarBtn.addEventListener('click', cadastrar);

carregarContatos()

