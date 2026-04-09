document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Images
    const imgZalo = new Image(); imgZalo.src = './img/Icon_of_Zalo.svg';
    const imgEmployee = new Image(); imgEmployee.src = './img/icon-employee.svg';
    const imgZework = new Image(); imgZework.src = './img/logoZework.svg';

    // Unique Avatars
    const avatars = [];
    for (let i = 1; i <= 4; i++) {
        const img = new Image();
        img.src = `./img/avatarFeedback/avatar_${i}.webp`;
        avatars.push(img);
    }

    // Packet Icons
    const imgMsg = new Image(); imgMsg.src = './img/icon-message.svg';
    const imgCall = new Image(); imgCall.src = './img/icon-call.svg';
    const imgLock = new Image(); imgLock.src = './img/icon-lock.svg';

    function resizeCanvas() {
        const parent = canvas.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight || (width * 0.5625);

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        return { width, height };
    }

    let { width: w, height: h } = resizeCanvas();
    window.addEventListener('resize', () => {
        ({ width: w, height: h } = resizeCanvas());
        initZaloNodes();
    });

    const config = {
        zaloCount: 3,
        nodeRadius: 20,
        hubRadius: 50,
        color: {
            zalo: '#0068ff',
            employee: '#415eb3',
            zework: '#FFFFFF',
            line: 'rgba(55, 93, 250, 0.1)',
            lineSecure: 'rgba(255, 193, 7, 0.3)',
            packetOut: '#4caf50',
            text: '#333'
        },
        speed: 0.8
    };

    // State
    // Phases: Sync -> Distribute -> Security -> Analytics -> Tags
    let phase = 'sync';
    let lastPhaseSwitch = Date.now();
    const PHASE_DURATION_SYNC = 7000;
    const PHASE_DURATION_DIST = 7000;
    const PHASE_DURATION_SECURE = 6000;
    const PHASE_DURATION_ANALYTICS = 6000;
    const PHASE_DURATION_TAGS = 6000;

    let hubY = h / 2;
    let targetHubY = h / 2;

    const zaloNodes = [];
    const employeeNodes = [];
    const packets = [];
    const timeouts = []; // Track timeouts to clear on phase switch
    const MAX_EMPLOYEES = 4;

    // Analytics Data
    let chartData = [];
    let chartProgress = 0;

    // Leaderboard Data - SCORES CLOSE TOGETHER for frequent swapping
    const employeeNames = [
        { id: 1, name: "Trần Minh Hằng", dept: "Chăm sóc khách hàng", pending: 2, closed: 120, y: 0, targetY: 0 },
        { id: 2, name: "Đặng Minh Tú", dept: "Dịch vụ khách hàng", pending: 3, closed: 118, y: 0, targetY: 0 },
        { id: 3, name: "Nguyễn Trọng Nhân", dept: "Customer Service", pending: 1, closed: 116, y: 0, targetY: 0 },
        { id: 4, name: "Lữ Mạnh Nha", dept: "Sales", pending: 4, closed: 114, y: 0, targetY: 0 },
        { id: 5, name: "Phạm Văn A", dept: "Sales", pending: 5, closed: 112, y: 0, targetY: 0 }
    ];

    // Tag Data
    const tagData = [
        { id: 1, label: "Đã xử lý", count: 78, color: "#e6f4ea", text: "#1e8e3e", y: 0, targetY: 0 }, // Green
        { id: 2, label: "Đang xử lý", count: 76, color: "#e8f0fe", text: "#1967d2", y: 0, targetY: 0 }, // Blue
        { id: 3, label: "Chưa xử lý", count: 74, color: "#f1f3f4", text: "#5f6368", y: 0, targetY: 0 }, // Grey
        { id: 4, label: "Đã huỷ", count: 72, color: "#fce8e6", text: "#c5221f", y: 0, targetY: 0 },     // Pink/Red
        { id: 5, label: "Chốt đơn", count: 20, color: "#1e8e3e", text: "#ffffff", y: 0, targetY: 0 },    // Dark Green
        { id: 6, label: "Chờ chuyển tiền", count: 18, color: "#9334e6", text: "#ffffff", y: 0, targetY: 0 } // Purple
    ];

    class Node {
        constructor(id, x, y, type) {
            this.id = id;
            this.targetX = x;
            this.targetY = y;
            this.currentX = type === 'employee' ? w / 2 : x;
            this.currentY = type === 'employee' ? h / 2 : y;
            this.type = type;
            this.opacity = type === 'employee' ? 0 : 1;
            this.hasPermission = false;
        }

        update() {
            const dx = this.targetX - this.currentX;
            const dy = this.targetY - this.currentY;
            this.currentX += dx * 0.05;
            this.currentY += dy * 0.05;

            if (this.type === 'employee' && this.opacity < 1) {
                this.opacity += 0.05;
            }
        }

        draw() {
            ctx.globalAlpha = this.opacity;

            ctx.beginPath();
            ctx.moveTo(this.currentX, this.currentY);
            ctx.lineTo(w / 2, hubY);
            ctx.lineWidth = phase === 'security' ? 2 : 1;
            ctx.strokeStyle = phase === 'security' ? config.color.lineSecure : config.color.line;
            ctx.stroke();

            const radius = this.type === 'zalo' ? 30 : 28; // Increased employee radius from 20 to 28

            ctx.beginPath();
            ctx.arc(this.currentX, this.currentY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.lineWidth = 2;
            if (phase === 'security' && this.hasPermission) {
                ctx.strokeStyle = '#ffc107';
            } else {
                ctx.strokeStyle = this.type === 'zalo' ? config.color.zalo : config.color.employee;
            }
            // Zalo Pulse
            if (this.type === 'zalo' && phase === 'sync') {
                ctx.shadowColor = config.color.zalo;
                ctx.shadowBlur = 15;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            const img = this.type === 'zalo' ? imgZalo : (avatars[this.id % avatars.length] || imgEmployee);
            if (img.complete && img.naturalWidth > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.currentX, this.currentY, radius - 4, 0, Math.PI * 2);
                ctx.clip();

                const imgSize = this.type === 'zalo' ? 44 : 40; // Increased employee imgSize
                ctx.drawImage(img, this.currentX - imgSize / 2, this.currentY - imgSize / 2, imgSize, imgSize);

                ctx.restore();

                if (phase === 'security' && this.hasPermission && imgLock.complete) {
                    const badgeSize = 16;
                    ctx.drawImage(imgLock, this.currentX + 10, this.currentY - 24, badgeSize, badgeSize);
                }
            }

            ctx.globalAlpha = 1.0;
        }
    }

    function initZaloNodes() {
        const centerX = w / 2;
        const centerY = h / 2;
        const radiusX = w * 0.38; // Increased slightly
        const radiusY = h * 0.28; // Decreased slightly

        // Arrange in Top Arc (Left -> Right)
        // From PI (180deg) to 2*PI (360deg) -> Top semicircle
        // Let's constrain to a tighter arc: 1.2 PI to 1.8 PI
        const startTo = Math.PI * 1.2;
        const endTo = Math.PI * 1.8;
        const step = config.zaloCount > 1 ? (endTo - startTo) / (config.zaloCount - 1) : 0;

        for (let i = 0; i < config.zaloCount; i++) {
            let angle = Math.PI * 1.5; // Default Top
            if (config.zaloCount > 1) {
                angle = startTo + i * step;
            }
            const x = centerX + Math.cos(angle) * radiusX;
            const y = centerY + Math.sin(angle) * radiusY;
            zaloNodes.push(new Node(i, x, y, 'zalo'));
        }
    }

    function initChartData() {
        chartData = [];
        let val = 50;
        for (let i = 0; i < 15; i++) {
            val += (Math.random() - 0.4) * 40;
            if (val < 20) val = 20;
            if (val > 80) val = 80;
            chartData.push(val);
        }
        chartProgress = 0;

        // Reset positions
        // Ensure sorted initially
        employeeNames.sort((a, b) => b.closed - a.closed);
        employeeNames.forEach((e, idx) => {
            e.y = idx * 50;
            e.targetY = idx * 50;
        });

        // Reset Tag positions
        tagData.sort((a, b) => b.count - a.count);
        tagData.forEach((t, idx) => {
            t.y = idx * 50;
            t.targetY = idx * 50;
        });
    }

    class Packet {
        constructor(source, target, image) {
            this.source = source;
            this.target = target;
            this.image = image;
            this.t = 0; // Use normalized time (0 to 1) for perfect synchronization
            this.done = false;
        }

        update() {
            // Get current positions of moving source and target objects
            const startX = this.source.currentX !== undefined ? this.source.currentX : (this.source.x || w / 2);
            const startY = this.source.currentY !== undefined ? this.source.currentY : (this.source.y || hubY);
            const endX = this.target.currentX !== undefined ? this.target.currentX : (this.target.x || w / 2);
            const endY = this.target.currentY !== undefined ? this.target.currentY : (this.target.y || hubY);

            const currentDistance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

            // Advance t based on constant speed divided by distance
            if (currentDistance > 0) {
                this.t += (config.speed * 2.5) / currentDistance; // Optimized speed for rhythm
            } else {
                this.t = 1;
            }

            if (this.t >= 1) {
                this.t = 1;
                this.done = true;
            }

            // Interpolate position along the dynamic line
            this.x = startX + (endX - startX) * this.t;
            this.y = startY + (endY - startY) * this.t;
        }

        draw() {
            const size = 18;
            if (this.image && this.image.complete && this.image.naturalWidth > 0) {
                ctx.drawImage(this.image, this.x - size / 2, this.y - size / 2, size, size);
            }
        }
    }

    function spawnEmployee(forcedIndex) {
        if (employeeNodes.length >= MAX_EMPLOYEES && forcedIndex === undefined) return;

        const i = forcedIndex !== undefined ? forcedIndex : employeeNodes.length;

        // Prevent duplicate nodes by ID
        if (employeeNodes.some(n => n.id === i)) return;

        // Arc Logic: Calculate position on a semicircle below the hub
        const hubTargetY = Math.max(h * 0.35, 140);
        const radius = h * 0.38;
        const angleStep = Math.PI * 0.2; // Spacing between nodes
        const angle = (Math.PI / 2) + (i - 1.5) * angleStep;

        const x = w / 2 + Math.cos(angle) * radius;
        const y = hubTargetY + Math.sin(angle) * radius;

        const newNode = new Node(i, x, y, 'employee');
        employeeNodes.push(newNode);

        // Send packet from hub to the new node after a short appearance delay
        const t1 = setTimeout(() => {
            const hubRef = { get currentX() { return w / 2; }, get currentY() { return hubY; } };
            packets.push(new Packet(hubRef, newNode, imgMsg));
        }, 300);
        timeouts.push(t1);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = Date.now();
        let duration = PHASE_DURATION_SYNC;
        if (phase === 'distribute') duration = PHASE_DURATION_DIST;
        if (phase === 'security') duration = PHASE_DURATION_SECURE;
        if (phase === 'analytics') duration = PHASE_DURATION_ANALYTICS;
        if (phase === 'tags') duration = PHASE_DURATION_TAGS;

        if (now - lastPhaseSwitch > duration) {
            lastPhaseSwitch = now; // Move to start to prevent re-entry
            packets.length = 0;
            timeouts.forEach(clearTimeout); // Clear all pending spawns
            timeouts.length = 0;
            // State Machine
            if (phase === 'sync') {
                phase = 'distribute';
                employeeNodes.length = 0;
                // Stage 1: Inner Nodes (after hub stabilizes)
                const t1 = setTimeout(() => {
                    spawnEmployee(1);
                    spawnEmployee(2);
                }, 800);
                // Stage 2: Outer Nodes
                const t2 = setTimeout(() => {
                    spawnEmployee(0);
                    spawnEmployee(3);
                }, 1800);
                timeouts.push(t1, t2);
            } else if (phase === 'distribute') {
                phase = 'security';
                let permIndex = 0;
                const interval = setInterval(() => {
                    if (permIndex < employeeNodes.length) {
                        employeeNodes[permIndex].hasPermission = true;
                        permIndex++;
                    } else {
                        clearInterval(interval);
                    }
                }, 500);
            } else if (phase === 'security') {
                phase = 'analytics';
                initChartData();
            } else if (phase === 'analytics') {
                phase = 'tags';
            } else {
                phase = 'sync';
                employeeNodes.forEach(n => n.hasPermission = false);
            }
        }

        const centerX = w / 2;
        const safeHubTopY = 140;

        // --- PHASE LOGIC ---

        if (phase === 'analytics' || phase === 'tags') {

            // ANALYTICS TEXT header
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#101828';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const titleFontSize = w < 500 ? 16 : 24;
            ctx.font = `bold ${titleFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

            const headerTitle = phase === 'analytics' ? "THỐNG KÊ CHI TIẾT DỮ LIỆU" : "Phân loại khách hàng thông minh";
            ctx.fillText(headerTitle, centerX, 20);

            // --- Layout Constants ---
            const margin = 20;
            const containerW = w - margin * 2;
            const containerH = h - 60;
            const startY = 70;

            if (phase === 'analytics') {
                // Split View: Chart + Leaderboard

                if (chartProgress < 1) chartProgress += 0.005;

                // Live Update simulation
                if (Math.random() < 0.3) { // 30% chance per frame for lots of motion
                    const emp = employeeNames[Math.floor(Math.random() * employeeNames.length)];
                    const change = Math.floor(Math.random() * 30) - 15; // Fluctuate +/- 15
                    emp.closed += change;
                    if (emp.closed < 50) emp.closed = 50; // Keep in reasonable range

                    const sorted = [...employeeNames].sort((a, b) => b.closed - a.closed);
                    sorted.forEach((e, idx) => {
                        const originalObj = employeeNames.find(x => x.id === e.id);
                        if (originalObj) originalObj.targetY = idx * 50;
                    });
                }

                employeeNames.forEach(e => {
                    const dy = e.targetY - e.y;
                    e.y += dy * 0.1; // Faster animation (0.1) so swaps look snappy
                });

                const leftW = w < 600 ? containerW : containerW * 0.4;
                const rightW = w < 600 ? containerW : containerW * 0.55;
                const rightX = w < 600 ? margin : margin + leftW + (containerW * 0.05);
                const chartH = w < 600 ? containerH * 0.4 : containerH * 0.8;
                const leaderboardH = w < 600 ? containerH * 0.45 : containerH * 0.8;
                const leaderboardY = w < 600 ? startY + chartH + 20 : startY;

                // 1. Chart
                drawCard(margin, startY, leftW, chartH);
                ctx.textAlign = 'left';
                ctx.fillStyle = '#333';
                ctx.font = 'bold 14px Arial';
                ctx.fillText("Số lượng hội thoại", margin + 20, startY + 20);
                drawMiniChart(margin + 20, startY + 60, leftW - 40, chartH - 80);

                // 2. Leaderboard
                drawCard(rightX, leaderboardY, rightW, leaderboardH);
                ctx.textAlign = 'left';
                ctx.fillStyle = '#333';
                ctx.font = 'bold 14px Arial';
                ctx.fillText("Xếp hạng nhân viên", rightX + 20, leaderboardY + 20);

                ctx.font = '11px Arial';
                ctx.fillStyle = '#888';
                ctx.fillText("NHÂN VIÊN", rightX + 20, leaderboardY + 50);
                ctx.textAlign = 'right';
                ctx.fillText("ĐÃ ĐÓNG", rightX + rightW - 20, leaderboardY + 50);
                ctx.fillText("ĐANG CHỜ", rightX + rightW - 90, leaderboardY + 50);

                const listY = leaderboardY + 70;
                const listHeight = leaderboardH - 70;

                ctx.save();
                ctx.beginPath();
                ctx.rect(rightX, listY, rightW, listHeight);
                ctx.clip();

                employeeNames.forEach((emp) => {
                    const rowY = listY + emp.y;

                    const avatarY = rowY + 15;
                    // Check bounds roughly
                    if (rowY > listHeight + listY) return;

                    ctx.beginPath();
                    ctx.save();
                    ctx.arc(rightX + 35, avatarY, 15, 0, Math.PI * 2);
                    ctx.clip();
                    ctx.fillStyle = '#eee';
                    ctx.fill();

                    // Use specific avatar
                    const avatarImg = avatars[emp.id % avatars.length] || imgEmployee;
                    if (avatarImg.complete) ctx.drawImage(avatarImg, rightX + 20, rowY, 30, 30);
                    ctx.restore();

                    ctx.fillStyle = '#333';
                    ctx.textAlign = 'left';
                    ctx.font = 'bold 13px Arial';
                    ctx.fillText(emp.name, rightX + 60, rowY + 4); // Adjusted for better vertical centering

                    ctx.fillStyle = '#777';
                    ctx.font = '11px Arial';
                    ctx.fillText(emp.dept, rightX + 60, rowY + 18); // Adjusted to sit right below name

                    ctx.textAlign = 'right';
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 13px Arial';
                    ctx.fillText(emp.closed.toString(), rightX + rightW - 20, rowY + 11); // Centered stats

                    ctx.fillStyle = '#f59e0b';
                    ctx.fillText(emp.pending.toString(), rightX + rightW - 90, rowY + 11); // Centered stats

                    // Line
                    ctx.beginPath();
                    ctx.moveTo(rightX + 20, rowY + 50);
                    ctx.lineTo(rightX + rightW - 20, rowY + 50);
                    ctx.strokeStyle = '#f1f1f1';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                });
                ctx.restore();

            } else { // 'tags' Phase

                // --- LIVE TAG UPDATES ---
                if (now % 30 < 2) { // Every 30 frames (twice per second approx)
                    const tag = tagData[Math.floor(Math.random() * tagData.length)];
                    const change = Math.floor(Math.random() * 20) - 8; // Fluctuate +/-
                    tag.count += change;
                    if (tag.count < 10) tag.count = 10;

                    // Resort if needed
                    const sorted = [...tagData].sort((a, b) => b.count - a.count);
                    sorted.forEach((t, idx) => {
                        const obj = tagData.find(x => x.id === t.id);
                        if (obj) obj.targetY = idx * 50;
                    });

                    // Recalculate percentages?
                    const total = tagData.reduce((acc, curr) => acc + curr.count, 0);
                    tagData.forEach(t => {
                        t.pct = ((t.count / total) * 100).toFixed(2) + "%";
                    });
                }

                tagData.forEach(t => {
                    const dy = t.targetY - t.y;
                    t.y += dy * 0.1;
                });

                // Centered Tag Table
                const tableW = Math.min(600, containerW);
                const tableX = (w - tableW) / 2;

                drawCard(tableX, startY, tableW, containerH * 0.9);

                ctx.textAlign = 'left';
                ctx.fillStyle = '#333';
                ctx.font = 'bold 18px Arial';
                ctx.textBaseline = 'top';
                ctx.fillText("Xếp hạng trạng thái", tableX + 30, startY + 30);

                // Columns
                ctx.font = '13px Arial';
                ctx.fillStyle = '#888';
                ctx.fillText("TRẠNG THÁI", tableX + 30, startY + 70);
                ctx.textAlign = 'right';
                ctx.fillText("%", tableX + tableW - 20, startY + 70);
                ctx.fillText("SL", tableX + tableW - 80, startY + 70);

                // Draw Rows
                const rowStartH = startY + 100;

                ctx.save();
                ctx.beginPath();
                ctx.rect(tableX, rowStartH, tableW, containerH * 0.9 - 100);
                ctx.clip();

                tagData.forEach((tag, i) => {
                    const y = rowStartH + tag.y;

                    // Badge
                    ctx.font = 'bold 13px Arial';
                    const textW = ctx.measureText(tag.label).width;
                    const badgeW = textW + 20;
                    const badgeH = 26;

                    // Draw badge bg centered on line
                    const badgeY = y;

                    ctx.fillStyle = tag.color;
                    ctx.beginPath();
                    ctx.roundRect(tableX + 30, badgeY, badgeW, badgeH, 4);
                    ctx.fill();

                    // Tag Text (Centered in badge)
                    ctx.textAlign = 'left';
                    ctx.fillStyle = tag.text;
                    ctx.textBaseline = 'middle';
                    ctx.fillText(tag.label, tableX + 40, badgeY + badgeH / 2);

                    // Stats
                    ctx.textAlign = 'right';
                    ctx.fillStyle = '#333';
                    ctx.fillText(tag.pct, tableX + tableW - 20, badgeY + badgeH / 2);

                    ctx.fillText(tag.count.toString(), tableX + tableW - 80, badgeY + badgeH / 2);

                    // Reset baseline
                    ctx.textBaseline = 'top';
                });
                ctx.restore();
            }

        } else {
            // SYNC / DISTRIBUTE / SECURITY LOGIC

            if (phase === 'sync') {
                targetHubY = h / 2;
            } else {
                targetHubY = Math.max(h * 0.2, safeHubTopY);
                if (phase === 'distribute' && now % 1200 < 20) {
                    spawnEmployee();
                }
            }

            const dy = targetHubY - hubY;
            hubY += dy * 0.05;

            let activeNodes = phase === 'sync' ? zaloNodes : employeeNodes;

            activeNodes.forEach(node => {
                node.update();
                node.draw();
            });

            // Hub (Cloud Shape)
            ctx.fillStyle = '#fff';
            drawCloud(ctx, centerX, hubY, config.hubRadius);
            ctx.fill();

            ctx.lineWidth = 3;
            ctx.strokeStyle = phase === 'security' ? '#ffc107' : config.color.zework;

            const pulseScale = 1 + Math.sin(now / 300) * 0.05;
            ctx.save();
            ctx.translate(centerX, hubY);
            ctx.scale(pulseScale, pulseScale);
            // Draw stroke for cloud
            drawCloud(ctx, 0, 0, config.hubRadius);
            ctx.stroke();
            ctx.restore();

            if (imgZework.complete) {
                const logoSize = 60;
                ctx.drawImage(imgZework, centerX - logoSize / 2, hubY - logoSize / 2, logoSize, logoSize);
            }

            const phaseTitleFontSize = w < 500 ? 18 : 24;
            ctx.font = `bold ${phaseTitleFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = '#101828';
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.shadowBlur = 10;

            let title = '';
            if (phase === 'sync') title = 'ĐỒNG BỘ DỮ LIỆU TỪ ZALO';
            else if (phase === 'distribute') title = 'PHÂN CHIA CÔNG VIỆC';
            else title = 'BẢO MẬT & MÃ HOÁ DỮ LIỆU';

            ctx.fillText(title, centerX, 30);
            ctx.shadowBlur = 0;

            if (phase === 'distribute' || phase === 'security') {
                ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
                ctx.fillStyle = '#666';
                let sub = '';
                if (phase === 'distribute') sub = "Chi tiết tới từng nhân viên";
                if (phase === 'security') sub = "Mã hoá đầu cuối - Phân quyền chi tiết";
                ctx.fillText(sub, centerX, 60);
            }

            // Packets
            if (Math.random() < 0.02) {
                const node = activeNodes[Math.floor(Math.random() * activeNodes.length)];
                if (node && node.opacity === 1) {
                    const hubRef = { get currentX() { return w / 2; }, get currentY() { return hubY; } };
                    if (phase === 'sync') {
                        const pImg = Math.random() > 0.5 ? imgMsg : imgCall;
                        packets.push(new Packet(node, hubRef, pImg));
                    } else if (phase === 'distribute') {
                        packets.push(new Packet(hubRef, node, imgMsg));

                    } else if (phase === 'security') {
                        packets.push(new Packet(hubRef, node, imgLock));
                    }
                }
            }

            for (let i = packets.length - 1; i >= 0; i--) {
                packets[i].update();
                packets[i].draw();
                if (packets[i].done) packets.splice(i, 1);
            }
        } // End else

        requestAnimationFrame(animate);
    }

    // --- Helpers ---
    function drawCloud(ctx, x, y, r) {
        const s = r / 50; // Scale based on radius (assuming default r=50)
        ctx.beginPath();
        // Start bottom-left area
        ctx.moveTo(x - 30 * s, y + 20 * s);

        // Left puff
        ctx.bezierCurveTo(x - 65 * s, y + 20 * s, x - 65 * s, y - 20 * s, x - 35 * s, y - 25 * s);

        // Top-Left puff
        ctx.bezierCurveTo(x - 20 * s, y - 55 * s, x + 20 * s, y - 55 * s, x + 35 * s, y - 25 * s);

        // Right puff
        ctx.bezierCurveTo(x + 65 * s, y - 20 * s, x + 65 * s, y + 20 * s, x + 30 * s, y + 20 * s);

        // Bottom puffs (to close nicely)
        ctx.bezierCurveTo(x + 20 * s, y + 45 * s, x - 20 * s, y + 45 * s, x - 30 * s, y + 20 * s);

        ctx.closePath();
    }

    function drawCard(x, y, w, h) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowColor = "rgba(0,0,0,0.05)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 12);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function drawMiniChart(x, y, w, h) {
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.stroke();

        if (chartData.length > 1) {
            const stepX = w / (chartData.length - 1);
            const bottomY = y + h;
            const topY = y;
            const rangeY = bottomY - topY;

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#0068ff';
            ctx.beginPath();

            let maxIndex = Math.floor(chartData.length * chartProgress);

            for (let i = 0; i < chartData.length; i++) {
                if (i > maxIndex) break;
                const val = chartData[i];
                const px = x + i * stepX;
                const py = bottomY - (val / 100) * rangeY;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
    }


    let simStarted = false;
    const requiredImages = [imgZalo, imgEmployee, imgZework, imgMsg, imgCall, imgLock];

    const startSim = () => {
        if (simStarted) return;
        simStarted = true;
        initZaloNodes();
        animate();
    };

    let imagesLoaded = 0;
    const checkImages = () => {
        imagesLoaded++;
        if (imagesLoaded >= requiredImages.length) {
            startSim();
        }
    };

    requiredImages.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.onload = checkImages;
        }
    });

    if (imagesLoaded >= requiredImages.length) {
        startSim();
    }

    // Secondary fallback
    setTimeout(startSim, 1500);
});
