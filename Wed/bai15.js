const phepTinh = document.getElementById("phepTinh");
const ketQua = document.getElementById("ketQua");
const cacNut = document.querySelectorAll(".banPhim button");

let daTinh = false;
let ketQuaTruoc = "0";

let viTriDau = 0;
let viTriCuoi = 0;

function luuConTro() {
    viTriDau = phepTinh.selectionStart;
    viTriCuoi = phepTinh.selectionEnd;
}

phepTinh.addEventListener("click", luuConTro);
phepTinh.addEventListener("keyup", luuConTro);
phepTinh.addEventListener("select", luuConTro);
phepTinh.addEventListener("blur", luuConTro);

phepTinh.addEventListener("input", function () {
    daTinh = false;
    ketQua.textContent = "0";
    ketQua.classList.remove("loi");
    luuConTro();
});

phepTinh.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        tinhKetQua();
    } else if (event.key === "Escape") {
        event.preventDefault();
        xoaTatCa();
    }
});

cacNut.forEach(function (nut) {
    nut.addEventListener("click", function () {
        xuLyNut(nut.dataset.value);
    });
});

function xoaTatCa() {
    phepTinh.value = "";
    ketQua.textContent = "0";
    ketQua.classList.remove("loi");

    daTinh = false;
    ketQuaTruoc = "0";
    viTriDau = 0;
    viTriCuoi = 0;

    phepTinh.focus();
}

function xuLyNut(giaTri) {
    if (giaTri === "C") {
        xoaTatCa();
        return;
    }

    if (giaTri === "=") {
        tinhKetQua();
        return;
    }

    if (daTinh) {
        if (["+", "-", "×", "÷", "%"].includes(giaTri)) {
            phepTinh.value = ketQuaTruoc;
        } else {
            phepTinh.value = "";
        }

        viTriDau = phepTinh.value.length;
        viTriCuoi = viTriDau;
        daTinh = false;
    }

    if (giaTri === "()") {
        chenKyTu(chonNgoac());
    } else {
        chenKyTu(giaTri);
    }
}

function chenKyTu(kyTu) {
    const noiDung = phepTinh.value;

    const phanTruoc = noiDung.slice(0, viTriDau);
    const phanSau = noiDung.slice(viTriCuoi);

    phepTinh.value = phanTruoc + kyTu + phanSau;

    viTriDau = phanTruoc.length + kyTu.length;
    viTriCuoi = viTriDau;

    phepTinh.focus();
    phepTinh.setSelectionRange(viTriDau, viTriCuoi);

    ketQua.textContent = "0";
    ketQua.classList.remove("loi");
}

function chonNgoac() {
    const phanTruoc = phepTinh.value
        .slice(0, viTriDau)
        .replace(/\s/g, "");

    const soNgoacMo = (phanTruoc.match(/\(/g) || []).length;
    const soNgoacDong = (phanTruoc.match(/\)/g) || []).length;
    const kyTuCuoi = phanTruoc.slice(-1);

    const sauGiaTri = /[0-9.)%]/.test(kyTuCuoi);

    if (soNgoacMo > soNgoacDong && sauGiaTri) {
        return ")";
    }

    return sauGiaTri ? "×(" : "(";
}

function tinhKetQua() {
    const bieuThuc = phepTinh.value.trim();

    if (bieuThuc === "") {
        return;
    }

    try {
        const giaTri = tinhBieuThuc(bieuThuc);

        const giaTriGon = Number(giaTri.toPrecision(12));

        ketQuaTruoc = String(giaTriGon);
        ketQua.textContent = ketQuaTruoc;
        ketQua.classList.remove("loi");
        daTinh = true;
    } catch (loi) {
        ketQua.textContent = loi.message;
        ketQua.classList.add("loi");
        daTinh = false;
    }
}

function tinhBieuThuc(chuoi) {
    const chuoiChuan = chuoi
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .trim();

    const mauThanhPhan =
        /(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?|[()+\-*/%]/gi;

    const thanhPhan = chuoiChuan.match(mauThanhPhan) || [];
    const khongCoKhoangTrang = chuoiChuan.replace(/\s/g, "");

    let viTri = 0;

    function baoLoi() {
        throw new Error("Phép tính không hợp lệ");
    }

    if (
        thanhPhan.length === 0 ||
        thanhPhan.join("") !== khongCoKhoangTrang
    ) {
        baoLoi();
    }

    function docGiaTri() {
        const phanTu = thanhPhan[viTri];

        if (phanTu === "+" || phanTu === "-") {
            viTri++;

            const giaTri = docGiaTri();
            return phanTu === "-" ? -giaTri : giaTri;
        }

        let giaTri;

        if (phanTu === "(") {
            viTri++;
            giaTri = docCongTru();

            if (thanhPhan[viTri] !== ")") {
                baoLoi();
            }

            viTri++;
        } else {
            if (
                phanTu === undefined ||
                !/^(?:\d|\.)/.test(phanTu)
            ) {
                baoLoi();
            }

            giaTri = Number(phanTu);
            viTri++;
        }

        while (thanhPhan[viTri] === "%") {
            giaTri /= 100;
            viTri++;
        }

        return giaTri;
    }

    function docNhanChia() {
        let giaTri = docGiaTri();

        while (
            thanhPhan[viTri] === "*" ||
            thanhPhan[viTri] === "/"
        ) {
            const phepToan = thanhPhan[viTri++];
            const soTiepTheo = docGiaTri();

            if (phepToan === "*") {
                giaTri *= soTiepTheo;
            } else {
                if (soTiepTheo === 0) {
                    throw new Error("Không thể chia cho 0");
                }

                giaTri /= soTiepTheo;
            }
        }

        return giaTri;
    }

    function docCongTru() {
        let giaTri = docNhanChia();

        while (
            thanhPhan[viTri] === "+" ||
            thanhPhan[viTri] === "-"
        ) {
            const phepToan = thanhPhan[viTri++];
            const soTiepTheo = docNhanChia();

            if (phepToan === "+") {
                giaTri += soTiepTheo;
            } else {
                giaTri -= soTiepTheo;
            }
        }

        return giaTri;
    }

    const giaTriCuoi = docCongTru();

    if (viTri !== thanhPhan.length) {
        baoLoi();
    }

    if (!Number.isFinite(giaTriCuoi)) {
        throw new Error("Kết quả vượt giới hạn");
    }

    return giaTriCuoi;
}