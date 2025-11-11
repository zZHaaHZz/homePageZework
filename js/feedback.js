    // feebback
    const feedbacks = [
  {
    img: "img/zework.png",
    name: "ZeWork",
    position: "Khach hang 1",
    content: "❤️ Từ khi dùng Zework, chúng tôi không còn bỏ sót tin nhắn khách hàng. Mọi thứ được sắp xếp và theo dõi cực kỳ dễ dàng.",
    stars: 5
  },
  {
    img: "img/zework.png",
    name: "ZeWork",
    position: "Product Owner",
    content: "❤️ Từ khi dùng Zework, chúng tôi không còn bỏ sót tin nhắn khách hàng. Mọi thứ được sắp xếp và theo dõi cực kỳ dễ dàng.",
    stars: 5
  },
  {
    img: "img/zework.png",
    name: "ZeWork",
    position: "Khach hang 2",
    content: "❤️ Từ khi dùng Zework, chúng tôi không còn bỏ sót tin nhắn khách hàng. Mọi thứ được sắp xếp và theo dõi cực kỳ dễ dàng.",
    stars: 5
  },
  {
    img: "img/zework.png",
    name: "ZeWork",
    position: "Product Owner",
    content: "❤️ Từ khi dùng Zework, chúng tôi không còn bỏ sót tin nhắn khách hàng. Mọi thứ được sắp xếp và theo dõi cực kỳ dễ dàng.",
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