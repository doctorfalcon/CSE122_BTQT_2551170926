const formDangKy = document.getElementById("formDangKy");

const hoTen = document.getElementById("hoTen");
const email = document.getElementById("email");
const matKhau = document.getElementById("matKhau");
const xacNhan = document.getElementById("xacNhan");

const ketQua = document.getElementById("ketQua");

const thongBaoTheoO = {
    hoTen: document.getElementById("loiHoTen"),
    email: document.getElementById("loiEmail"),
    matKhau: document.getElementById("loiMatKhau"),
    xacNhan: document.getElementById("loiXacNhan")
};

const cacO = [hoTen, email, matKhau, xacNhan];

const daKiemTra = new Set();

function hienThiTrangThai(oNhap, loi) {
    const hopLe = loi === "";
    const thongBao = thongBaoTheoO[oNhap.id];

    oNhap.classList.toggle("hopLe", hopLe);
    oNhap.classList.toggle("khongHopLe", !hopLe);

    oNhap.setAttribute("aria-invalid", String(!hopLe));

    thongBao.textContent = hopLe ? "✓ Hợp lệ" : "✗ " + loi;
    thongBao.className = hopLe
        ? "thongBao dung"
        : "thongBao loi";

    daKiemTra.add(oNhap.id);

    return hopLe;
}

function kiemTraO(oNhap) {
    let loi = "";

    if (oNhap === hoTen) {
        if (hoTen.value.trim() === "") {
            loi = "Họ và tên không được để trống.";
        }
    }

    if (oNhap === email) {
        const giaTriEmail = email.value.trim();

        const mauEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (giaTriEmail === "") {
            loi = "Vui lòng nhập email.";
        } else if (!mauEmail.test(giaTriEmail)) {
            loi = "Email không đúng định dạng. Ví dụ: an@gmail.com";
        }
    }

    if (oNhap === matKhau) {
        if (matKhau.value === "") {
            loi = "Vui lòng nhập mật khẩu.";
        } else if (matKhau.value.length < 6) {
            loi = "Mật khẩu phải có ít nhất 6 ký tự.";
        }
    }

    if (oNhap === xacNhan) {
        if (xacNhan.value === "") {
            loi = "Vui lòng xác nhận mật khẩu.";
        } else if (xacNhan.value !== matKhau.value) {
            loi = "Mật khẩu xác nhận không khớp.";
        }
    }

    return hienThiTrangThai(oNhap, loi);
}

cacO.forEach(function (oNhap) {
    oNhap.addEventListener("blur", function () {
        kiemTraO(oNhap);
    });

    oNhap.addEventListener("input", function () {
        ketQua.textContent = "";
        ketQua.className = "";

        if (daKiemTra.has(oNhap.id)) {
            kiemTraO(oNhap);
        }

        if (
            oNhap === matKhau &&
            (
                xacNhan.value !== "" ||
                daKiemTra.has("xacNhan")
            )
        ) {
            kiemTraO(xacNhan);
        }
    });
});

formDangKy.addEventListener("submit", function (event) {
    event.preventDefault();

    let tatCaHopLe = true;
    let oLoiDauTien = null;

    cacO.forEach(function (oNhap) {
        const hopLe = kiemTraO(oNhap);

        if (!hopLe) {
            tatCaHopLe = false;

            if (oLoiDauTien === null) {
                oLoiDauTien = oNhap;
            }
        }
    });

    if (!tatCaHopLe) {
        ketQua.textContent = "Vui lòng sửa các ô đang báo lỗi.";
        ketQua.className = "loi";
        oLoiDauTien.focus();
        return;
    }

    ketQua.textContent =
        "✓ Dữ liệu hợp lệ! Đây là bản minh họa, chưa tạo tài khoản thực tế.";
    ketQua.className = "dung";
});