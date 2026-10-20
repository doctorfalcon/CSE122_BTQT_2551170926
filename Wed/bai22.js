const nutDoiCheDo = document.getElementById("nutDoiCheDo");
const trangThai = document.getElementById("trangThai");

function datCheDo(cheDoToi) {

    document.body.classList.toggle("toi", cheDoToi);

    nutDoiCheDo.setAttribute(
        "aria-checked",
        String(cheDoToi)
    );

    trangThai.textContent = cheDoToi
        ? "Đây là giao diện ở chế độ TỐI."
        : "Đây là giao diện ở chế độ SÁNG.";
}

nutDoiCheDo.addEventListener("click", function () {
    const dangToi = document.body.classList.contains("toi");

    datCheDo(!dangToi);
});

datCheDo(false);