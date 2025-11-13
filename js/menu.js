// === Nút đăng nhập, đăng ký, trải nghiệm ===
const btnLogin = document.querySelector('.btn-header-login');
const btnSignup = document.querySelector('.btn-header-signup');
const btnExperiences = document.querySelectorAll('.experience');

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
    alert('Chức năng đang được phát triển');
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
    switch (href) {
      case '#trangchu':
        window.location.href = 'index.html';
        break;
      case '#tinhnang':
        window.location.href = 'feature.html';
        break;
      case '#banggia':
        alert('Bạn vừa nhấn vào: Bảng giá');
        break;
      case '#baiviet':
        alert('Bạn vừa nhấn vào: Bài viết');
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


// === Nút "Mua ngay" ===
document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (btn) {
    e.preventDefault();
    alert('Bạn vừa nhấn vào nút Mua ngay!');
  }
});


// === Mặc định Trang chủ active khi load trang ===
window.addEventListener('DOMContentLoaded', () => {
  removeActiveMenu();
  const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
  menuTrangChu?.classList.add('active-menu');
});
