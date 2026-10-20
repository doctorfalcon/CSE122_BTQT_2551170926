const cacNut = document.querySelectorAll("[data-goi]");
const hopThoai = document.getElementById("hopThoai");
const tenGoi = document.getElementById("tenGoi");
const thongTinGoi = document.getElementById("thongTinGoi");

const thongTin = {
    Starter: "Miễn phí: 12 bài HTML/CSS, video hướng dẫn và hỗ trợ qua email.",
    Pro: "499.000 đ/tháng: 30 bài HTML/CSS/JS, Bootstrap 5, chấm bài và hỗ trợ 1-1.",
    Team: "1.200.000 đ/tháng: mọi quyền lợi gói Pro, dự án nhóm và mentor riêng."
};

cacNut.forEach(function (nut) {
    nut.addEventListener("click", function () {
        const goi = nut.dataset.goi;

        tenGoi.textContent = "Bạn đã chọn gói " + goi;
        thongTinGoi.textContent = thongTin[goi];

        hopThoai.showModal();
    });
});