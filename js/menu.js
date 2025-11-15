// === Nút đăng nhập, đăng ký, trải nghiệm ===
const btnLogin = document.querySelector('.btn-header-login');
const btnSignup = document.querySelector('.btn-header-signup');
const btnExperiences = document.querySelectorAll('.experience');
const btnViewNow = document.querySelectorAll('.view-now');
btnLogin?.addEventListener('click', () => {
  alert('Chức năng đăng nhập');
  // window.location.href = 'login.html';
});

btnSignup?.addEventListener('click', () => {
  alert('Chức năng đăng ký');
  // window.location.href = 'signup.html';
});

btnExperiences.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('vua click vao btnExperiences');
  });
});

btnViewNow.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('vua click vao btnViewNow');
  });
});

// === Menu điều hướng ===
const menuLinks = document.querySelectorAll('.ul-menu a');
const trangChuLinks = document.querySelectorAll('a[href="#trangchu"]'); // gồm cả logo

// Hàm xóa class active
function removeActiveMenu() {
  menuLinks.forEach(link => link.classList.remove('active-menu'));
}

// Gán sự kiện click cho tất cả link menu
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveMenu();
    link.classList.add('active-menu');
    const href = link.getAttribute('href');
    localStorage.setItem("activeMenu", href);
    switch (href) {
      case '#trangchu':
        window.location.href = 'index.html';
        break;
      case '#tinhnang':
        window.location.href = 'pageFeature.html';
        break;
      case '#banggia':
        window.location.href = 'pricePage.html';
        break;
      case '#baiviet':
        window.location.href = 'pageArticle.html';
        break;
      case '#lienhe':
        alert('Bạn vừa nhấn vào: Liên hệ');
        break;
    }
  });
});

// === Sự kiện cho logo cũng là "Trang chủ" ===
trangChuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveMenu();

    // Thêm active cho link "Trang chủ" trong menu
    const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
    menuTrangChu?.classList.add('active-menu');

    window.location.href = 'index.html';
  });
});


const logoLinks = document.querySelectorAll('a[href="#trangchu"]');

logoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Lưu menu active vào localStorage
    localStorage.setItem("activeMenu", "#trangchu");

    // Chuyển trang
    window.location.href = 'index.html';
  });
});


// === Nút "Mua ngay" ===
document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (btn) {
    e.preventDefault();
    alert('Bạn vừa nhấn vào nút Mua ngay!');
  }
});


// // === Mặc định Trang chủ active khi load trang ===
// window.addEventListener('DOMContentLoaded', () => {
//   removeActiveMenu();
//   const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
//   menuTrangChu?.classList.add('active-menu');
// });

// === Khôi phục menu active từ localStorage ===
window.addEventListener('DOMContentLoaded', () => {
  // Nếu đang ở trang chủ → clear localStorage
  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    localStorage.removeItem("activeMenu");
  }

  removeActiveMenu();

  const savedMenu = localStorage.getItem("activeMenu");

  if (savedMenu) {
    const activeLink = document.querySelector(`.ul-menu a[href="${savedMenu}"]`);
    if (activeLink) {
      activeLink.classList.add('active-menu');
      return;
    }
  }

  // Nếu không có menu đã lưu hoặc đang ở trang chủ → mặc định Trang chủ active
  const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
  menuTrangChu?.classList.add('active-menu');
});


