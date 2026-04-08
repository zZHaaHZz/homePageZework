const FAQS = [
  {
    id: 1,
    q: "Tôi muốn mua ZeWork cho doanh nghiệp thì làm sao?",
    a: "Bạn chỉ cần liên hệ đội ngũ ZeWork qua hotline 0982303333 hoặc gửi form đăng ký trên website. Đội ngũ nhân viên Zework sẽ trực tiếp liên hệ với bạn và hướng dẫn chi tiết các gói giải pháp phù hợp.",
    open: true,
  },
  { 
    id: 2, 
    q: "Liên hệ bộ phận hỗ trợ của ZeWork ở đâu?", 
    a: "Bạn có thể liên hệ hỗ trợ qua hotline: 0982303333, Fanpage: Zework, X(twitter): @_zework" 
  },
  { 
    id: 3, 
    q: "ZeWork chấp nhận những phương thức thanh toán nào?", 
    a: "ZeWork hỗ trợ linh hoạt các phương thức: Chuyển khoản ngân hàng (ATM/Internet Banking), thanh toán qua thẻ quốc tế (Visa/Mastercard) và các ví điện tử phổ biến như MoMo, ZaloPay." 
  },
  { 
    id: 4, 
    q: "ZeWork có dùng thử miễn phí không?", 
    a: "Có, ZeWork cung cấp gói trải nghiệm miễn phí 7 ngày với đầy đủ các tính năng cao cấp để doanh nghiệp có thể đánh giá mức độ phù hợp trước khi quyết định ký kết hợp đồng." 
  },
  { 
    id: 5, 
    q: "ZeWork có thể tích hợp bao nhiêu tài khoản Zalo?", 
    a: "Số lượng tài khoản Zalo tích hợp phụ thuộc vào gói dịch vụ bạn đăng ký. Gói Enterprise cho phép tích hợp không giới hạn tài khoản Zalo OA và Zalo cá nhân của nhân viên để quản lý tập trung." 
  },
  { 
    id: 6, 
    q: "Dữ liệu Zalo có được đồng bộ và lưu trữ an toàn bảo mật không?", 
    a: "Tuyệt đối an toàn. Toàn bộ dữ liệu được mã hóa đầu cuối và lưu trữ trên hệ thống Cloud Server tiêu chuẩn quốc tế. ZeWork cam kết bảo mật theo tiêu chuẩn ISO 27001, đảm bảo không rò rỉ thông tin khách hàng." 
  },
  { 
    id: 7, 
    q: "Nhân viên nghỉ việc thì dữ liệu có bị mất không?", 
    a: "Không. Khi nhân viên nghỉ việc, quản trị viên có thể thu hồi quyền truy cập nhưng toàn bộ lịch sử trò chuyện và dữ liệu khách hàng vẫn được lưu trữ trên hệ thống của công ty, giúp việc bàn giao diễn ra liền mạch." 
  },
  { 
    id: 8, 
    q: "Tôi có thể gọi điện trực tiếp từ ZeWork không?", 
    a: "Có, ZeWork tích hợp sẵn hệ thống tổng đài IP. Bạn có thể thực hiện cuộc gọi trực tiếp cho khách hàng ngay trên giao diện phần mềm và hệ thống sẽ tự động ghi âm cũng như lưu trữ lịch sử cuộc gọi." 
  },
  { 
    id: 9, 
    q: "ZeWork phù hợp cho doanh nghiệp loại nào?", 
    a: "ZeWork được thiết kế linh hoạt cho mọi quy mô, từ các hộ kinh doanh cá nhân, Startup cho đến các doanh nghiệp lớn có nhu cầu tối ưu hóa quy trình bán hàng và chăm sóc khách hàng qua Zalo." 
  },
  { 
    id: 10, 
    q: "ZeWork có phân quyền cho từng nhân viên không?", 
    a: "Hệ thống phân quyền của ZeWork rất chi tiết. Bạn có thể thiết lập quyền xem, sửa, xóa hoặc quản lý khách hàng cho từng cá nhân, phòng ban, giúp đảm bảo tính chuyên môn hóa và an toàn dữ liệu nội bộ." 
  },
];

/** 3) Helpers */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** 4) Render */
function renderFaqs(rootEl) {
  rootEl.innerHTML = FAQS.map((item, index) => `
    <div class="faq-item ${index === 0 ? "active" : ""}" data-id="${item.id}">
      <div class="faq-question">
        <p>${escapeHtml(item.q)}</p>
        <i class="fas fa-minus-circle faq-icon-minus"></i>
        <i class="fas fa-plus-circle faq-icon-plus"></i>
      </div>

      <div class="faq-answer">
        <span>${escapeHtml(item.a)}</span>
      </div>
    </div>
  `).join("");
}


/** 5) Init + Click handling (accordion 1 mở) */
function initFaqAccordion({ rootSelector = "#faqList", singleOpen = true } = {}) {
  const rootEl = document.querySelector(rootSelector);
  if (!rootEl) return;

  renderFaqs(rootEl);

  rootEl.addEventListener("click", (e) => {
    const question = e.target.closest(".faq-question");
    if (!question) return;

    const item = question.closest(".faq-item");
    const isOpen = item.classList.contains("active");

    if (singleOpen) {
      rootEl.querySelectorAll(".faq-item.active").forEach(el => {
        el.classList.remove("active");
      });
    }

    if (!isOpen) {
      item.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFaqAccordion({
    rootSelector: "#faqList",
    singleOpen: true,
  });
});


