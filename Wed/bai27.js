const diaDanh = {
    sonDoong: {
        ten: "Hang Sơn Đoòng",
        anh: "./Anh/Bai27/2-son-doong.jpg",
        moTa: "Hang Sơn Đoòng nổi bật với không gian rộng lớn, những khối thạch nhũ và hệ sinh thái bên trong hang. Hoạt động khám phá cần được tổ chức theo chương trình chuyên biệt, có hướng dẫn viên."
    },
    mekong: {
        ten: "Đồng bằng sông Cửu Long",
        anh: "./Anh/Bai27/5-mekong.jpg",
        moTa: "Đồng bằng sông Cửu Long mang nét đặc trưng của miền sông nước với vườn cây, kênh rạch và chợ nổi. Du khách có thể trải nghiệm sinh hoạt địa phương và thưởng thức các món ăn miền Tây."
    },
    phongNha: {
        ten: "Động Phong Nha",
        anh: "./Anh/Bai27/6-phong-nha.jpg",
        moTa: "Động Phong Nha nổi bật với sông ngầm và các khối thạch nhũ đa dạng. Hành trình tham quan bằng thuyền giúp du khách ngắm nhìn cảnh quan bên trong hang."
    }
};

const chiTiet = document.getElementById("chiTiet");
const tieuDeModal = document.getElementById("tieuDeModal");
const anhModal = document.getElementById("anhModal");
const moTaModal = document.getElementById("moTaModal");
const thongBaoDat = document.getElementById("thongBaoDat");
const nutDatNgay = document.getElementById("nutDatNgay");

let diaDanhDangChon = null;

chiTiet.addEventListener("show.bs.modal", function (event) {
    const nutMo = event.relatedTarget;
    const maDiaDanh = nutMo?.dataset.diaDanh;
    const thongTin = diaDanh[maDiaDanh];

    if (!thongTin) {
        event.preventDefault();
        return;
    }

    diaDanhDangChon = thongTin;

    tieuDeModal.textContent = thongTin.ten;
    anhModal.src = thongTin.anh;
    anhModal.alt = thongTin.ten;
    moTaModal.textContent = thongTin.moTa;

    thongBaoDat.textContent = "";
    thongBaoDat.hidden = true;
});

nutDatNgay.addEventListener("click", function () {
    if (!diaDanhDangChon) {
        return;
    }

    thongBaoDat.textContent =
        "Bạn đã chọn " + diaDanhDangChon.ten +
        ". Đây là bản minh họa, chưa thực hiện đặt tour hoặc thanh toán.";

    thongBaoDat.hidden = false;
});