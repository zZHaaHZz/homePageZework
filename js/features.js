// Feature data
const features = [
  {
    id: "inbox",
    title: "Nhắn tin",
    desc: "Quản lý toàn bộ hội thoại trong một giao diện duy nhất. Dễ tìm, dễ follow, không bỏ sót khách nào vì mọi thứ đều được lưu tập trung.",
    shortDesc: "Quản lý hội thoại tập trung",
    img: "./img/img_chat.webp",
  },
  {
    id: "role",
    title: "Phân quyền",
    desc: "Tạo nhóm để thảo luận công việc, chia sẻ tệp và hình ảnh dễ dàng.",
    shortDesc: "Phân công & quản lý đội ngũ",
    img: "./img/why-1.webp",
  },
  {
    id: "customer",
    title: "Khách hàng",
    desc: "Thực hiện cuộc gọi thoại hoặc video chất lượng cao, không giới hạn.",
    shortDesc: "CRM & quản lý liên hệ",
    img: "./img/why-2.webp",
  },
  {
    id: "synchronize",
    title: "Đồng bộ",
    desc: "Quản lý hội thoại, phân công và theo dõi hiệu suất theo từng nhân viên.",
    shortDesc: "Đồng bộ Zalo realtime",
    img: "./img/imgFreature/Container.webp",
  },
  {
    id: "storage",
    title: "Lưu trữ Cloud",
    desc: "Lưu trữ an toàn toàn bộ lịch sử hội thoại Zalo, tệp đính kèm và dữ liệu khách hàng. Đảm bảo dữ liệu được bảo mật, không giới hạn dung lượng và dễ dàng truy xuất khi cần.",
    shortDesc: "Lưu trữ không giới hạn",
    img: "./img/imgFreature/Container (12).webp",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Bảng điều khiển trực quan cung cấp cái nhìn tổng quan tức thì về hiệu suất Zalo và hoạt động đội ngũ, giúp bạn quản lý và tối ưu hóa chiến lược.",
    shortDesc: "Thống kê & báo cáo",
    img: "img/why-3.webp",
  },
];

// Auto-scroll state
let autoScrollInterval = null;
let currentFeatureIndex = 0;
let isUserInteracting = false;
const AUTO_SCROLL_DELAY = 4000; // 4s per item

/**
 * Build the vertical scroll menu HTML
 */
function buildScrollMenu() {
  const menuContainer = document.querySelector('.menu-features-1');
  if (!menuContainer) return;

  // Clear existing content
  menuContainer.innerHTML = '';

  // Create scroll track with duplicated items for infinite loop visual
  const track = document.createElement('div');
  track.className = 'menu-scroll-track';
  track.style.animation = 'none'; // We control scroll via JS instead

  // Build items (original set)
  features.forEach(function (feature, index) {
    const item = createMenuItem(feature, index);
    track.appendChild(item);
  });

  menuContainer.appendChild(track);

  // Pause auto-scroll on hover
  menuContainer.addEventListener('mouseenter', function () {
    isUserInteracting = true;
  });

  menuContainer.addEventListener('mouseleave', function () {
    isUserInteracting = false;
  });
}

/**
 * Create a single menu item element
 */
function createMenuItem(feature, index) {
  const item = document.createElement('button');
  item.className = 'feature-menu-item';
  item.dataset.featureId = feature.id;
  item.dataset.index = index;

  item.innerHTML = `
    <div class="box-icon">
      ${getFeatureIcon(feature.id)}
    </div>
    <div class="item-text">
      <p>${feature.title}</p>
      <span>${feature.shortDesc}</span>
    </div>
    <svg class="item-arrow" width="20" height="20" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.7071 8.07088C23.0976 7.68035 23.0976 7.04719 22.7071 6.65666L16.3431 0.292702C15.9526 -0.0978227 15.3195 -0.0978227 14.9289 0.292702C14.5384 0.683226 14.5384 1.31639 14.9289 1.70692L20.5858 7.36377L14.9289 13.0206C14.5384 13.4111 14.5384 14.0443 14.9289 14.4348C15.3195 14.8254 15.9526 14.8254 16.3431 14.4348L22.7071 8.07088ZM0 7.36377V8.36377H22V7.36377V6.36377H0V7.36377Z" fill="currentColor"/>
    </svg>
  `;

  item.addEventListener('click', function () {
    currentFeatureIndex = index;
    showFeature(feature.id);
    // Brief pause after user click
    isUserInteracting = true;
    setTimeout(function () { isUserInteracting = false; }, 3000);
  });

  return item;
}

