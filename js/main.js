const booksContainer = document.getElementById("book-container");

// Clear all Data Displays
const clearAll = () => {
  booksContainer.textContent = "";
  showTotalResults(false);
  document.getElementById("book-section").classList.add("d-none");
  document.getElementById("book-invalid").classList.add("d-none");
};

// Invalid Search handler
const displayInvalidSearch = () => {
  document.getElementById("book-invalid").classList.remove("d-none");
};
// Search button click handler
document.getElementById("book-btn").addEventListener("click", () => {
  clearAll();
  const bookInput = document.getElementById("book-input").value.toLowerCase();
  fetch(`https://openlibrary.org/search.json?q=${bookInput}`)
    .then((res) => res.json())
    .then((data) => displayBook(data));
});

// Display total result found function
const showTotalResults = (num) => {
  const resultDiv = document.getElementById("book-results");
  if (!num) {
    resultDiv.textContent = "";
  } else {
    resultDiv.innerText = `Total result found: ${num}`;
  }
};

// Display book function
const displayBook = (books) => {
  document.getElementById("book-input").value = "";
  books.numFound > 0
    ? showTotalResults(books.numFound)
    : displayInvalidSearch();
  document.getElementById("book-section").classList.remove("d-none");
  books.docs.forEach((book) => {
    const publisher = book.publisher ? book.publisher[0] : "";
    const author = book.author_name ? book.author_name[0] : "";
    if (book.length < 1) {
      displayInvalidSearch();
    }
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
                src=${
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : `https://covers.openlibrary.org/b/id/10909258-M.jpg`
                }
                class="card-img-top img-fluid rounded book-card-img"
                alt=${book.title}
              />
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <table class="table table-striped card-text">
                <tbody>
                  <tr>
                    <td class="w-25">Author</td>
                    <td class="text-wrap">${author}</td>
                  </tr>
                  <tr>
                    <td class="w-25">Publisher</td>
                    <td class="text-wrap">${publisher}</td>
                  </tr>
                  <tr>
                    <td class="w-25">First Publish Year</td>
                    <td class="text-wrap">${book.first_publish_year}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
    `;
    booksContainer.appendChild(bookCard);
  });
};
