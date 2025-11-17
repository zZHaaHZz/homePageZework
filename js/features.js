// Mảng chứa dữ liệu các tính năng
const features = [
  {
    id: "inbox",
    title: "Nhắn tin",
    desc: "Quản lý toàn bộ hội thoại trong một giao diện duy nhất. Dễ tìm, dễ follow, không bỏ sót khách nào vì mọi thứ đều được lưu tập trung.",
    img: "img/featureImg/bieudotron.png",
  },
  {
    id: "groupChat",
    title: "Nhóm chat",
    desc: "Tạo nhóm để thảo luận công việc, chia sẻ tệp và hình ảnh dễ dàng.",
    img: "img/why-1.svg",
  },
  {
    id: "call",
    title: "Gọi điện",
    desc: "Thực hiện cuộc gọi thoại hoặc video chất lượng cao, không giới hạn.",
    img: "img/why-2.svg",
  },
  {
    id: "employee",
    title: "Nhân viên",
    desc: "Quản lý thông tin nhân viên, vai trò và trạng thái hoạt động.",
    img: "img/why-3.svg",
  },
  {
    id: "synchronize",
    title: "Đồng bộ Zalo",
    desc: "Đồng bộ dữ liệu, danh bạ và tin nhắn với tài khoản Zalo của bạn.",
    img: "img/why-1.svg",
  },
  {
    id: "contacts",
    title: "Danh bạ",
    desc: "Xem, thêm và quản lý toàn bộ danh bạ liên hệ một cách khoa học.",
    img: "img/why-4.svg",
  },
  {
    id: "dashboard",
    title: "dashboard",
    desc: "Tùy chỉnh giao diện, quyền truy cập, và các thiết lập nâng cao.",
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
