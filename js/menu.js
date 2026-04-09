// Dùng trực tiếp file .html để trên Github Pages (hoặc bất kỳ server nào không cấu hình slug) vẫn hiển thị bình thường
const routes = {
  tinh_nang: 'pageFeature.html',
  bang_gia: 'pagePrice.html',
  bai_viet: 'pageArticle.html',
  lien_he: 'pageContact.html',
  bao_mat: 'policy.html',
  dieu_khoan: 'terms.html',
  ve_zework: 'company.html',
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
    window.location.href = 'index.html';
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
  document.body.style.overflow = 'hidden';
});

btnClose.addEventListener('click', () => {
  popupMenu.classList.remove('show');
  btnMenu.style.display = "block";
  btnClose.style.display = "none";
  document.body.style.overflow = '';
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
  if (logoLinksZalo) {
    logoLinksZalo.onclick = () => {
      window.location.href = "https://zalo.me/982303333"
    }
  }

  // Smart Header: Hide on scroll down, show on scroll up
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const scrollThreshold = 70; // Header height
  const delta = 10; // Minimum scroll distance to trigger hide/show

  window.addEventListener('scroll', () => {
    // Only apply hide-on-scroll for mobile devices (screen width <= 768px)
    if (window.innerWidth > 768) {
      header.classList.remove('header-hidden');
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show header at the top
    if (scrollTop < scrollThreshold) {
      header.classList.remove('header-hidden');
      return;
    }

    // Don't hide header if mobile menu is open
    if (popupMenu.classList.contains('show')) {
      header.classList.remove('header-hidden');
      return;
    }

    // Check minimum scroll distance (delta)
    if (Math.abs(lastScrollTop - scrollTop) <= delta) {
      return;
    }

    // Detect direction
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down - hide header
      header.classList.add('header-hidden');
    } else {
      // Scrolling up - show header
      header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop;
  }, { passive: true });
});


