const xuatBaoCao = document.getElementById("xuatBaoCao");
const thongBao = document.getElementById("thongBao");

xuatBaoCao.addEventListener("click", function () {
    const duLieu = [
        ["Hạng mục", "Giá trị", "Ghi chú"],
        ["Sinh viên", "128", "Chỉ tiêu minh họa: 160"],
        ["Đã nộp", "96", "75% tổng sinh viên"],
        ["Chưa nộp", "32", "25% tổng sinh viên"],
        ["Điểm trung bình", "7.8", "Thang điểm 10"],
        ["Chương 1 - HTML5", "100%", "Tiến độ hoàn thành"],
        ["Chương 2 - JavaScript", "82%", "Tiến độ hoàn thành"],
        ["Chương 3 - CSS3", "74%", "Tiến độ hoàn thành"],
        ["Chương 4 - Bootstrap 5", "46%", "Tiến độ hoàn thành"]
    ];

    const noiDung = duLieu
        .map(function (dong) {
            return dong
                .map(function (o) {
                    return '"' + String(o).replace(/"/g, '""') + '"';
                })
                .join(",");
        })
        .join("\r\n");

    const tep = new Blob(
        ["\uFEFF", noiDung],
        { type: "text/csv;charset=utf-8;" }
    );

    const duongDan = URL.createObjectURL(tep);
    const lienKet = document.createElement("a");

    lienKet.href = duongDan;
    lienKet.download = "bao-cao-hoc-tap.csv";

    document.body.append(lienKet);
    lienKet.click();
    lienKet.remove();

    setTimeout(function () {
        URL.revokeObjectURL(duongDan);
    }, 1000);

    thongBao.textContent = "Đã tạo báo cáo CSV và yêu cầu trình duyệt tải xuống.";
});