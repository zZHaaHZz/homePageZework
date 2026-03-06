// Feature data
const features = [
  {
    id: "inbox",
    title: "Nhắn tin",
    desc: "Quản lý toàn bộ hội thoại trong một giao diện duy nhất. Dễ tìm, dễ follow, không bỏ sót khách nào vì mọi thứ đều được lưu tập trung.",
    shortDesc: "Quản lý hội thoại tập trung",
    img: "./img/img_chat.png",
  },
  {
    id: "role",
    title: "Phân quyền",
    desc: "Tạo nhóm để thảo luận công việc, chia sẻ tệp và hình ảnh dễ dàng.",
    shortDesc: "Phân công & quản lý đội ngũ",
    img: "./img/why-1.svg",
  },
  {
    id: "customer",
    title: "Khách hàng",
    desc: "Thực hiện cuộc gọi thoại hoặc video chất lượng cao, không giới hạn.",
    shortDesc: "CRM & quản lý liên hệ",
    img: "./img/why-2.svg",
  },
  {
    id: "synchronize",
    title: "Đồng bộ",
    desc: "Quản lý hội thoại, phân công và theo dõi hiệu suất theo từng nhân viên.",
    shortDesc: "Đồng bộ Zalo realtime",
    img: "./img/imgFreature/Container (2).svg",
  },
  {
    id: "storage",
    title: "Lưu trữ Cloud",
    desc: "Lưu trữ an toàn toàn bộ lịch sử hội thoại Zalo, tệp đính kèm và dữ liệu khách hàng. Đảm bảo dữ liệu được bảo mật, không giới hạn dung lượng và dễ dàng truy xuất khi cần.",
    shortDesc: "Lưu trữ không giới hạn",
    img: "./img/imgFreature/Container (12).svg",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Bảng điều khiển trực quan cung cấp cái nhìn tổng quan tức thì về hiệu suất Zalo và hoạt động đội ngũ, giúp bạn quản lý và tối ưu hóa chiến lược.",
    shortDesc: "Thống kê & báo cáo",
    img: "img/why-3.svg",
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
    role: '<svg fill="currentColor" viewBox="0 0 519.078 519.078" width="20" height="20"><path d="M429.021,301.952v-84.829c50.826-7.379,90.057-51.122,90.057-103.979c0-58.009-47.191-105.194-105.188-105.194c-49.662,0-91.298,34.634-102.273,80.983H207.465C196.492,42.584,154.862,7.95,105.2,7.95C47.191,7.95,0,55.136,0,113.145c0,52.851,39.221,96.605,90.068,103.979v84.829C39.227,309.328,0,353.08,0,405.934c0,58.009,47.191,105.194,105.2,105.194c53.625,0,97.944-40.377,104.316-92.32h100.031c6.384,51.943,50.69,92.32,104.331,92.32c57.996,0,105.188-47.186,105.188-105.194C519.078,353.08,479.847,309.334,429.021,301.952z"></path></svg>',
    customer: '<svg viewBox="0 0 512 512" width="20" height="20"><path fill="currentColor" d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531s26.628906 132.667969 74.980469 181.019531c48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.640625 74.980469-181.019531s-26.628906-132.667969-74.980469-181.019531z"></path></svg>',
    synchronize: '<svg fill="currentColor" viewBox="0 0 472.621 472.621" width="20" height="20"><path d="M466.721,110.437c-4.98-2.184-10.786,0.088-12.968,5.07l-23.316,53.249C402.132,87.361,324.556,30.801,236.31,30.801c-97.915,0-182.707,69.628-201.614,165.56c-1.051,5.336,2.421,10.513,7.757,11.564c0.643,0.127,1.283,0.188,1.914,0.188c4.608-0.001,8.725-3.252,9.65-7.944C71.11,113.441,147.776,50.493,236.31,50.493c82.834,0,155.275,55.094,178.261,133.22l-59.398-18.406c-5.198-1.613-10.711,1.296-12.319,6.49c-1.61,5.194,1.296,10.71,6.49,12.319l75.932,23.529c0.01,0.003,0.02,0.006,0.03,0.009l0.044,0.013z"></path></svg>',
    storage: '<svg viewBox="0 0 800 800" width="20" height="20"><path d="m417.7 498.9c-.4-.4-.9-.8-1.3-1.2-4.7-4.1-10.6-6.1-16.4-6.1-6.4 0-12.8 2.4-17.7 7.3l-66.7 66.7c-9.8 9.8-9.8 25.6 0 35.4s25.6 9.8 35.4 0l24-24v139.7c0 13.8 11.2 25 25 25s25-11.2 25-25.1v-139.6l24 24c9.8 9.8 25.6 9.8 35.4 0s9.8-25.6 0-35.4z" fill="currentColor"></path></svg>',
    dashboard: '<svg fill="currentColor" viewBox="0 0 16 16" width="20" height="20"><path d="M3,15.5H13A2.503,2.503,0,0,0,15.5,13V3A2.503,2.503,0,0,0,13,.5H3A2.503,2.503,0,0,0,.5,3V13A2.503,2.503,0,0,0,3,15.5ZM1.5,3A1.5017,1.5017,0,0,1,3,1.5H13A1.5017,1.5017,0,0,1,14.5,3V13A1.5017,1.5017,0,0,1,13,14.5H3A1.5017,1.5017,0,0,1,1.5,13Z"></path><path d="M4,12.5A1.5017,1.5017,0,0,0,5.5,11V8a1.5,1.5,0,0,0-3,0v3A1.5017,1.5017,0,0,0,4,12.5ZM3.5,8a.5.5,0,0,1,1,0v3a.5.5,0,0,1-1,0Z"></path><path d="M8,12.5A1.5017,1.5017,0,0,0,9.5,11V5a1.5,1.5,0,0,0-3,0v6A1.5017,1.5017,0,0,0,8,12.5ZM7.5,5a.5.5,0,0,1,1,0v6a.5.5,0,0,1-1,0Z"></path><path d="M12,12.5A1.5017,1.5017,0,0,0,13.5,11V9a1.5,1.5,0,0,0-3,0v2A1.5017,1.5017,0,0,0,12,12.5ZM11.5,9a.5.5,0,0,1,1,0v2a.5.5,0,0,1-1,0Z"></path></svg>'
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
  buildScrollMenu();
  showFeature('inbox');
  startAutoScroll();
});
