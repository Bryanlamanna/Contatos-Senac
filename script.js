const novoBtn = document.querySelector('.novo-btn');
const cadForm = document.querySelector('.cadastrar');
const cancelarBtn = document.querySelector('.cancelar-btn');
const edForm = document.querySelector('.editar');
let cadFormShow = false;
let edFormShow = false;
const details = document.querySelector('.detalhes');
const nameDetails = document.querySelector('.nome');
const telefoneDetails = document.querySelector('.telefone');
const sobrenomeDetails = document.querySelector('#sobrenomeDt');
const emailDetails = document.querySelector('#emailDt');
const enderecoDetails = document.querySelector('#enderecoDt');
const notasDetails = document.querySelector('#notasDt');
const cadastrarBtn = document.querySelector('.cadastrar-btn');
let contatinhos = JSON.parse(localStorage.getItem('contatos')) || [];
const formularioCad = document.querySelector('.cadastrarForm');
const formularioEd = document.querySelector('.editarForm');
const tableContatos = document.querySelector('.table');
const idc = document.querySelector('#idc');
const deleteBtn = document.querySelector('#deletar');
const editBtn = document.querySelector('#editar');
const salvarEd = document.querySelector('.editar-btn');
const cancelEd = document.querySelector('.cancelar-ed-btn');

cancelEd.addEventListener('click', ()=>{
    edForm.style.display = 'none';
    edFormShow = false;
})

salvarEd.addEventListener('click', ()=>{
    let index = idc.value;
    console.log(index)
    editarContato(index);
    window.location.reload();
})

editBtn.addEventListener('click', ()=>{
    
    edFormShow = !edFormShow;

    if(edFormShow){

        let index = idc.value;

        let contato = contatinhos[index];

        document.querySelector('#nomeEd').value = contato.nome;
        document.querySelector('#sobrenomeEd').value = contato.sobrenome;
        document.querySelector('#emailEd').value = contato.email;
        document.querySelector('#telefoneEd').value = contato.telefone;
        document.querySelector('#enderecoEd').value = contato.endereco;
        document.querySelector('#notasEd').value = contato.notas;

        edForm.style.display = 'block';


    } else {
        edForm.style.display = 'none';
    }

})

deleteBtn.addEventListener('click', () =>{

    let confirmation = confirm('Tem certeza que deseja deletar este contato?');

    if(confirmation == true){
        contatinhos.splice(idc.value, 1);

        localStorage.setItem('contatos', JSON.stringify(contatinhos));
    
        window.location.reload();
    } else {
        return;
    }
    
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
        formularioCad.reset();
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
        formularioCad.reset();

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

async function editarContato(id) {
    let contato = contatinhos[id];

    let nome = document.querySelector('#nomeEd').value;
    let sobrenome = document.querySelector('#sobrenomeEd').value;
    let email = document.querySelector('#emailEd').value;
    let telefone = document.querySelector('#telefoneEd').value;
    let endereco = document.querySelector('#enderecoEd').value;
    let notas = document.querySelector('#notasEd').value;

    contato.nome = nome;
    contato.sobrenome = sobrenome;
    contato.email = email;
    contato.telefone = telefone;
    contato.endereco = endereco;
    contato.notas = notas;

    if (checkBlanks(contato)) {
        formularioEd.reset();
        contatinhos[id] = contato;
        localStorage.setItem('contatos', JSON.stringify(contatinhos));
        alert('Contato editado com sucesso!');
        await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 100ms antes de recarregar a página
        window.location.reload();
    } else {
        alert('Por favor, preencha todos os campos');
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

