const gioChuc = document.getElementById("gioChuc");
const gioDonVi = document.getElementById("gioDonVi");
const phutChuc = document.getElementById("phutChuc");
const phutDonVi = document.getElementById("phutDonVi");
const giayChuc = document.getElementById("giayChuc");
const giayDonVi = document.getElementById("giayDonVi");
const dongHo = document.getElementById("dongHo");
const loiChao = document.getElementById("loiChao");
function hienThiHaiChuSo(so, anhChuc, anhDonVi) {
    const hangChuc = Math.floor(so / 10);
    const hangDonVi = so % 10;
    anhChuc.src = "Anh/Bai13/0" + hangChuc + ".gif";
    anhDonVi.src = "Anh/Bai13/0" + hangDonVi + ".gif";
}
function capNhatDongHo() {
    const hienTai = new Date();

    const gio = hienTai.getHours();
    const phut = hienTai.getMinutes();
    const giay = hienTai.getSeconds();
    hienThiHaiChuSo(gio, gioChuc, gioDonVi);
    hienThiHaiChuSo(phut, phutChuc, phutDonVi);
    hienThiHaiChuSo(giay, giayChuc, giayDonVi);
    dongHo.setAttribute(
        "aria-label",
        `${gio} giờ ${phut} phút ${giay} giây`
    );
    if (gio < 12) {
        loiChao.textContent = "Chào buổi sáng";
    } else if (gio < 18) {
        loiChao.textContent = "Chào buổi chiều";
    } else {
        loiChao.textContent = "Chào buổi tối";
    }
}
capNhatDongHo();
setInterval(capNhatDongHo, 1000);