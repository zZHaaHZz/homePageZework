// Auto-detect môi trường: local dùng file .html, production dùng slug
const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const routes = {
  tinh_nang: isLocal ? '/pageFeature.html' : '/tinh-nang',
  bang_gia: isLocal ? '/pagePrice.html' : '/bang-gia',
  bai_viet: isLocal ? '/pageArticle.html' : '/bai-viet',
  lien_he: isLocal ? '/pageContact.html' : '/lien-he',
  bao_mat: isLocal ? '/policy.html' : '/bao-mat',
  dieu_khoan: isLocal ? '/terms.html' : '/dieu-khoan-dich-vu',
  ve_zework: isLocal ? '/company.html' : '/ve-zework',
};

const btnExperiences = document.querySelectorAll('.experience');
const btnViewNow = document.querySelectorAll('.view-now');
const btnSeeMore = document.querySelectorAll('.btn-see-more-articles');
const loginButtons = document.querySelectorAll('.btn-header-login, .btn-login');

loginButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = "https://chat.zework.com/"
  });
});

const signupButtons = document.querySelectorAll('.btn-header-signup, .btn-signup');

signupButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    window.open("https://app.zework.com/register", "_blank");
  });
});


btnExperiences.forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = "https://chat.zework.com/"
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
        window.location.href = routes.tinh_nang;
        break;
      case '#banggia':
        window.location.href = routes.bang_gia;
        break;
      case '#baiviet':
        window.location.href = routes.bai_viet;
        break;
      case '#lienhe':
        window.location.href = routes.lien_he;
        break;
      case '#baomat':
        window.location.href = routes.bao_mat;
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
    window.location.href = routes.tinh_nang;
  });
});

const priceLinks = document.querySelectorAll('a[href="#banggia"]');
priceLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.bang_gia;
  });
});

const articleLinks = document.querySelectorAll('a[href="#baiviet"]');
articleLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.bai_viet;
  });
});

const contactLinks = document.querySelectorAll('a[href="#lienhe"]');
contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.lien_he;
  });
});

const baomatLinks = document.querySelectorAll('a[href="#baomat"]');
baomatLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.bao_mat;
  });
});

const dieuKhoanLinks = document.querySelectorAll('a[href="#dieu-khoan"]');
dieuKhoanLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.dieu_khoan;
  });
});

const vezeworkLinks = document.querySelectorAll('a[href="#vezework"]');
vezeworkLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = routes.ve_zework;
  });
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (btn) {
    e.preventDefault();
    window.location.href = "https://app.zework.com/vn/price";
  }
});

// Hàm lấy active menu dựa trên URL hiện tại
const getActiveMenuFromURL = () => {
  const pathname = window.location.pathname;

  if (pathname.endsWith("/") || pathname === "/" || pathname.endsWith("/index.html")) {
    return "#trangchu";
  } else if (pathname.includes("/tinh-nang") || pathname.endsWith("/pageFeature.html")) {
    return "#tinhnang";
  } else if (pathname.includes("/bang-gia") || pathname.endsWith("/pagePrice.html")) {
    return "#banggia";
  } else if (pathname.includes("/bai-viet") || pathname.endsWith("/pageArticle.html")) {
    return "#baiviet";
  } else if (pathname.includes("/lien-he") || pathname.endsWith("/pageContact.html")) {
    return "#lienhe";
  } else if (pathname.includes("/bao-mat") || pathname.endsWith("/policy.html")) {
    return "#baomat";
  } else if (pathname.includes("/ve-zework") || pathname.endsWith("/company.html")) {
    return "#vezework";
  } else if (pathname.includes("/dieu-khoan") || pathname.endsWith("/terms.html")) {
    return "#dieukhoan";
  }

  return null;
};

const setActiveMenu = getActiveMenuFromURL();



window.addEventListener('DOMContentLoaded', () => {
  removeActiveMenu();

  // Lấy active menu từ URL
  const activeMenuFromURL = getActiveMenuFromURL();

  // Thêm class active-menu vào tất cả các link menu tương ứng
  const activeLinks = document.querySelectorAll(
    `header .ul-menu a[href="${activeMenuFromURL}"], 
     .mobile-menu-popup .ul-menu a[href="${activeMenuFromURL}"]`
  );

  if (activeLinks.length > 0) {
    activeLinks.forEach(a => a.classList.add("active-menu"));
  }
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

// click drop-dow → show dropdown
dropDow.addEventListener('click', () => {
  dropDow.style.display = 'none';
  dropUp.style.display = 'block';
  popupMenuChangeLangue.classList.add('show');
});

// click drop-up → hide dropdown
dropUp.addEventListener('click', () => {
  dropUp.style.display = 'none';
  dropDow.style.display = 'block';
  popupMenuChangeLangue.classList.remove('show');
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


