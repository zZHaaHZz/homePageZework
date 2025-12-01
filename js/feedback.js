const feedbacks = [
  {
    img: "./img/avatarFeedback/avatar_1.png",
    name: "Công ty Thời trang Nắng Hạ",
    position: "Giám đốc Kinh doanh",
    content: "Zework đã thay đổi hoàn toàn cách chúng tôi quản lý tương tác Zalo. Giờ đây, mọi tin nhắn hỏi về sản phẩm, đơn hàng đều được xử lý nhanh chóng trong một nền tảng, giúp tỷ lệ chuyển đổi từ Zalo tăng 20% rõ rệt.",
    stars: 5
  },
  {
    img: "./img/avatarFeedback/avatar_2.png",
    name: "Trung tâm Anh ngữ Bright Future",
    position: "Giám đốc Đào tạo",
    content: "Tính năng phân quyền của Zework thực sự đột phá! Chúng tôi có thể dễ dàng phân bổ học viên tiềm năng từ Zalo cho từng cố vấn tuyển sinh, đảm bảo không bỏ sót khách và nâng cao hiệu quả tư vấn tuyển sinh lên 25%.",
    stars: 5
  },
  {
    img: "./img/avatarFeedback/avatar_3.png",
   name: "Sàn TMĐT Sắm Nhanh 24/7",
    position: "Quản lý Sản phẩm",
    content: "Dashboard của Zework là công cụ không thể thiếu. Chúng tôi theo dõi được hiệu suất xử lý đơn hàng qua Zalo theo thời gian thực, nhờ đó đã giảm 15% thời gian chờ của khách hàng và tăng tỷ lệ hoàn thành đơn hàng thành công.",
    stars: 5
  },
  {
    img: "./img/avatarFeedback/avatar_4.png",
    name: "Cửa hàng Thiết bị Mới 24h",
    position: "Trưởng phòng Bán hàng",
    content: "Tính năng Khách hàng (CRM Lite) của Zework rất tiện lợi! Thông tin khách từ Zalo được lưu trữ ngay lập tức, giúp nhân viên mới dễ dàng nắm bắt lịch sử tương tác, từ đó việc up-sell và tái ký hợp đồng hiệu quả hơn 30%.",
    stars: 5
  }
];
const containerFeedback = document.querySelector('.sales-feedback-content');
containerFeedback.innerHTML = feedbacks.map((fb, index) => `
  <div class="sales-feedback-content-box box-sales-${index + 1}">
    <div class="head-sales-feedback-content-box">
      <img src="${fb.img}" alt="">
      <div>
        <h2>${fb.name}</h2>
        <p>${fb.position}</p>
      </div>
    </div>
    <div class="main-sales-feedback-content">
      <p>${fb.content}</p>
      <div class="start-feedback-sales">
        ${'<i class="fa-solid fa-star"></i>'.repeat(fb.stars)}
      </div>
    </div>
  </div>
`).join('');