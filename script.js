class Book{
    constructor (author, title, noOfPages, isRead){
        this.id = crypto.randomUUID();
        this.author = author;
        this.title = title;
        this.noOfPages = noOfPages;
        this.isRead = isRead;
    }
}

const myLibrary = [
    new Book(
        "james",
        "sumo",
        150,
        false,
    ),
     new Book(
        "luby",
        "judo",
        100,
        true,
    ),
     new Book(
        "sifar",
        "karate",
        50,
        false,
    ),
];

displayBooks();

// This was used first using constructor pattern now we have 
// changed it to class pattern

// function Book(author, title, noOfPages, isRead){
//     if (!new.target){
//         throw Error("you must use the 'new' operator to call the constructor");
//     }
//     this.id = crypto.randomUUID();
//     this.author = author;
//     this.title = title;
//     this.noOfPages = noOfPages;
//     this.isRead = isRead;
// }



Book.prototype.changeRead = function(){
    if (this.isRead === true){
        this.isRead = false;
    }else {
        this.isRead = true;
    }
};

function addBookToLibrary(author, title, noOfPages, isRead){
    let book = new Book(author, title, noOfPages, isRead);
    myLibrary.push(book);
}

function displayBooks (){
    const tbody =  document.querySelector('tbody');
    let readbtnClass = ''
    // myLibrary.forEach( book => {
    for (let index in myLibrary){
        const newRow = document.createElement('tr');
        const id = document.createElement('td');
        id.textContent = myLibrary[index].id;
        newRow.appendChild(id);
        const title = document.createElement('td');
        title.innerText = myLibrary[index].title;
        newRow.appendChild(title);
        const author = document.createElement('td');
        author.innerText = myLibrary[index].author;
        newRow.appendChild(author);
        const noOfPages = document.createElement('td');
        noOfPages.innerText = myLibrary[index].noOfPages;
        newRow.appendChild(noOfPages);
        const isRead = document.createElement('td');
        if (myLibrary[index].isRead){
            readbtnClass = 'read';
        }else{
            readbtnClass = 'not-read';
        }
        isRead.innerHTML = `<button class="${readbtnClass} read-btn"> ${readbtnClass} </button>`;
        newRow.setAttribute('data-id', myLibrary[index].id);
        newRow.appendChild(isRead);
        const deleteButton = document.createElement('td');
        deleteButton.innerHTML = `<button id="delete" > delete </button>`;
        newRow.appendChild(deleteButton);
        tbody.appendChild(newRow)
    }

    const deletebtn = document.querySelectorAll('#delete');
    deletebtn.forEach(btn => {
        btn.addEventListener('click',(e) => {
            let id = e.target.parentElement.parentElement.getAttribute('data-id');
            let index = myLibrary.findIndex( a => a.id === id);
            if (index !== -1){
                myLibrary.splice(index,1);
            }
            reloadTableElements();
        });
    });
    const readbtn = document.querySelectorAll('.read-btn');
    readbtn.forEach(btn => {
        btn.addEventListener('click', (e) =>{
            if (e.target.textContent !== undefined && e.target.textContent !== null && e.target.textContent !== ''){
                let id = e.target.parentElement.parentElement.getAttribute('data-id');
                 let element = myLibrary.filter( a => a.id === id);
               // if (e.target.textContent.trim() === 'read'){
                    // e.target.textContent = "not-read";
                    // e.target.classList.remove('read');
                    // e.target.classList.add('not-read');
                    element[0].changeRead();
               // }else{
                    // e.target.textContent = "read";
                    // e.target.classList.remove('not-read');
                    // e.target.classList.add('read');
                //}
            }
            reloadTableElements()
        });
    });
    // });
}

const dialogForm = document.querySelector('#dialog-form');

const addBook = document.querySelector('#add-btn');
addBook.addEventListener('click' , () => {
    dialogForm.showModal();
});

const submit =document.querySelector("#submit");
const form = document.querySelector('#form');
// submit.addEventListener('click', (e)=>{
//     let target = e.target;
// });
form.addEventListener('submit',(e)=>{
    let form = e.target;
    e.preventDefault();
    let author =  form[0].value;
    let title = form[1].value;
    let noOfPages = form[2].value;
    let read = form[3].checked ? true : false;
    if (e.submitter.value.trim() === 'submit'){
        addBookToLibrary(author, title, noOfPages, read);
    }
    dialogForm.close();
    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
    form[3].checked = false;
    form[4].checked = false;
    reloadTableElements()
});

function reloadTableElements(){
    const tbody =  document.querySelector('tbody');
    const tr = tbody.querySelectorAll('tr');
    tr.forEach(tr => tbody.removeChild(tr));
    displayBooks();
}

dialogForm.addEventListener('close', (e) =>{
    //reloadTableElements()
});

const cancel = document.querySelector('#Cancel');
cancel.addEventListener('click' , (e)=> {
    dialogForm.close();
});





