    let daftar = [];
    let editIndex = -1;

    document.getElementById("addBtn").onclick = function () {
        let nama = document.getElementById("taskInput").value;
        let deskripsi = document.getElementById("descInput").value;
        let prioritas = document.getElementById("priorityInput").value;
        let deadline = document.getElementById("deadlineInput").value;

        if (nama == "" || deadline == "") {
            alert("Isi nama dan deadline!");
            return;
        }

        if (editIndex != -1) {
            daftar[editIndex] = { nama, deskripsi, prioritas, deadline };
            editIndex = -1;
        } else {
            daftar.push({ nama, deskripsi, prioritas, deadline });
        }

        document.getElementById("taskInput").value = "";
        document.getElementById("descInput").value = "";
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
    }

    function editData(index) {
        let data = daftar[index];
        document.getElementById("taskInput").value = data.nama;
        document.getElementById("descInput").value = data.deskripsi;
        document.getElementById("priorityInput").value = data.prioritas;
        document.getElementById("deadlineInput").value = data.deadline;
        editIndex = index;

        document.querySelector('.form-box').scrollIntoView({ behavior: 'smooth' });
    }

    function hapusData(index) {
        if (confirm("Yakin ingin menghapus tugas ini?")) {
            if (editIndex == index) editIndex = -1;
            daftar.splice(index, 1);
            tampilkan();
        }
    }

    function tampilkan() {
        let tbody = document.querySelector("#taskList tbody");
        tbody.innerHTML = "";
        for (let i = 0; i < daftar.length; i++) {
            tbody.innerHTML +=
            `<tr>
                <td>${daftar[i].nama}</td>
                <td>${daftar[i].deskripsi}</td>
                <td>${daftar[i].prioritas}</td>
                <td>${daftar[i].deadline}</td>
                <td><button onclick="editData(${i})">Edit</button></td>
                <td><button onclick="hapusData(${i})">Hapus</button></td>
            </tr>`;
        }
    }

    tampilkan();