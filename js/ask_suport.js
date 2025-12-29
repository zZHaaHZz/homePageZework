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
    a: "Bạn có thể liên hệ hỗ trợ qua 3 kênh: Chat trực tiếp trên website Zework.vn, gọi Hotline kỹ thuật 24/7, hoặc tham gia cộng đồng Zalo Support dành riêng cho khách hàng doanh nghiệp." 
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

/** 2) SVG ICONS */
const SVG_MINUS = `
<svg fill="currentColor" height="22" viewBox="0 0 512 512" width="22" aria-hidden="true">
  <path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"></path>
  <path d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"></path>
</svg>
`;

const SVG_PLUS = `
<svg fill="currentColor" height="22" viewBox="0 0 512 512" width="22" aria-hidden="true">
  <path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"></path>
  <path d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"></path>
  <path d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0"></path>
</svg>
`;

/** 3) Helpers */
function escapeHtml(str) {
  // chống vỡ HTML nếu nội dung có ký tự đặc biệt
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
    <div class="body-list-ask-suport ${index === 0 ? "active-ask" : ""}" data-id="${item.id}">
      <div class="active-ask-suport">
        <p>${escapeHtml(item.q)}</p>
        <button type="button" class="faq-toggle">
          ${index === 0 ? SVG_MINUS : SVG_PLUS}
        </button>
      </div>

      <div class="ask-detail">
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
    const btn = e.target.closest(".faq-toggle");
    if (!btn) return;

    const item = btn.closest(".body-list-ask-suport");
    const isOpen = item.classList.contains("active-ask");

    if (singleOpen) {
      rootEl.querySelectorAll(".body-list-ask-suport").forEach(el => {
        el.classList.remove("active-ask");
        el.querySelector(".faq-toggle").innerHTML = SVG_PLUS;
      });
    }

    if (!isOpen) {
      item.classList.add("active-ask");
      btn.innerHTML = SVG_MINUS;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFaqAccordion({
    rootSelector: "#faqList",
    singleOpen: true,
  });
});


