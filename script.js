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

function Book(author, title, noOfPages, isRead){
    if (!new.target){
        throw Error("you must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.noOfPages = noOfPages;
    this.isRead = isRead;
}

function addBookToLibrary(author, title, noOfPages, isRead){
    let book = new Book(author, title, noOfPages, isRead);
    myLibrary.push(book);
}

function displayBooks (){
    const tbody =  document.querySelector('tbody');
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
        isRead.innerHTML = '<button> isRead </button>';
        if (myLibrary[index].isRead){
            isRead.classList.add('read');
        }else{
            isRead.classList.add('not-read');
        }
        newRow.appendChild(isRead);
        const deleteButton = document.createElement('td');
        deleteButton.innerHTML = '<button> delete </button>';
        newRow.appendChild(deleteButton);
        tbody.appendChild(newRow)
    }
    // });
}

displayBooks();