const wrappers = document.querySelectorAll('.scale-wrapper-top, .scale-wrapper-bottom');
const header = document.querySelector('.header');

function resizeWrapper() {
    const screenWidth = window.innerWidth;
    const pcWidth = 1440;

    wrappers.forEach(wrapper => {
        if (screenWidth >= pcWidth) {
            wrapper.style.width = `${pcWidth}px`;
        } else {
            wrapper.style.width = '100%';
        }
    });
}

function autoScale() {
    const baseWidth = 1440; 
    const screenWidth = window.innerWidth;
    const scale = screenWidth / baseWidth;

    const wrappers = document.querySelectorAll('.wrapper');
    const header = document.querySelector('header'); // chỉnh selector đúng

    // scale các wrapper
    wrappers.forEach(wrapper => {
        wrapper.style.transform = `scale(${scale})`;
        wrapper.style.transformOrigin = 'top left';
        wrapper.style.width = `${baseWidth}px`;
    });

    // scale header nhưng vẫn bám top
    if (header) {
        header.style.transform = `scale(${scale})`;
        header.style.transformOrigin = 'top left';
    }
}

// chạy khi load + resize
window.addEventListener('load', autoScale);
window.addEventListener('resize', autoScale);


// gọi khi load và resize
autoScale();
window.addEventListener('resize', autoScale);
// gọi khi load
resizeWrapper();
autoScale();

// gọi khi resize
window.addEventListener('resize', () => {
    resizeWrapper();
    autoScale();
});
