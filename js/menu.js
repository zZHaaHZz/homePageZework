const btnExperiences = document.querySelectorAll('.experience');
const btnViewNow = document.querySelectorAll('.view-now');
const btnSeeMore = document.querySelectorAll('.btn-see-more-articles');



const loginButtons = document.querySelectorAll('.btn-header-login, .btn-login');

loginButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Chức năng dang nhap');

  });
});

const signupButtons = document.querySelectorAll('.btn-header-signup, .btn-signup');

signupButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Chức năng dang kys');

  });
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
const menuLinks = document.querySelectorAll(
  'header .ul-menu a, .mobile-menu-popup .ul-menu a'
);
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

    const popupMenu = document.querySelector('.mobile-menu-popup');
    const btnMenu = document.querySelector('.menu-mobile');
    const btnClose = document.querySelector('.close-menu');

    if (popupMenu?.classList.contains("show")) {
      popupMenu.classList.remove("show");
      btnMenu.style.display = "block";
      btnClose.style.display = "none";
    }

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
    localStorage.setItem("activeMenu", "#trangchu");
}


  removeActiveMenu();

  const savedMenu = localStorage.getItem("activeMenu");

  if (savedMenu) {
  const activeLinks = document.querySelectorAll(
  `header .ul-menu a[href="${savedMenu}"], 
   .mobile-menu-popup .ul-menu a[href="${savedMenu}"]`
);

if (activeLinks.length > 0) {
  activeLinks.forEach(a => a.classList.add("active-menu"));
  return;
}

  }


const menuTrangChu = document.querySelector('.ul-menu a[href="#trangchu"]');
  menuTrangChu?.classList.add('active-menu');
});




// xu ly menu mobile
const btnMenu = document.querySelector('.menu-mobile');
const btnClose = document.querySelector('.close-menu');
const popupMenu = document.querySelector('.mobile-menu-popup');
const popupMenuChangeLangue = document.querySelector('.menu-change-langue');

btnMenu.addEventListener('click', () => {
  popupMenu.classList.add('show');

  btnMenu.style.display = "none";
  btnClose.style.display = "block";
});

btnClose.addEventListener('click', () => {
  popupMenu.classList.remove('show');

  btnMenu.style.display = "block";
  btnClose.style.display = "none";
});



// xu ly drop dow


const dropDow = document.querySelector('.drop-dow');
const dropUp = document.querySelector('.drop-up');

// click drop-dow
dropDow.addEventListener('click', () => {
    popupMenuChangeLangue.classList.add('show');
    dropDow.style.display = 'none';
    dropUp.style.display = 'block';
});

// click drop-up
dropUp.addEventListener('click', () => {
    popupMenuChangeLangue.classList.remove('show');
    dropUp.style.display = 'none';
    dropDow.style.display = 'block';
});
