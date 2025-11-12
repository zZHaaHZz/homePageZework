const btnLogin = document.querySelector('.btn-header-login');
const btnSignup = document.querySelector('.btn-header-signup');
const btnExperiences = document.querySelectorAll('.experience');

btnLogin.addEventListener('click', () => {
    alert('Chức năng dang nhap');
    // window.location.href = 'login.html';
});
btnSignup.addEventListener('click', () => {
    alert('Chức năng dang ky');
    // window.location.href = 'signup.html';
});
btnExperiences.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Chức năng đang được phát triển');
        // window.location.href = 'signup.html';
    });
});
// Chọn cả hai thẻ <a> có href="#trangchu"
const trangChuLinks = document.querySelectorAll('a[href="#trangchu"]');

trangChuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // chặn nhảy trang nếu cần
        
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.href='index.html';
    });
});

const linkTinhNang = document.querySelector('.ul-menu a[href="#tinhnang"]');

linkTinhNang.addEventListener('click', (e) => {
    e.preventDefault(); // ngăn cuộn mặc định nếu cần
    alert('Bạn vừa nhấn vào: Tính năng');
});

const linkBangGia = document.querySelector('.ul-menu a[href="#banggia"]');
linkBangGia.addEventListener('click', (e) => {
    e.preventDefault(); // ngăn cuộn mặc định nếu cần
    alert('Bạn vừa nhấn vào: Bảng giá');
});

const linkBaiViet = document.querySelector('.ul-menu a[href="#baiviet"]');
linkBaiViet.addEventListener('click', (e) => {
    e.preventDefault(); // ngăn cuộn mặc định nếu cần
    alert('Bạn vừa nhấn vào: Bài viết');
});

const linkLienHe = document.querySelector('.ul-menu a[href="#lienhe"]');
linkLienHe.addEventListener('click', (e) => {
    e.preventDefault(); // ngăn cuộn mặc định nếu cần
    alert('Bạn vừa nhấn vào: Liên hệ');
});


document.addEventListener('click', (e) => {
  const btn = e.target.closest('a[href="#bynow"], .btn-bynow-bander');
  if (btn) {
    e.preventDefault();
    alert('Bạn vừa nhấn vào nút Mua ngay!');
  }
});