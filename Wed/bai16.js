const formThem = document.getElementById("formThem");
const nhapViec = document.getElementById("nhapViec");
const danhSach = document.getElementById("danhSach");
const soViec = document.getElementById("soViec");
const thongBao = document.getElementById("thongBao");
function capNhatSoViec() {
    const cacViecChuaXong = danhSach.querySelectorAll(
        ".oDanhDau:not(:checked)"
    );

    soViec.textContent =
        "Còn " + cacViecChuaXong.length + " việc chưa hoàn thành";
}

function themCongViec(noiDung, daHoanThanh = false) {
    const dongViec = document.createElement("li");
    dongViec.className = "congViec";

    const nhanViec = document.createElement("label");
    nhanViec.className = "nhanViec";

    const oDanhDau = document.createElement("input");
    oDanhDau.type = "checkbox";
    oDanhDau.className = "oDanhDau";
    oDanhDau.checked = daHoanThanh;

    const chuViec = document.createElement("span");
    chuViec.className = "noiDungViec";
    chuViec.textContent = noiDung;

    const nutXoa = document.createElement("button");
    nutXoa.type = "button";
    nutXoa.className = "nutXoa";
    nutXoa.textContent = "Xóa";
    nutXoa.setAttribute("aria-label", "Xóa việc: " + noiDung);

    dongViec.classList.toggle("hoanThanh", daHoanThanh);

    oDanhDau.addEventListener("change", function () {
        dongViec.classList.toggle(
            "hoanThanh",
            oDanhDau.checked
        );

        capNhatSoViec();
    });

    nutXoa.addEventListener("click", function () {
        dongViec.remove();
        capNhatSoViec();
    });

    nhanViec.append(oDanhDau, chuViec);
    dongViec.append(nhanViec, nutXoa);
    danhSach.append(dongViec);

    capNhatSoViec();
}

formThem.addEventListener("submit", function (event) {
    event.preventDefault();

    const noiDung = nhapViec.value.trim();

    if (noiDung === "") {
        thongBao.textContent = "Vui lòng nhập nội dung công việc.";
        nhapViec.focus();
        return;
    }

    themCongViec(noiDung);

    nhapViec.value = "";
    thongBao.textContent = "";
    nhapViec.focus();
});

nhapViec.addEventListener("input", function () {
    thongBao.textContent = "";
});

themCongViec("Đọc chương HTML5 cơ bản", true);
themCongViec("Làm bài tập CSS Grid");
themCongViec("Quay video OBS nộp bài");