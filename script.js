const cadastrarBtn = document.querySelector('.cadastrar-btn');
const cadForm = document.querySelector('.cadastrar');
const cancelarBtn = document.querySelector('.cancelar-btn');
let cadFormShow = false;
const contatos = document.querySelectorAll('.table td');
const details = document.querySelector('.detalhes');
const nameDetails = document.querySelector('.nome');

cancelarBtn.addEventListener('click', () => {
    if (cadFormShow) {
        cadForm.style.display = 'none';
    }
})

cadastrarBtn.addEventListener('click', () => {
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