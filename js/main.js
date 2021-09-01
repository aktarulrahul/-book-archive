const booksContainer = document.getElementById("book-container");

const clearAll = () => {
  booksContainer.textContent = "";
  showTotalResults(false);
  document.getElementById("book-section").classList.add("d-none");
};

document.getElementById("book-btn").addEventListener("click", () => {
  clearAll();
  const bookInput = document.getElementById("book-input").value.toLowerCase();
  fetch(`http://openlibrary.org/search.json?q=${bookInput}`)
    .then((res) => res.json())
    .then((data) => displayBook(data));
});

const showTotalResults = (num) => {
  const resultDiv = document.getElementById("book-results");
  if (!num) {
    resultDiv.textContent = "";
  } else {
    resultDiv.innerText = `Total result found: ${num}`;
  }
};

const displayBook = (books) => {
  document.getElementById("book-input").value = "";
  showTotalResults(books.numFound);
  document.getElementById("book-section").classList.remove("d-none");
  books.docs.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add(
      "col",
      "border",
      "border-1",
      "rounded",
      "shadow",
      "p-3"
    );
    bookCard.innerHTML = `
    <div class="card h-100">
              <img
                src="https://covers.openlibrary.org/b/id/554106-M.jpg"
                class="card-img-top img-fluid rounded"
                height="200px"
                alt=""
              />
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <table class="table table-striped card-text">
                  <tr>
                    <td>Author</td>
                    <td>${book.author_name[0]}</td>
                  </tr>
                  <tr>
                    <td>Publisher</td>
                    <td>${book.publisher[0]}</td>
                  </tr>
                  <tr>
                    <td>First Publish Year</td>
                    <td>${book.first_publish_year}</td>
                  </tr>
                </table>
              </div>
            </div>
    `;
    booksContainer.appendChild(bookCard);
  });
};

// // console.log(book.cover_i);
// const url = book.cover_i;
// const imageUrl = (url) => {
//   fetch(`https://covers.openlibrary.org/b/id/${url}-M.jpg`)
//     .then((response) => response.blob())
//     .then((imageBlob) => {
//       const imageObjectURL = URL.createObjectURL(imageBlob);
//       console.log(imageObjectURL);
//     });
// };
