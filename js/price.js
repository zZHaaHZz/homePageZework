//Bang gia
    const plans = {
        "1": [
            {
                name: "Mua lẻ", price: "150.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: false,
                href: "bynow"
            },
            {
                name: "Khởi nghiệp", price: "559.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: true,
                href: "bynow"
            }
        ],
        "6": [
            {
                name: "Khởi nghiệp", price: "3.150.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: false,
                href: "bynow"
            },
            {
                name: "Phổ biến", price: "4.800.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: true,
                href: "bynow"
            },
            {
                name: "Nâng cao", price: "7.425.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: false,
                href: "bynow"
            },
            {
                name: "Cao cấp", price: "9.900.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: false,
                href: "bynow"
            }
        ],
        "12": [
            {
                name: "Khởi nghiệp", price: "5.850.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: false,
                href: "bynow"
            },
            {
                name: "Phổ biến", price: "11.880.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: true,
                href: "bynow"
            },
            {
                name: "Nâng cao", price: "7.680.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
                ],
                hot: false,
                href: "bynow"
            },
            {
                name: "Cao cấp", price: "15.840.000",
                money: "VNĐ",
                desc: [
                    { text: "10 tài khoản Zalo", ok: true },
                    { text: "10 tài khoản nhân viên", ok: true },
                    { text: "Hỗ trợ khôi phục tin nhắn cũ", ok: true },
                    { text: "Hỗ trợ quản lý nhân viên", ok: true },
                    { text: "Giới hạn data lưu trữ tin nhắn", ok: false }
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
        });
    }

    // Hiển thị mặc định 6 tháng khi load
    document.addEventListener("DOMContentLoaded", () => {
        showPlans("6");
    });