/**
 * Get SVG icon for a feature
 */
function getFeatureIcon(id) {
  const icons = {
    inbox: '<svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" fill-rule="evenodd" fill="currentColor" d="m11.9995 3.5c-4.69441 0-8.49999 3.80558-8.49999 8.5v7.75c0 .4142.33579.75.75.75h7.74999c4.6944 0 8.5-3.8056 8.5-8.5 0-4.69442-3.8056-8.5-8.5-8.5zm-9.99999 8.5c0-5.52285 4.47715-10 9.99999-10 5.5229 0 10 4.47715 10 10 0 5.5228-4.4771 10-10 10h-7.74999c-1.24264 0-2.25-1.0074-2.25-2.25zm5.25049-2.26636c0-.41421.33579-.75.75-.75h7.9995c.4142 0 .75.33579.75.75 0 .41426-.3358.74996-.75.74996h-7.9995c-.41421 0-.75-.3357-.75-.74996zm0 4.53276c0-.4143.33579-.75.75-.75h4.508c.4142 0 .75.3357.75.75 0 .4142-.3358.75-.75.75h-4.508c-.41421 0-.75-.3358-.75-.75z"></path></svg>',
    role: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
    customer: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
    synchronize: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>',
    storage: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>'

  };
  return icons[id] || '';
}

/**
 * Show feature detail
 */
function showFeature(id) {
  const feature = features.find(function (f) { return f.id === id; });
  if (!feature) return;

  var container = document.querySelector('.feature-detail');
  if (!container) {
    container = document.createElement('div');
    container.className = 'feature-detail';
    document.querySelector('.features-1').appendChild(container);
  }

  // Fade transition
  container.style.opacity = '0';
  setTimeout(function () {
    container.innerHTML = '<div class="content-feature-detail"><h2>' + feature.title + '</h2><p>' + feature.desc + '</p></div><div class="box-img-feature"><img src="' + feature.img + '" alt="' + feature.title + '"></div>';
    container.style.opacity = '1';
  }, 150);

  // Update active state
  document.querySelectorAll('.feature-menu-item').forEach(function (btn) {
    btn.classList.remove('active-menu-feature');
  });

  document.querySelectorAll('.feature-menu-item[data-feature-id="' + id + '"]').forEach(function (btn) {
    btn.classList.add('active-menu-feature');
  });
}

/**
 * Auto-advance to next feature
 */
function startAutoScroll() {
  autoScrollInterval = setInterval(function () {
    if (isUserInteracting) return;

    currentFeatureIndex = (currentFeatureIndex + 1) % features.length;
    showFeature(features[currentFeatureIndex].id);

    // Scroll within the menu container only (not the page)
    var menuContainer = document.querySelector('.menu-features-1');
    var activeItem = menuContainer.querySelector('.feature-menu-item.active-menu-feature');
    if (activeItem && menuContainer) {
      var itemTop = activeItem.offsetTop;
      var containerHeight = menuContainer.clientHeight;
      var itemHeight = activeItem.offsetHeight;
      // Center the active item in the menu container
      var scrollTo = itemTop - (containerHeight / 2) + (itemHeight / 2);
      menuContainer.scrollTo({ top: Math.max(0, scrollTo), behavior: 'smooth' });
    }
  }, AUTO_SCROLL_DELAY);
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  const init = () => {
    buildScrollMenu();
    showFeature('inbox');
    startAutoScroll();
  };
  if (window.requestIdleCallback) {
    requestIdleCallback(init);
  } else {
    setTimeout(init, 200);
  }
});
