let testimoniList = JSON.parse(localStorage.getItem("dataTestimoni")) || [];

document.getElementById("submitBtn").onclick = tampilkanTestimoni;

function getStars(rating) {
    rating = Math.max(1, Math.min(5, parseInt(rating)));
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function tampilkanTestimoni() {
    let nama = document.getElementById("userName").value.trim();
    let rating = document.getElementById("userRating").value;
    let feedback = document.getElementById("userFeedback").value.trim();

    if (nama === "" || rating === "" || feedback === "") {
        alert("Isi semua field testimoni!");
        return;
    }

    rating = Math.max(1, Math.min(5, parseInt(rating)));

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

    testimoniList.forEach((data, index) => {
        let card = document.createElement("div");
        card.classList.add("testi-card");

        card.innerHTML = `
            <div class="testi-header">
                <div>
                    <div class="testi-name">${data.nama}</div>
                    <div class="testi-date">${new Date().toLocaleDateString()}</div>
                </div>
                <div class="testi-stars">${getStars(data.rating)}</div>
            </div>
            <div class="testi-text">${data.feedback}</div>
        `;

        card.style.animationDelay = `${index * 0.1}s`;

        testimonialGrid.appendChild(card);
    });
}

renderTestimoni();