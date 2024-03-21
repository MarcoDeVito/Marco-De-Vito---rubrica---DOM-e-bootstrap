/*
    Rappresentare una rubrica che contiene una lista di contatti.
    inplementare le seguenti funzionalità:
    1- Mostrare o nascondere la tabella dei contatti
    2- Popolare la tabella rubrica in modo dinamico
    3- aggiungere un nuovo contatto
    4- eliminare un contatto esistente
*/

let btnShow = document.querySelector("#btnShow");
let list = document.querySelector("#list");
let isShow = false;
//  1- Mostrare o nascondere la tabella dei contatti
btnShow.addEventListener("click", () => {
    // se la tabella NON è visibile
    if (!isShow) {
        list.classList.remove("d-none");
        btnShow.innerHTML = '<i class="bi bi-eye-slash-fill"></i> Nascondi lista';
        isShow = true;

    } else { // Altrimenti la tabella è visibile
        list.classList.add("d-none");
        btnShow.innerHTML = '<i class="bi bi-eye-fill"></i> Mostra rubrica';
        isShow = false;
    }
})

let container = document.querySelector('#container');
let inputName = document.querySelector('#inputName')
let inputNumber = document.querySelector('#inputNumber')
let btnAdd = document.querySelector('#btnAdd')
let error = document.querySelector('#error')
let removeName = document.querySelector('#removeName')
let btnDelete = document.querySelector('#btnDelete')
let btnEdit = document.querySelector('#btnEdit')
let editName = document.querySelector('#editName')
let editNumber = document.querySelector('#editNumber')
let btnRadioName = document.querySelector('#btnRadioName')
let btnRadioNumber = document.querySelector('#btnRadioNumber')


let rubrica = {
    'contacts': [
        {'name': 'Matteo', 'number': 33333333},
        {'name': 'Nicola', 'number': 33344444},
        {'name': 'Marco', 'number': 33355555}
        
    ],
    'createContacts': function () {

        container.innerHTML = "";
        let numID=0;
        this.contacts.forEach(contact => {
            let row = document.createElement('tr');
            row.setAttribute('id',`row${numID}`)
            row.innerHTML = `<th scope="row">${contact.name}</th>
            <td>${contact.number}</td><td> <button class="canc btn btn-outline-danger rounded-5 " id="${numID}" onClick="canc(this.id)">X</button></td>`
            container.appendChild(row)
            numID++;

        })
    },
    'addContact': function (nameContact, numberContact) {

        if (inputName.value === "" || inputNumber.value === "") { //validazione dei campi
            error.classList.remove('d-none')
        }
        else {
            
            this.contacts.push({ 'name': nameContact, 'number': numberContact });
            error.classList.add('d-none')
        }

    },
    'deleteContact': function (nameContact) {
        // let = this.contacts.indexOf(nameContact);
        let i = this.contacts.map(contact => contact.name.toLowerCase()).indexOf(nameContact.toLowerCase())

        // console.log(mapped);
        if (i !=-1) {
            this.contacts.splice(i, 1)
            error.classList.add('d-none')
        }
        else{
           error.classList.remove('d-none')
        }
        

        removeName.value = ""

    },
    'editContact': function (nameContact,editnumber) {
        // let = this.contacts.indexOf(nameContact);
        let i
        
        if(btnRadioName.checked){
         i = this.contacts.map(contact => contact.name.toLowerCase()).indexOf(nameContact.toLowerCase())
        }
        if(btnRadioNumber.checked)
        {
            i = this.contacts.map(contact => contact.number).indexOf(editnumber)
            console.log(`sono qua`);
        }


        // console.log(mapped);
        if (i !=-1) {
            this.contacts[i]={"name":nameContact,"number":editnumber}
            error.classList.add('d-none')
        }

        else{
            error.classList.remove('d-none')
        }

        editName.value = ""
        editNumber.value = ""


    }
}

rubrica.createContacts();

btnAdd.addEventListener('click', () => {

    rubrica.addContact(inputName.value, inputNumber.value)
    console.log(rubrica.contacts);

    rubrica.createContacts();
    inputNumber.value = "";
    inputName.value = "";


})

// btnDelete.addEventListener('click', () => {
//     rubrica.deleteContact(removeName.value);
//     rubrica.createContacts();
// })

btnEdit.addEventListener('click', () => {
    rubrica.editContact(editName.value, editNumber.value);
    rubrica.createContacts();
})


function canc(clickedID) {
    // console.log(clickedID);
    let contatto = document.querySelector(`#row${clickedID}`)
    // container.removeChild(contatto)
    rubrica.contacts.splice(clickedID, 1)
    console.log(rubrica.contacts);
    rubrica.createContacts();

}
