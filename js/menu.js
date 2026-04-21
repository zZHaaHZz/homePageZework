// === Unified Event Delegation for Buttons ===
document.addEventListener('click', (e) => {
  // Debug log: uncomment the line below to log every click for troubleshooting
  // console.log("Document clicked:", e.target);

  // 1. Login Buttons
  const loginBtn = e.target.closest('.btn-header-login, .btn-login');
  if (loginBtn) {
    console.log("Login button clicked");
    window.location.href = "https://chat.zework.com/";
    return;
  }

  // 2. Signup Buttons
  const signupBtn = e.target.closest('.btn-header-signup, .btn-signup');
  if (signupBtn) {
    console.log("Signup button clicked");
    window.open("https://app.zework.com/register", "_blank");
    return;
  }

  // 3. Experience Buttons
  const btnExperience = e.target.closest('.experience');
  if (btnExperience) {
    console.log("Experience button clicked");
    window.location.href = "https://chat.zework.com/";
    return;
  }

  // 4. Windows Download
  const btnDownWin = e.target.closest('.downWin');
  if (btnDownWin) {
    console.log("Windows download clicked");
    window.location.href = 'https://zeworkuser.s3.ap-southeast-1.amazonaws.com/download/ZeworkDesktop.msi';
    return;
  }

  // 5. Mac Download
  const btnDownMacOs = e.target.closest('.downMacOs');
  if (btnDownMacOs) {
    console.log("Mac download clicked");
    window.location.href = 'https://zeworkuser.s3.ap-southeast-1.amazonaws.com/download/ZeworkDesktop.dmg';
    return;
  }

  // 6. Buy Now
  const buyNowBtn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (buyNowBtn) {
    e.preventDefault();
    console.log("Buy Now clicked");
    window.location.href = "https://app.zework.com/vn/price";
    return;
  }

  // 7. Contact Info Cards (Make whole card clickable)
  const contactCard = e.target.closest('.contact-info-card');
  if (contactCard) {
    const link = contactCard.querySelector('a');
    if (link && e.target !== link) {
      console.log("Contact card clicked, triggering link:", link.href);
      // For tel: or mailto:, location.href is better
      if (link.href.startsWith('tel:') || link.href.startsWith('mailto:')) {
        window.location.href = link.href;
      } else {
        window.open(link.href, link.target || '_self');
      }
      return;
    }
  }

  // 8. Zalo Contact
  const btnZalo = e.target.closest('.icon-zalo-chat');
  if (btnZalo) {
    console.log("Zalo contact clicked");
    window.location.href = "https://zalo.me/982303333";
    return;
  }

});

const subdirs = ['/tinh-nang-zework', '/bang-gia', '/bai-viet', '/lien-he-zework', '/bao-mat', '/dieu-khoan', '/ve-zework'];
const isSubdir = subdirs.some(dir => window.location.pathname.includes(dir));
const prefix = isSubdir ? '../' : '';

const routes = {
  trang_chu: prefix + 'index.html',
  tinh_nang: prefix + 'tinh-nang-zework/',
  bang_gia: prefix + 'bang-gia/',
  bai_viet: prefix + 'bai-viet/',
  lien_he: prefix + 'lien-he-zework/',
  bao_mat: prefix + 'bao-mat/',
  dieu_khoan: prefix + 'dieu-khoan/',
  ve_zework: prefix + 've-zework/',
  di_dong: prefix + 'zework-mobile/',
};

// --- Navigation Link Handling ---
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('header .ul-menu a, .mobile-menu-popup .ul-menu a');

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // If it's a relative internal link starting with #, handle it
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const pageKey = href.substring(1); // e.g. "tinhnang"

        // Map anchor to actual route
        const routeMap = {
          'trangchu': routes.trang_chu,
          'tinhnang': routes.tinh_nang,
          'banggia': routes.bang_gia,
          'baiviet': routes.bai_viet,
          'lienhe': routes.lien_he,
          'baomat': routes.bao_mat,
          'didong': routes.di_dong,
          'vezework': routes.ve_zework,
          'dieukhoan': routes.dieu_khoan
        };

        if (routeMap[pageKey]) {
          window.location.href = routeMap[pageKey];
        }
      }
    });
  });

  // Logo handling
  const logoLinks = document.querySelectorAll('a[href="#trangchu"]');
  logoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = routes.trang_chu;
    });
  });

  // Active state logic
  const getActiveMenuFromURL = () => {
    const pathname = window.location.pathname;
    if (pathname.includes("/tinh-nang")) return "#tinhnang";
    if (pathname.includes("/bang-gia")) return "#banggia";
    if (pathname.includes("/bai-viet")) return "#baiviet";
    if (pathname.includes("/lien-he")) return "#lienhe";
    if (pathname.includes("/bao-mat")) return "#baomat";
    if (pathname.includes("/ve-zework")) return "#vezework";
    if (pathname.includes("/dieu-khoan")) return "#dieukhoan";
    if (pathname.includes("/zework-mobile")) return "#didong";
    if (pathname.endsWith("/") || pathname === "" || pathname.includes("index.html")) return "#trangchu";
    return null;
  };

  const activeMenu = getActiveMenuFromURL();
  if (activeMenu) {
    document.querySelectorAll(`header .ul-menu a[href="${activeMenu}"], .mobile-menu-popup .ul-menu a[href="${activeMenu}"]`)
      .forEach(a => a.classList.add("active-menu"));
  }

  // Mobile Menu Toggles
  const btnMenu = document.querySelector('.menu-mobile');
  const btnClose = document.querySelector('.close-menu');
  const popupMenu = document.querySelector('.mobile-menu-popup');

  if (btnMenu && btnClose && popupMenu) {
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
  }

  // Language Dropdown
  const dropDow = document.querySelector('.drop-dow');
  const dropUp = document.querySelector('.drop-up');
  const popupMenuChangeLangue = document.querySelector('.menu-change-langue');

  if (dropDow && dropUp && popupMenuChangeLangue) {
    dropDow.addEventListener('click', () => {
      dropDow.style.display = 'none';
      dropUp.style.display = 'block';
      popupMenuChangeLangue.classList.add('show');
    });

    dropUp.addEventListener('click', () => {
      dropUp.style.display = 'none';
      dropDow.style.display = 'block';
      popupMenuChangeLangue.classList.remove('show');
    });
  }

  // Zalo Floating Icon
  const logoLinksZalo = document.querySelector('.icon-zalo-chat');
  if (logoLinksZalo) {
    logoLinksZalo.addEventListener('click', () => {
      window.location.href = "https://zalo.me/982303333";
    });
  }

  // Smart Header logic
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const scrollThreshold = 70;
  const delta = 10;
  let windowWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (windowWidth > 768) {
      header?.classList.remove('header-hidden');
      return;
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop < scrollThreshold) {
      header?.classList.remove('header-hidden');
      lastScrollTop = scrollTop;
      return;
    }
    if (popupMenu?.classList.contains('show')) {
      header?.classList.remove('header-hidden');
      lastScrollTop = scrollTop;
      return;
    }
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      header?.classList.add('header-hidden');
    } else {
      header?.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop;
  }, { passive: true });
});

