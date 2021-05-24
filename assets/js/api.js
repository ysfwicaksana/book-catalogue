// hanya dipakai untuk kebutuhan dicoding sebagai submission, jangan disalahgunakan
const API_KEY = "qxAFkIqgXipq5slyBeF6eZapjQkn8NRo";

const convertDate = (date) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let currentDate = new Date(date);
  return `${currentDate.getDate()}-${
    months[currentDate.getMonth()]
  }-${currentDate.getFullYear()}`;
};

const getBestSeller = async (date = null) => {
  try {
    let request = null;

    if (date === null) {
      request = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
      );
    } else {
      request = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=${API_KEY}`
      );
    }

    const response = request.json();

    return response;
  } catch (error) {
    alert(error);
  }
};

getBestSeller().then((book) => {
  console.log(book.results);
  const { lists, ...rest } = book.results;
  document.getElementById("best-seller-date").innerText = convertDate(
    rest.bestsellers_date
  );

  let bestSellerContents = document.querySelector("#best-seller article");
  bestSellerContents.innerHTML = "";

  lists.forEach((list) => {
    let divCategory = document.createElement("div");
    divCategory.className = "best-seller-category";
    divCategory.innerHTML += list.display_name;
    bestSellerContents.appendChild(divCategory);

    list.books.forEach((book) => {
      let bookContents = document.createElement("div");
      bookContents.className = "best-seller-book-content";

      bookContents.innerHTML += `<img src=${book.book_image} alt=${book.title}/>`;

      bookContents.innerHTML += `<h4>#${book.rank}</h4>`;
      bookContents.innerHTML += `<h5>${book.title}</h5>`;
      bookContents.innerHTML += `<h4>${book.author}</h4>`;

      bestSellerContents.appendChild(bookContents);
    });
  });
});

// berhasil get data dengan tanggal spesifik namun belum bisa dimunculkan
function getDate() {
  const date = document.getElementById("pick-date").value;
  let bestSellerContents = document.querySelectorAll(".book-article");
  bestSellerContents.innerHTML = "";
  getBestSeller(date);
}
