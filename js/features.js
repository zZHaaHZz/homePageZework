// Mảng chứa dữ liệu các tính năng
const features = [
  {
    id: "inbox",
    title: "Nhắn tin",
    desc: "Quản lý toàn bộ hội thoại trong một giao diện duy nhất. Dễ tìm, dễ follow, không bỏ sót khách nào vì mọi thứ đều được lưu tập trung.",
    img: "./img/img_chat.png",
  },
  {
    id: "role",
    title: "Phân quyền",
    desc: "Tạo nhóm để thảo luận công việc, chia sẻ tệp và hình ảnh dễ dàng.",
    img: "./img/why-1.svg",
  },
  {
    id: "customer",
    title: "Khách hàng",
    desc: "Thực hiện cuộc gọi thoại hoặc video chất lượng cao, không giới hạn.",
    img: "./img/why-2.svg",
  },
  {
    id: "synchronize",
    title: "Đồng bộ",
    desc: "Quản lý hội thoại, phân công và theo dõi hiệu suất theo từng nhân viên.",
    img: "./img/imgFreature/Container (2).svg",
  },
  {
    id: "storage",
    title: "Lưu trữ Cloud",
    desc: "Lưu trữ an toàn toàn bộ lịch sử hội thoại Zalo, tệp đính kèm và dữ liệu khách hàng. Đảm bảo dữ liệu được bảo mật, không giới hạn dung lượng và dễ dàng truy xuất khi cần.",
    img: "./img/imgFreature/Container (12).svg",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Bảng điều khiển trực quan cung cấp cái nhìn tổng quan tức thì về hiệu suất Zalo và hoạt động đội ngũ, giúp bạn quản lý và tối ưu hóa chiến lược.",
    img: "img/why-3.svg",
  },
];

// Hàm hiển thị tính năng
function showFeature(id) {
  const feature = features.find((f) => f.id === id);
  if (!feature) return;

  // Nếu chưa có vùng hiển thị thì tự tạo
  let container = document.querySelector(".feature-detail");
  if (!container) {
    container = document.createElement("div");
    container.className = "feature-detail";
    document.querySelector(".features-1").appendChild(container);
  }

  // Cập nhật nội dung
  container.innerHTML = `
    <div class="content-feature-detail"> 
        <h2>${feature.title}</h2>
        <p>${feature.desc}</p>
    </div>
    <div class="box-img-feature">
        <img src="${feature.img}" alt="${feature.title}">
    </div>
  `;

  // Xóa active ở tất cả nút
  document.querySelectorAll(".menu-features-1 button").forEach((btn) => {
    btn.classList.remove("active-menu-feature");
  });

  // Thêm active cho nút đang click
  const activeBtn = document.querySelector(
    `.menu-features-1 button[onclick="showFeature('${id}')"]`
  );
  if (activeBtn) activeBtn.classList.add("active-menu-feature");
}

// Hiển thị mặc định "Nhắn tin" khi trang load
document.addEventListener("DOMContentLoaded", () => {
  showFeature("inbox");
});
