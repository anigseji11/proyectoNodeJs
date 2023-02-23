
const socket = io();





socket.on('init-products', ({ products }) => {

    const div = document.getElementById("list-products");


    const tbl = document.createElement("table");
    tbl.setAttribute('id', 'tabla');
    const tblBody = document.createElement("tbody");
    tblBody.setAttribute('id', 'tbody');
    const Header = document.createElement('thead');
    const tblHeader = document.createElement("tr");

    const columnHeader = document.createElement("th");
    const nameColumHeader = document.createTextNode('ID');
    columnHeader.appendChild(nameColumHeader)
    columnHeader.setAttribute('scope', 'col');

    const columnHeader2 = document.createElement("th");
    const nameColumHeader2 = document.createTextNode('Title');
    columnHeader2.appendChild(nameColumHeader2)
    columnHeader2.setAttribute('scope', 'col');



    tblHeader.appendChild(columnHeader)
    tblHeader.appendChild(columnHeader2)

    Header.appendChild(tblHeader)

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.setAttribute('id', product.id);


        const cell = document.createElement("td");
        const cellText = document.createTextNode(product.id);

        const cell2 = document.createElement("td");
        const cellText2 = document.createTextNode(product.title);
        cell.appendChild(cellText);
        cell2.appendChild(cellText2);
        row.appendChild(cell);
        row.appendChild(cell2);


        tblBody.appendChild(row);
    });
    tbl.appendChild(Header);
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    div.appendChild(tbl);

    tbl.classList.add("table");
    tbl.classList.add("table-striped");

})


socket.on('delete-product', (id) => {
    var row = document.getElementById(id);
    row.remove();

})

socket.on('add-product', (id, product) => {
    const tbody = document.getElementById('tbody');

    console.log(tbody);
    const row = document.createElement('tr');
    row.setAttribute('id', id);


    const cell = document.createElement('td');
    const cellText = document.createTextNode(id);

    const cell2 = document.createElement('td');
    const cellText2 = document.createTextNode(product.title);
    cell.appendChild(cellText);
    cell2.appendChild(cellText2);
    row.appendChild(cell);
    row.appendChild(cell2);


    tbody.appendChild(row);

})

socket.on('update-product', ({ product }) => {
    const products = document.getElementById(product.id);
    products.innerHTML = `<td>${product.id}</td><td>${product.title}</td>`;


})