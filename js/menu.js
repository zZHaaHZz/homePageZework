
const btnLogin = document.querySelector('.btn-header-login');
const btnSignup = document.querySelector('.btn-header-signup');
const btnExperiences = document.querySelectorAll('.experience');
const btnViewNow = document.querySelectorAll('.view-now');
const btnSeeMore = document.querySelectorAll('.btn-see-more-articles');
btnLogin?.addEventListener('click', () => {
  alert('Chức năng đăng nhập');

});
btnSignup?.addEventListener('click', () => {
  alert('Chức năng đăng ký');
});

btnExperiences.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('vua click vao Trai nghiem mien phi ngay');
  });
});

btnViewNow.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('vua click vao Xem ngay');
  });
});
btnSeeMore.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('vua click vao Xem them bai viet');
  });
}); 

// === Menu điều hướng ===
const menuLinks = document.querySelectorAll('.ul-menu a');
const trangChuLinks = document.querySelectorAll('a[href="#trangchu"]');

function removeActiveMenu() {
  menuLinks.forEach(link => link.classList.remove('active-menu'));
}

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
        window.location.href = 'pagePrice.html';
        break;
      case '#baiviet':
        window.location.href = 'pageArticle.html';
        break;
      case '#lienhe':
        window.location.href = 'pageContact.html';
        break;
    }
  });
});

trangChuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    removeActiveMenu();
    const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
    menuTrangChu?.classList.add('active-menu');

    window.location.href = 'index.html';
  });
});


const logoLinks = document.querySelectorAll('a[href="#trangchu"]');

logoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("activeMenu", "#trangchu");
    window.location.href = 'index.html';
  });
});


document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (btn) {
    e.preventDefault();
    alert('Bạn vừa nhấn vào nút Mua ngay!');
  }
});


window.addEventListener('DOMContentLoaded', () => {

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


  const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
  menuTrangChu?.classList.add('active-menu');
});


const btnMenu = document.querySelector('.menu-mobile');
const popupMenu = document.querySelector('.mobile-menu-popup');
const btnClose = document.querySelector('.close-menu');

btnMenu.addEventListener('click', () => {
    popupMenu.classList.add('show');
});

btnClose.addEventListener('click', () => {
    popupMenu.classList.remove('show');
});
