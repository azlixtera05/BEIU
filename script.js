document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signinForm");
  const heartContainer = document.querySelector(".heart-container"); // Thêm container cho trái tim

  // Hàm tạo trái tim
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "🩷"; // Ký tự trái tim
    heart.style.left = Math.random() * 100 + "vw"; // Vị trí ngẫu nhiên theo chiều ngang
    heart.style.animationDuration = Math.random() * 1 + 1.5 + "s"; // Thời gian bay ngẫu nhiên (2-3.5s)
    heartContainer.appendChild(heart);

    // Xóa trái tim sau khi animation kết thúc
    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }

  setInterval(() => {
    createHeart();
  }, 1000);

  // Tạo trái tim khi nhấp chuột (tùy chọn)
  document.addEventListener("click", createHeart);

  // Xử lý form đăng nhập
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Dữ liệu đăng nhập cố định
    const validUsername = "Phong";
    const validPassword = "13112006";

    // Lấy giá trị từ form
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Kiểm tra đăng nhập
    if (username === validUsername && password === validPassword) {
      for (let i = 0; i < 50; i++) {
        createHeart();
      }
      // Chờ 2 giây để xem hiệu ứng trước khi chuyển hướng
      setTimeout(() => {
        window.location.href = "/Project/HTML/home.html"; // Thay bằng trang bạn muốn
      }, 2100);
    } else {
      alert("Buồn thật đó, bé iu nhập sai rùi :<");
      // Tạo 1 trái tim khi thất bại
      createHeart();
    }
  });
});
