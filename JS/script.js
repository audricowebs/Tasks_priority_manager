    let daftar = JSON.parse(localStorage.getItem("dataTugas")) || [];
    let editIndex = -1;

    document.getElementById("addBtn").onclick = function () {
        let nama = document.getElementById("taskInput").value.trim();
        let deskripsi = document.getElementById("descInput").value.trim();
        let prioritas = document.getElementById("priorityInput").value;
        let start = document.getElementById("startInput").value;
        let deadline = document.getElementById("deadlineInput").value;

        if (nama == "" || start == "" || deadline == "") {
            alert("Isi nama, tanggal mulai, dan deadline!");
            return;
        }

        if (editIndex != -1) {
            daftar[editIndex] = { ...daftar[editIndex], nama, deskripsi, prioritas, start, deadline };
            editIndex = -1;
            alert("Data berhasil di update!");
            localStorage.setItem("dataTugas", JSON.stringify(daftar));
        } else {
            daftar.push({ nama, deskripsi, prioritas, start, deadline, selesai: false });
            localStorage.setItem("dataTugas", JSON.stringify(daftar));
        }

        document.getElementById("taskInput").value = "";
        document.getElementById("descInput").value = "";
        document.getElementById("priorityInput").value = "tinggi";
        document.getElementById("startInput").value = "";
        document.getElementById("deadlineInput").value = "";

        urutkan();
        tampilkan();
    };

    function urutkan() {
        daftar.sort(function (a, b) {
            let pA = a.prioritas == "tinggi" ? 3 : a.prioritas == "sedang" ? 2 : 1;
            let pB = b.prioritas == "tinggi" ? 3 : b.prioritas == "sedang" ? 2 : 1;

            if (pB != pA) return pB - pA;
            return new Date(a.deadline) - new Date(b.deadline);
        });
        localStorage.setItem("dataTugas", JSON.stringify(daftar));
    }

    function cekDeadline(tanggal) {
        let sekarang = new Date();
        let deadline = new Date(tanggal);
        let selisih = deadline - sekarang;
        let hari = Math.ceil(selisih / (1000 * 60 * 60 * 24));
        if (hari < 0) return "Terlewat";
        if (hari == 0) return "Hari ini";
        return hari + " hari lagi";
    }

    function editData(index) {
        let data = daftar[index];

        document.getElementById("taskInput").value = data.nama;
        document.getElementById("descInput").value = data.deskripsi;
        document.getElementById("priorityInput").value = data.prioritas;
        document.getElementById("startInput").value = data.start;
        document.getElementById("deadlineInput").value = data.deadline;

        editIndex = index;
    }

    function hapusData(index) {
        if (confirm("Yakin hapus?")) {
            if (editIndex == index) editIndex = -1;
            daftar.splice(index, 1);
            localStorage.setItem("dataTugas", JSON.stringify(daftar));
            tampilkan();
        }
    }

    function updateData(index) {
        daftar[index].selesai = !daftar[index].selesai; 
        localStorage.setItem("dataTugas", JSON.stringify(daftar));
        tampilkan();
    }

    function updateClock() {
    let now = new Date();
    let tanggal = now.toLocaleDateString(); 
    let waktu = now.toLocaleTimeString();   
    document.getElementById("clock").innerText = `${tanggal} ${waktu}`;
}

    
    setInterval(updateClock, 1000);
    updateClock();

    function tampilkan() {
        let tbody = document.querySelector("#taskList tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < daftar.length; i++) {
            let statusDeadline = cekDeadline(daftar[i].deadline);
            let statusSelesai = daftar[i].selesai ? "Selesai " : "Belum selesai ";

            tbody.innerHTML +=
                `<tr>
                    <td>${daftar[i].nama}</td>
                    <td>${daftar[i].deskripsi}</td>
                    <td>${daftar[i].prioritas}</td>
                    <td>${daftar[i].start}</td>
                    <td>${daftar[i].deadline}</td>
                    <td>${statusDeadline} | ${statusSelesai}</td>
                    <td>
                        <button onclick="editData(${i})">Edit</button>
                        <button onclick="updateData(${i})">${daftar[i].selesai ? "Batal" : "Update"}</button>
                    </td>
                    <td>
                        <button onclick="hapusData(${i})">Hapus</button>
                    </td>
                </tr>`;
        }
    }

tampilkan();