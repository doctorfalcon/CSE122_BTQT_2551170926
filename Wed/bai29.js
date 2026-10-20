const danhSachSinhVien = [
    {
        ma: "2251060001",
        hoTen: "Nguyễn Văn An",
        lop: "67CNTT1",
        diem: 8.5
    },
    {
        ma: "2251060002",
        hoTen: "Trần Thị Bình",
        lop: "67CNTT1",
        diem: 7.0
    },
    {
        ma: "2251060003",
        hoTen: "Lê Minh Cường",
        lop: "67CNTT2",
        diem: 5.5
    },
    {
        ma: "2251060004",
        hoTen: "Phạm Thu Dung",
        lop: "67KTPM1",
        diem: 9.0
    },
    {
        ma: "2251060005",
        hoTen: "Hoàng Gia Hân",
        lop: "67KTPM1",
        diem: 6.5
    },
    {
        ma: "2251060006",
        hoTen: "Vũ Đức Huy",
        lop: "67CNTT2",
        diem: 7.8
    },
    {
        ma: "2251060007",
        hoTen: "Đặng Ngọc Lan",
        lop: "67CNTT1",
        diem: 8.2
    },
    {
        ma: "2251060008",
        hoTen: "Bùi Quang Minh",
        lop: "67KTPM1",
        diem: 4.5
    },
    {
        ma: "2251060009",
        hoTen: "Đỗ Hoài Nam",
        lop: "67CNTT2",
        diem: 6.8
    },
    {
        ma: "2251060010",
        hoTen: "Ngô Thanh Nga",
        lop: "67CNTT1",
        diem: 9.2
    },
    {
        ma: "2251060011",
        hoTen: "Dương Tuấn Phong",
        lop: "67KTPM1",
        diem: 5.0
    },
    {
        ma: "2251060012",
        hoTen: "Đinh Minh Quân",
        lop: "67CNTT2",
        diem: 7.5
    },
    {
        ma: "2251060013",
        hoTen: "Lý Phương Thảo",
        lop: "67CNTT1",
        diem: 8.8
    },
    {
        ma: "2251060014",
        hoTen: "Mai Anh Tú",
        lop: "67KTPM1",
        diem: 6.0
    },
    {
        ma: "2251060015",
        hoTen: "Trịnh Hải Yến",
        lop: "67CNTT2",
        diem: 5.8
    }
];

const duLieuBang = document.getElementById("duLieuBang");
const tongSinhVien = document.getElementById("tongSinhVien");
const thongTinTrang = document.getElementById("thongTinTrang");
const phanTrang = document.getElementById("phanTrang");

const soDongMoiTrang = 5;
const diemDat = 6;
const tongTrang = Math.ceil(danhSachSinhVien.length / soDongMoiTrang);

let trangHienTai = 1;

function taoO(noiDung, className = "") {
    const o = document.createElement("td");
    o.textContent = noiDung;
    o.className = className;
    return o;
}

function hienThiBang() {
    duLieuBang.replaceChildren();

    const batDau = (trangHienTai - 1) * soDongMoiTrang;
    const ketThuc = Math.min(
        batDau + soDongMoiTrang,
        danhSachSinhVien.length
    );

    const sinhVienTrongTrang = danhSachSinhVien.slice(batDau, ketThuc);

    sinhVienTrongTrang.forEach(function (sinhVien, viTri) {
        const dong = document.createElement("tr");

        dong.append(
            taoO(batDau + viTri + 1),
            taoO(sinhVien.ma),
            taoO(sinhVien.hoTen),
            taoO(sinhVien.lop),
            taoO(sinhVien.diem.toFixed(1), "text-center")
        );

        const oTrangThai = document.createElement("td");
        oTrangThai.className = "text-center";

        const nhan = document.createElement("span");
        const dat = sinhVien.diem >= diemDat;

        nhan.className = dat
            ? "badge bg-success"
            : "badge bg-warning text-dark";

        nhan.textContent = dat ? "Đạt" : "Thi lại";

        oTrangThai.append(nhan);
        dong.append(oTrangThai);
        duLieuBang.append(dong);
    });

    tongSinhVien.textContent = "Tổng: " + danhSachSinhVien.length;

    thongTinTrang.textContent =
        `Hiển thị ${batDau + 1}–${ketThuc} trong ` +
        `${danhSachSinhVien.length} sinh viên · ` +
        `Trang ${trangHienTai}/${tongTrang}`;
}

function taoNutTrang(nhan, trangDich, biVoHieu, dangChon, moTa) {
    const muc = document.createElement("li");
    muc.className = "page-item";

    const nut = document.createElement("button");
    nut.type = "button";
    nut.className = "page-link";
    nut.textContent = nhan;
    nut.disabled = biVoHieu;
    nut.setAttribute("aria-label", moTa);

    if (biVoHieu) {
        muc.classList.add("disabled");
    }

    if (dangChon) {
        muc.classList.add("active");
        nut.setAttribute("aria-current", "page");
    }

    nut.addEventListener("click", function () {
        trangHienTai = trangDich;
        hienThiBang();
        hienThiPhanTrang();

        const nutHienTai = phanTrang.querySelector(
            '[aria-current="page"]'
        );

        nutHienTai.focus();
    });

    muc.append(nut);
    return muc;
}

function hienThiPhanTrang() {
    phanTrang.replaceChildren();

    phanTrang.append(
        taoNutTrang(
            "«",
            trangHienTai - 1,
            trangHienTai === 1,
            false,
            "Trang trước"
        )
    );

    for (let trang = 1; trang <= tongTrang; trang++) {
        phanTrang.append(
            taoNutTrang(
                String(trang),
                trang,
                false,
                trang === trangHienTai,
                "Trang " + trang
            )
        );
    }

    phanTrang.append(
        taoNutTrang(
            "»",
            trangHienTai + 1,
            trangHienTai === tongTrang,
            false,
            "Trang tiếp theo"
        )
    );
}

hienThiBang();
hienThiPhanTrang();