const novoBtn = document.querySelector('.novo-btn');
const cadForm = document.querySelector('.cadastrar');
const cancelarBtn = document.querySelector('.cancelar-btn');
let cadFormShow = false;
const contatos = document.querySelectorAll('.table td');
const details = document.querySelector('.detalhes');
const nameDetails = document.querySelector('.nome');
const cadastrarBtn = document.querySelector('.cadastrar-btn');
let contatinhos = JSON.parse(localStorage.getItem('contatos')) || [];
const formulario = document.querySelector('form');

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

for (let i = 0; i < contatos.length; i++) {
    contatos[i].addEventListener('click', () => {
        details.style.display = 'block';
        let name = contatos[i].textContent
        nameDetails.textContent = name;
    })
}

function cadastrar(event) {
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

    formulario.reset();

    if (contatinhos === null) {
        contatinhos = [];
    }

    contatinhos.push(contato);

    console.log(contatinhos);

    localStorage.setItem('contatos', JSON.stringify(contatinhos));

    
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
    
            // Define o texto dentro da célula de dados (td)
            novaCelula.textContent = contato.nome;
    
            // Adiciona a célula de dados à linha
            novaLinha.appendChild(novaCelula);
    
            // Adiciona a linha à tabela
            tabela.querySelector('tbody').appendChild(novaLinha);
    
    }

    
}

formulario.addEventListener('submit', cadastrar);

carregarContatos()

