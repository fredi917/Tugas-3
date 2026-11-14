const arrayGaji = [5000000, 6500000, 9500000];
const arrayLembur = [0.30, 0.32, 0.34, 0.36, 0.38];

const glassCard = document.getElementById('glassCard');
const salaryForm = document.getElementById('salaryForm');
const resultSection = document.getElementById('resultSection');

glassCard.addEventListener('mousemove', (e) => {
    const rect = glassCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glassCard.style.setProperty('--mouse-x', `${x}px`);
    glassCard.style.setProperty('--mouse-y', `${y}px`);
});

function hitungGaji() {
    const inputGolongan = document.getElementById('golongan').value;
    const inputJamLembur = parseInt(document.getElementById('jamLembur').value) || 0;

    if (!inputGolongan) {
        alert('Silakan pilih golongan karyawan terlebih dahulu!');
        return;
    }

    glassCard.classList.add('calculating');

    let indexGolongan = 0;
    let namaGolongan = "";

    if (inputGolongan === "A") {
        indexGolongan = 0;
        namaGolongan = "Golongan A";
    } else if (inputGolongan === "B") {
        indexGolongan = 1;
        namaGolongan = "Golongan B";
    } else if (inputGolongan === "C") {
        indexGolongan = 2;
        namaGolongan = "Golongan C";
    }

    const gajiPokok = arrayGaji[indexGolongan];

    let indexLembur = 0;
    if (inputJamLembur === 1) {
        indexLembur = 0;
    } else if (inputJamLembur === 2) {
        indexLembur = 1;
    } else if (inputJamLembur === 3) {
        indexLembur = 2;
    } else if (inputJamLembur === 4) {
        indexLembur = 3;
    } else if (inputJamLembur >= 5) {
        indexLembur = 4;
    } else {
        indexLembur = -1;
    }

    const persenLembur = (indexLembur !== -1) ? arrayLembur[indexLembur] : 0;
    const nominalLembur = gajiPokok * persenLembur;
    const totalPendapatan = gajiPokok + nominalLembur;

    setTimeout(() => {
        document.getElementById('resGolongan').innerText = namaGolongan;
        document.getElementById('resGajiPokok').innerText = formatRupiah(gajiPokok);
        document.getElementById('resJamLembur').innerText = inputJamLembur + " Jam";
        document.getElementById('resPersenLembur').innerText = Math.round(persenLembur * 100) + "%";
        document.getElementById('resNominalLembur').innerText = formatRupiah(nominalLembur);
        document.getElementById('resTotalGaji').innerText = formatRupiah(totalPendapatan);

        salaryForm.classList.add('hidden');
        glassCard.classList.remove('calculating');
        resultSection.classList.add('visible');
    }, 1100);
}

function resetTampilan() {
    glassCard.classList.add('resetting');

    setTimeout(() => {
        resultSection.classList.remove('visible');
        salaryForm.reset();
        salaryForm.classList.remove('hidden');
        glassCard.classList.remove('resetting');
    }, 1100);
}

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(angka);
}