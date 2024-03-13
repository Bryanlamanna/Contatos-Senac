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
const pesquisar = document.querySelector('#pesquisar');
const searchBtn = document.querySelector('.search-btn');

console.log(contatinhos)

pesquisar.addEventListener('keyup', function(event){

    if (event.keyCode === 13){
        buscarContatos();
    }
    
})

searchBtn.addEventListener('click', ()=>{
    buscarContatos();
    pesquisar.value = '';    
})

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

        let contato = localizarContato(index);

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

    // Verifica se o elemento clicado é uma célula da tabela
    if (elementoClicado.tagName === 'TD') {
        // Obtém a linha (tr) pai do elemento clicado
        let linha = elementoClicado.parentNode;

        // Obtém a célula oculta (segunda célula) da mesma linha
        let celulaId = linha.querySelector('.hidden');

        // Obtém o ID do contato da célula oculta
        let idContato = celulaId.textContent;

        

        // Encontra o contato correspondente pelo ID
        let contato = localizarContato(idContato);


        // Verifica se o contato foi encontrado
        if (contato) {
            // Atualiza os detalhes com as informações do contato
            idc.value = idContato;
            nameDetails.textContent = contato.nome;
            telefoneDetails.textContent = contato.telefone;
            sobrenomeDetails.textContent = contato.sobrenome;
            emailDetails.textContent = contato.email;
            enderecoDetails.textContent = contato.endereco;
            notasDetails.textContent = contato.notas;
            
            details.style.display = 'block'; // Exibe os detalhes
        } else {
            console.log('Contato não encontrado!');
        }
    }
});

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
    if (contatinhos.length === 0) { // Correção na verificação de lista vazia
        return;
    }

    for (let i = 0; i < contatinhos.length; i++) {
        let contato = contatinhos[i];
        let tabela = document.querySelector('.table');
        let novaLinha = document.createElement('tr');

        // Célula de dados para o nome do contato
        let novaCelulaNome = document.createElement('td');
        novaCelulaNome.textContent = contato.nome;
        novaLinha.appendChild(novaCelulaNome);

        // Célula de dados para o ID do contato (oculta)
        let novaCelulaId = document.createElement('td');
        novaCelulaId.textContent = contato.id;
        novaCelulaId.classList.add('hidden'); // Adiciona uma classe para torná-la oculta
        novaLinha.appendChild(novaCelulaId);

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

function limparTabela() {

    let tbody = document.querySelector('.table tbody');
    tbody.innerHTML = '';
}

function localizarContato(id) {

    for (let i = 0; i < contatinhos.length; i++) {
        var contato = contatinhos[i];
        if (contato.id.toString() === id) {
            
            return contato;
        } 
    }
    return null;
}

function buscarContatos() {

    let resultados = [];

    let nomeBuscado = document.querySelector('#pesquisar').value;

    for (let i = 0; i < contatinhos.length; i++) {
        let contato = contatinhos[i];
        if (contato.nome === nomeBuscado) {
            resultados.push(contato);      
        } 
    }

    carregarResultados(resultados);

}

function carregarResultados(resultados) {

    limparTabela();

    for (let i = 0; i < resultados.length; i++) {
        
        let contato = resultados[i];

        // Seleciona a tabela
        let tabela = document.querySelector('.table');

        // Cria um novo elemento de linha (tr)
        let novaLinha = document.createElement('tr');

        // Célula de dados para o nome do contato
        let novaCelulaNome = document.createElement('td');
        novaCelulaNome.textContent = contato.nome;
        novaLinha.appendChild(novaCelulaNome);

        // Célula de dados para o ID do contato (oculta)
        let novaCelulaId = document.createElement('td');
        novaCelulaId.textContent = contato.id;
        novaCelulaId.classList.add('hidden'); // Adiciona uma classe para torná-la oculta
        novaLinha.appendChild(novaCelulaId);

        tabela.querySelector('tbody').appendChild(novaLinha)
}


}

cadastrarBtn.addEventListener('click', cadastrar);

carregarContatos()

