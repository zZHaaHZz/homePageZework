//Bang gia
const plans = {
    "1": [
        {
            name: "Cá Nhân", price: "89.000",
            action: "custommer",
            money: "/Tháng",
            desc: [
                { text: "1 tài khoản Zalo", ok: true },
                { text: "1 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Không giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        },
        {
            name: "Khởi nghiệp", price: "337.500",
            money: "VNĐ",
            desc: [
                { text: "5 tài khoản Zalo", ok: true },
                { text: "5 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Không giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: true,
            href: "bynow"
        }
    ],
    "6": [
        {
            name: "Khởi nghiệp", price: "1.890.000",
            money: "VNĐ",
            desc: [
                { text: "5 tài khoản Zalo", ok: true },
                { text: "5 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Không giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        },
        {
            name: "Phổ biến", price: "2.862.000",
            money: "VNĐ",
            desc: [
                { text: "10 tài khoản Zalo", ok: true },
                { text: "10 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Không giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: true,
            href: "bynow"
        },
        {
            name: "Nâng cao", price: "4.428.000",
            money: "VNĐ",
            desc: [
                { text: "20 tài khoản Zalo", ok: true },
                { text: "20 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Không giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        },
        {
            name: "Cao cấp", price: "5.994.000",
            money: "VNĐ",
            desc: [
                { text: "30 tài khoản Zalo", ok: true },
                { text: "30 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Không giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        }
    ],
    "12": [
        {
            name: "Khởi nghiệp", price: "3.510.000",
            money: "VNĐ",
            desc: [
                { text: "5 tài khoản Zalo", ok: true },
                { text: "5 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        },
        {
            name: "Phổ biến", price: "4.644.000",
            money: "VNĐ",
            desc: [
                { text: "10 tài khoản Zalo", ok: true },
                { text: "10 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: true,
            href: "bynow"
        },
        {
            name: "Nâng cao", price: "7.344.000",
            money: "VNĐ",
            desc: [
                { text: "20 tài khoản Zalo", ok: true },
                { text: "20 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        },
        {
            name: "Cao cấp", price: "9.396.000",
            money: "VNĐ",
            desc: [
                { text: "30 tài khoản Zalo", ok: true },
                { text: "30 tài khoản nhân viên", ok: true },
                { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                { text: "Hỗ trợ quản lý nhân viên", ok: true },
                { text: "Giới hạn data lưu trữ tin nhắn", ok: true }
            ],
            hot: false,
            href: "bynow"
        }

    ]

};

function showPlans(month) {
    document.querySelectorAll('.menu-price button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.month === String(month));
    });

    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    plans[month].forEach(p => {
        const product = document.createElement("div");
        product.className = "product" + (p.hot ? " hot" : "");

        let descHTML = "";
        p.desc.forEach(d => {
            const icon = d.ok
                ? '<i class="fa-solid fa-check"></i>'
                : '<i class="fa-solid fa-xmark"></i>';
            descHTML += `<li>${icon} ${d.text}</li>`;
        });
        if (p.action != undefined) {
            product.innerHTML = `
            <div class="name-price">
            <h4>${p.name}</h4>
            <div class="price">
             <h3 style="font-size: 1.9rem ;padding-right: 0.5rem; padding-top: 1rem ;padding-botton: 0rem">Chỉ từ </h3> 
                <h3 style="font-size: 3rem; padding-top: 1rem"> ${p.price}</h3>
                <p style="font-size: 2.8rem">${p.money}</p>
            </div>
            </div>
            <ul>${descHTML}</ul>
             <a href="#${p.href}"><button class="btn-bynow">Mua ngay</button></a>
        `;
            container.appendChild(product);

        } else {
            product.innerHTML = `
            <div class="name-price">
            <h4>${p.name}</h4>
            <div class="price">
                <h3>${p.price}</h3>
                <p>${p.money}</p>
            </div>
            </div>
            <ul>${descHTML}</ul>
             <a href="#${p.href}"><button class="btn-bynow">Mua ngay</button></a>
        `;
            container.appendChild(product);
        }
    });
}

// Hiển thị mặc định 6 tháng khi load
document.addEventListener("DOMContentLoaded", () => {
    showPlans("6");
});