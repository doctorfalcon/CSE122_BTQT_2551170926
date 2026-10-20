const formLich = document.getElementById("formLich");
const nhapNgay = document.getElementById("nhapNgay");
const nhapThang = document.getElementById("nhapThang");
const nhapNam = document.getElementById("nhapNam");
const thongBao = document.getElementById("thongBao");
const hienNam = document.getElementById("nam");
const hienThang = document.getElementById("thang");
const hienNgay = document.getElementById("ngay");
const hienThu = document.getElementById("thu");
const loiChao = document.getElementById("loiChao");
const danhSachThu = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy"
];
function inLich() {
    const ngay = Number(nhapNgay.value);
    const thang = Number(nhapThang.value);
    const nam = Number(nhapNam.value);
    const ngayDaChon = new Date();
    ngayDaChon.setHours(0, 0, 0, 0);
    ngayDaChon.setFullYear(nam, thang - 1, ngay);
    if (
        ngayDaChon.getDate() !== ngay ||
        ngayDaChon.getMonth() !== thang - 1 ||
        ngayDaChon.getFullYear() !== nam
    ) {
        thongBao.textContent = "Ngày không tồn tại. Vui lòng nhập lại!";
        return;
    }
    thongBao.textContent = "";
    hienNam.textContent = ngayDaChon.getFullYear();
    hienThang.textContent = "Tháng " + (ngayDaChon.getMonth() + 1);
    hienNgay.textContent = ngayDaChon.getDate();
    hienThu.textContent = danhSachThu[ngayDaChon.getDay()];
    const gio = new Date().getHours();

    if (gio < 12) {
        loiChao.textContent = "Chào buổi sáng!";
    } else if (gio < 18) {
        loiChao.textContent = "Chào buổi chiều!";
    } else {
        loiChao.textContent = "Chào buổi tối!";
    }
}
formLich.addEventListener("submit", function (event) {
    event.preventDefault();
    inLich();
});
const homNay = new Date();
nhapNgay.value = homNay.getDate();
nhapThang.value = homNay.getMonth() + 1;
nhapNam.value = homNay.getFullYear();

inLich();