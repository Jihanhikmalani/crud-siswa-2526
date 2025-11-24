// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
    apiKey: "AIzaSyA2uMQ-SO6cfFcAmoKbaBNDh_N34TYU68o",
  authDomain: "insancemerlang-c6ff2.firebaseapp.com",
  projectId: "insancemerlang-c6ff2",
  storageBucket: "insancemerlang-c6ff2.firebasestorage.app",
  messagingSenderId: "996228614767",
  appId: "1:996228614767:web:715bac465789728e9b9b9a"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const siswaCollection = collection(db, "siswa")

// fungsi untuk menampilkan daftar siswa
export async function tampilkanDaftarSiswa() {
  // ambil snapshot data dari koleksi siswa
  const snapshot = await getDocs(siswaCollection)
  
  // ambil elemen tabel data
  const tabel = document.getElementById("tabelData")
  
  // kosongkan isi tabel
  tabel.innerHTML =""
  
  // loop setiap dokumen dalam snapshot 
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
    
    // buat elemen kolom untuk NIS
    const kolomNIS = document.createElement("td")
    kolomNIS.textContent = data.nis
    
    // buat elemen kolom untuk nama
    const kolomNama = document.createElement("td")
    kolomNama.textContent = data.nama
    
    //bual elemen kolom untuk kelas
    const kolomKelas = document.createElement("td")
    kolomKelas.textContent = data.kelas
    
    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement("td")
    
    //buat tombol edit
    const tombolEdit = document.createElement("button")
    tombolEdit.textContenb="edit"
    tombolEdit.href = "edit.html?id=" + id
    tombolEdit.className = "button edit"
    
    //buat tombol hapus
    const tombolHapus = document.createElement("button")
    tombolHapus.textContent = "Hapus"
    tombolHapus.className = "button delet"
    
    //tambahkan elemen ke dalam kolom Aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)
    
    //tambah kolom ke dalam baris
    baris.appendChild(kolomNIS)
    baris.appendChild(kolomNama)
    baris.appendChild(kolomKelas)
    baris.appendChild(kolomAksi)
    
    //tambahkan baris ke dalam tabel
    tabel.appendChild(baris)
  })
}

//fungsi untuk menambah data siswa
export async function tambahDataSiswa() {
  //ambil nilai dari form
  const nis = document.getElementById('nis').value
  const nama = document.getElementById('nama').value
  const kelas = document.getElementById('kelas').value
  
  
  //tambahkan data ke firestore
  await addDoc(siswaCollection, {
    nis: nis,
    nama: nama,
    kelas: kelas
 } )
 
 //alihkan ke halaman daftar siswa
 window.location.href = 'daftar.html'
 
 
}
