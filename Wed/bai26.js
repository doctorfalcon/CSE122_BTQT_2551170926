const formDangKy = document.getElementById("formDangKy");
const hoTen = document.getElementById("hoTen");
const maSinhVien = document.getElementById("maSinhVien");
const vungKetQua = document.getElementById("vungKetQua");
const ketQua = document.getElementById("ketQua");

function kiemTraKhoangTrang(oNhap, thongBao) {
    oNhap.setCustomValidity(
        oNhap.value.trim() === "" ? thongBao : ""
    );
}

hoTen.addEventListener("input", function () {
    kiemTraKhoangTrang(hoTen, "Vui lòng nhập họ và tên.");
});

maSinhVien.addEventListener("input", function () {
    kiemTraKhoangTrang(maSinhVien, "Vui lòng nhập mã sinh viên.");
});

formDangKy.addEventListener("input", function () {
    vungKetQua.hidden = true;
    ketQua.textContent = "";
});

formDangKy.addEventListener("change", function () {
    vungKetQua.hidden = true;
    ketQua.textContent = "";
});

formDangKy.addEventListener("submit", function (event) {
    event.preventDefault();

    kiemTraKhoangTrang(hoTen, "Vui lòng nhập họ và tên.");
    kiemTraKhoangTrang(maSinhVien, "Vui lòng nhập mã sinh viên.");

    if (!formDangKy.reportValidity()) {
        return;
    }

    const duLieu = new FormData(formDangKy);

    ketQua.textContent =
        `Thông tin hợp lệ: ${duLieu.get("hoTen").trim()}, ` +
        `mã sinh viên ${duLieu.get("maSinhVien").trim()}, ` +
        `lớp ${duLieu.get("lop")}, ` +
        `trình độ ${duLieu.get("trinhDo")}. ` +
        "Đây là bản minh họa, thông tin chưa được gửi đến máy chủ.";

    vungKetQua.hidden = false;
});

formDangKy.addEventListener("reset", function () {
    hoTen.setCustomValidity("");
    maSinhVien.setCustomValidity("");
    ketQua.textContent = "";
    vungKetQua.hidden = true;
});