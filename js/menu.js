const btnExperiences = document.querySelectorAll('.experience');
const btnViewNow = document.querySelectorAll('.view-now');
const btnSeeMore = document.querySelectorAll('.btn-see-more-articles');
const loginButtons = document.querySelectorAll('.btn-header-login, .btn-login');

loginButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = "https://dev-chat.zework.com"
  });
});

const signupButtons = document.querySelectorAll('.btn-header-signup, .btn-signup');

signupButtons.forEach(btn => {
  btn.addEventListener('click', () => {
       window.location.href = "https://dev.zework.com/vn/register"

  });
});


btnExperiences.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = "https://dev-chat.zework.com"
  });
});

btnViewNow.forEach(btn => {
  btn.addEventListener('click', () => {
    
  });
});
btnSeeMore.forEach(btn => {
  btn.addEventListener('click', () => {
  });
});


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
      case '#tinhnang':
        window.location.href = '/tinh-nang';
        break;
      case '#banggia':
        window.location.href = '/bang-gia';
        break;
      case '#baiviet':
        window.location.href = '/bai-viet';
        break;
      case '#lienhe':
        window.location.href = '/lien-he';
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
    window.location.href = '/';
  });
});

const logoLinks = document.querySelectorAll('a[href="#trangchu"]');
logoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

const featureLink = document.querySelectorAll('a[href="#tinhnang"]');
featureLink.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("activeMenu", "#tinhnang");
    window.location.href = '/tinh-nang';
  });
});

const priceLinks = document.querySelectorAll('a[href="#banggia"]');
priceLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("activeMenu", "#banggia");
    window.location.href = '/bang-gia';
  });
});

const articleLinks = document.querySelectorAll('a[href="#baiviet"]');
articleLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("activeMenu", "#baiviet");
    window.location.href = '/bai-viet';
  });
});

const contactLinks = document.querySelectorAll('a[href="#lienhe"]');
contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("activeMenu", "#lienhe");
    window.location.href = '/lien-he';
  });
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (btn) {
    e.preventDefault();
    window.location.href = "https://app.zework.com/vn/price"; 
  }
});






window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith("/") || window.location.pathname === "/") {
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
  dropDow.style.display = 'none';
  dropUp.style.display = 'block';
});

// click drop-up
dropUp.addEventListener('click', () => {
  dropUp.style.display = 'none';
  dropDow.style.display = 'block';
});

const btnDownWin = document.querySelector('.downWin');
btnDownWin.onclick = () => {
    window.location.href = 'https://zeworkuser.s3.ap-southeast-1.amazonaws.com/download/ZeworkDesktop.msi';
}


const btnDownMacOs = document.querySelector('.downMacOs');
btnDownMacOs.onclick = () => {
    window.location.href = 'https://zeworkuser.s3.ap-southeast-1.amazonaws.com/download/ZeworkDesktop.dmg';
}


document.addEventListener("DOMContentLoaded", () => {
    const logoLinksZalo = document.querySelector('.icon-zalo-chat');
    logoLinksZalo.onclick = () => {   
      window.location.href = "https://zalo.me/982303333"
    } 
});


