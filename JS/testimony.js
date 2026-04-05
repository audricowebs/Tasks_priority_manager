let testimoniList = JSON.parse(localStorage.getItem("dataTestimoni")) || [];
document.getElementById("submitBtn").onclick = tampilkanTestimoni;

function tampilkanTestimoni() {

    let nama = document.getElementById("userName").value.trim();
    let rating = document.getElementById("userRating").value;
    let feedback = document.getElementById("userFeedback").value.trim();

    if (nama == "" || rating == "" || feedback == "") {
        alert("Isi semua field testimoni!");
        return;
    }

    testimoniList.push({ nama, rating, feedback });
    localStorage.setItem("dataTestimoni", JSON.stringify(testimoniList));

    renderTestimoni();

    document.getElementById("userName").value = "";
    document.getElementById("userRating").value = "";
    document.getElementById("userFeedback").value = "";
}

function renderTestimoni() {
    let testimonialGrid = document.getElementById("testimonialGrid");
    testimonialGrid.innerHTML = "";

    for (let i = 0; i < testimoniList.length; i++) {
        let card = document.createElement("div");

        card.innerHTML = `
            <h3>${testimoniList[i].nama}</h3>
            <p>Rating: ${testimoniList[i].rating} / 5</p>
            <p>${testimoniList[i].feedback}</p>
        `;

        testimonialGrid.appendChild(card);
    }
}

renderTestimoni();