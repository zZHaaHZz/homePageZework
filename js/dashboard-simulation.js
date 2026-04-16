(function () {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let isAnimating = false;
    let imagesLoadedFlag = false;
    let simInitialized = false;
    let imgZalo, imgEmployee, imgZework, imgMsg, imgCall, imgLock;
    const avatars = [];
    function loadImages() {
        if (imagesLoadedFlag) return;
        imgZalo = new Image(); imgZalo.src = './img/Icon_of_Zalo.svg';
        imgEmployee = new Image(); imgEmployee.src = './img/icon-employee.svg';
        imgZework = new Image(); imgZework.src = './img/logoZework.svg';
        for (let i = 1; i <= 4; i++) {
            const img = new Image();
            img.src = `./img/avatarFeedback/avatar_${i}.webp`;
            avatars.push(img);
        }
        imgMsg = new Image(); imgMsg.src = './img/icon-message.svg';
        imgCall = new Image(); imgCall.src = './img/icon-call.svg';
        imgLock = new Image(); imgLock.src = './img/icon-lock.svg';
        imagesLoadedFlag = true;
    }
    let w = 0, h = 0;
    function resizeCanvas() {
        const parent = canvas.parentElement;
        if (!parent) return { width: 0, height: 0 };
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
    window.addEventListener('resize', () => {
        ({ width: w, height: h } = resizeCanvas());
        if (simInitialized) initZaloNodes();
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
        speed: 0.5
    };
    let phase = 'sync';
    let lastPhaseSwitch = Date.now();
    const PHASE_DURATION_SYNC = 5500;
    const PHASE_DURATION_DIST = 4500;
    const PHASE_DURATION_SECURE = 4500;
    const PHASE_DURATION_ANALYTICS = 5500;
    const PHASE_DURATION_TAGS = 5000;
    let hubY = h * 0.62;
    let targetHubY = h * 0.62;
    const zaloNodes = [];
    const employeeNodes = [];
    const packets = [];
    const timeouts = [];
    const MAX_EMPLOYEES = 4;
    let chartData = [];
    let chartProgress = 0;
    const DATA_UPDATE_INTERVAL = 1500;
    let lastDataUpdate = 0;
    const employeeNames = [
        { id: 1, name: "Trần Minh Hằng", dept: "Chăm sóc khách hàng", pending: 2, closed: 120, y: 0, targetY: 0 },
        { id: 2, name: "Đặng Minh Tú", dept: "Dịch vụ khách hàng", pending: 3, closed: 118, y: 0, targetY: 0 },
        { id: 3, name: "Nguyễn Trọng Nhân", dept: "Customer Service", pending: 1, closed: 116, y: 0, targetY: 0 },
        { id: 4, name: "Lữ Mạnh Nha", dept: "Sales", pending: 4, closed: 114, y: 0, targetY: 0 },
        { id: 5, name: "Phạm Văn A", dept: "Sales", pending: 5, closed: 112, y: 0, targetY: 0 }
    ];
    const tagData = [
        { id: 1, label: "Đã xử lý", count: 78, color: "#e6f4ea", text: "#1e8e3e", y: 0, targetY: 0 },
        { id: 2, label: "Đang xử lý", count: 76, color: "#e8f0fe", text: "#1967d2", y: 0, targetY: 0 },
        { id: 3, label: "Chưa xử lý", count: 74, color: "#f1f3f4", text: "#5f6368", y: 0, targetY: 0 },
        { id: 4, label: "Đã huỷ", count: 72, color: "#fce8e6", text: "#c5221f", y: 0, targetY: 0 },
        { id: 5, label: "Chốt đơn", count: 20, color: "#1e8e3e", text: "#ffffff", y: 0, targetY: 0 },
        { id: 6, label: "Chờ chuyển tiền", count: 18, color: "#9334e6", text: "#ffffff", y: 0, targetY: 0 }
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
            const radius = this.type === 'zalo' ? 30 : 28;
            ctx.beginPath();
            ctx.arc(this.currentX, this.currentY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = (phase === 'security' && this.hasPermission) ? '#ffc107' : (this.type === 'zalo' ? config.color.zalo : config.color.employee);
            if (this.type === 'zalo' && phase === 'sync') {
                ctx.shadowColor = config.color.zalo;
                ctx.shadowBlur = 15;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
            const img = this.type === 'zalo' ? imgZalo : (avatars[this.id % avatars.length] || imgEmployee);
            if (img && img.complete && img.naturalWidth > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.currentX, this.currentY, radius - 4, 0, Math.PI * 2);
                ctx.clip();
                const imgSize = this.type === 'zalo' ? 44 : 40;
                ctx.drawImage(img, this.currentX - imgSize / 2, this.currentY - imgSize / 2, imgSize, imgSize);
                ctx.restore();
                if (phase === 'security' && this.hasPermission && imgLock.complete) {
                    ctx.drawImage(imgLock, this.currentX + 10, this.currentY - 24, 16, 16);
                }
            }
            ctx.globalAlpha = 1.0;
        }
    }
    function initZaloNodes() {
        zaloNodes.length = 0;
        const centerX = w / 2;
        const centerY = h * 0.62;
        const radiusX = w * 0.25;
        const radiusY = h * 0.10;
        const startTo = Math.PI * 1.2;
        const endTo = Math.PI * 1.8;
        const step = config.zaloCount > 1 ? (endTo - startTo) / (config.zaloCount - 1) : 0;
        for (let i = 0; i < config.zaloCount; i++) {
            let angle = config.zaloCount > 1 ? (startTo + i * step) : Math.PI * 1.5;
            const x = centerX + Math.cos(angle) * radiusX;
            let y = centerY + Math.sin(angle) * radiusY;
            if (config.zaloCount % 2 === 1 && i === Math.floor(config.zaloCount / 2)) {
                y -= Math.min(h * 0.32, 160);
            }
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
        employeeNames.sort((a, b) => b.closed - a.closed);
        employeeNames.forEach((e, idx) => { e.y = idx * 50; e.targetY = idx * 50; });
        tagData.sort((a, b) => b.count - a.count);
        tagData.forEach((t, idx) => { t.y = idx * 40; t.targetY = idx * 40; });
        const initTotal = tagData.reduce((a, c) => a + c.count, 0);
        tagData.forEach(t => t.pct = ((t.count / initTotal) * 100).toFixed(2) + "%");
    }
    class Packet {
        constructor(source, target, image) {
            this.source = source;
            this.target = target;
            this.image = image;
            this.t = 0;
            this.done = false;
        }
        update() {
            const startX = this.source.currentX !== undefined ? this.source.currentX : (w / 2);
            const startY = this.source.currentY !== undefined ? this.source.currentY : (hubY);
            const endX = this.target.currentX !== undefined ? this.target.currentX : (w / 2);
            const endY = this.target.currentY !== undefined ? this.target.currentY : (hubY);
            const dist = Math.hypot(endX - startX, endY - startY);
            if (dist > 0) this.t += (config.speed * 2.5) / dist; else this.t = 1;
            if (this.t >= 1) { this.t = 1; this.done = true; }
            this.x = startX + (endX - startX) * this.t;
            this.y = startY + (endY - startY) * this.t;
        }
        draw() {
            if (this.image && this.image.complete) {
                ctx.drawImage(this.image, this.x - 9, this.y - 9, 18, 18);
            }
        }
    }
    function spawnEmployee(forcedIndex) {
        if (employeeNodes.length >= MAX_EMPLOYEES && forcedIndex === undefined) return;
        const i = forcedIndex !== undefined ? forcedIndex : employeeNodes.length;
        if (employeeNodes.some(n => n.id === i)) return;
        const hubTargetY = Math.max(h * 0.35, 140);
        const radius = h * 0.38;
        const angle = (Math.PI / 2) + (i - 1.5) * Math.PI * 0.2;
        const newNode = new Node(i, w / 2 + Math.cos(angle) * radius, hubTargetY + Math.sin(angle) * radius, 'employee');
        employeeNodes.push(newNode);
        setTimeout(() => {
            packets.push(new Packet({ currentX: w / 2, currentY: hubY }, newNode, imgMsg));
        }, 300);
    }
    const PHASE_DURATIONS = {
        sync: PHASE_DURATION_SYNC,
        distribute: PHASE_DURATION_DIST,
        security: PHASE_DURATION_SECURE,
        analytics: PHASE_DURATION_ANALYTICS,
        tags: PHASE_DURATION_TAGS,
    };
    const PHASE_TRANSITIONS = {
        sync() {
            phase = 'distribute';
            employeeNodes.length = 0;
            setTimeout(() => { spawnEmployee(1); spawnEmployee(2); }, 800);
            setTimeout(() => { spawnEmployee(0); spawnEmployee(3); }, 1800);
        },
        distribute() {
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
        },
        security() {
            const demoIframe = document.getElementById('messagingDemoVideo');
            if (demoIframe && !demoIframe.src && demoIframe.dataset.src) {
                demoIframe.src = demoIframe.dataset.src;
                if (typeof VideoLoader !== 'undefined' && VideoLoader.loadDeferredVideo) {
                    VideoLoader.loadDeferredVideo();
                }
            }
            phase = 'analytics';
            initChartData();
        },
        analytics() { phase = 'tags'; },
        tags() {
            if (typeof window.switchSliderToVideo === 'function') {
                window.switchSliderToVideo();
            } else {
                resetToSyncCycle();
            }
        },
    };
    function resetToSyncCycle() {
        phase = 'sync';
        lastPhaseSwitch = Date.now();
        employeeNodes.length = 0;
        packets.length = 0;
        hubY = h * 0.62;
        targetHubY = h * 0.62;
        initZaloNodes();
    }
    const PHASE_TITLES = {
        sync: 'ĐỒNG BỘ DỮ LIỆU TỪ ZALO',
        distribute: 'PHÂN CHIA CÔNG VIỆC',
        security: 'BẢO MẬT & MÃ HOÁ DỮ LIỆU',
        analytics: 'THỐNG KÊ CHI TIẾT DỮ LIỆU',
        tags: 'Phân loại khách hàng thông minh',
    };
    function renderPhase_analytics(margin, containerW, containerH, startY) {
        if (chartProgress < 1) chartProgress += 0.005;
        const now_t = Date.now();
        if (now_t - lastDataUpdate > DATA_UPDATE_INTERVAL) {
            lastDataUpdate = now_t;
            const emp = employeeNames[Math.floor(Math.random() * employeeNames.length)];
            emp.closed = Math.max(50, emp.closed + Math.floor(Math.random() * 30) - 15);
            [...employeeNames]
                .sort((a, b) => b.closed - a.closed)
                .forEach((e, idx) => {
                    const obj = employeeNames.find(x => x.id === e.id);
                    if (obj) obj.targetY = idx * 50;
                });
        }
        employeeNames.forEach(e => e.y += (e.targetY - e.y) * 0.1);
        const isNarrow = w < 600;
        const leftW = isNarrow ? containerW : containerW * 0.4;
        const rightW = isNarrow ? containerW : containerW * 0.55;
        const rightX = isNarrow ? margin : margin + leftW + containerW * 0.05;
        const chartH = isNarrow ? containerH * 0.4 : containerH * 0.8;
        const leaderboardY = isNarrow ? startY + chartH + 20 : startY;
        drawCard(margin, startY, leftW, chartH);
        ctx.textAlign = 'left'; ctx.fillStyle = '#333'; ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, Inter, sans-serif';
        ctx.fillText("Số lượng hội thoại", margin + 20, startY + 20);
        drawMiniChart(margin + 20, startY + 60, leftW - 40, chartH - 80);
        drawCard(rightX, leaderboardY, rightW, chartH);
        
        ctx.fillStyle = '#333'; 
        ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText("Xếp hạng nhân viên", rightX + 20, leaderboardY + 16);
        
        ctx.font = '11px Arial'; ctx.fillStyle = '#888';
        ctx.textAlign = 'left'; ctx.fillText("NHÂN VIÊN", rightX + 20, leaderboardY + 38);
        ctx.textAlign = 'right'; ctx.fillText("ĐÃ ĐÓNG", rightX + rightW - 20, leaderboardY + 38);
        ctx.fillText("ĐANG CHỜ", rightX + rightW - 90, leaderboardY + 38);
        
        const listY = leaderboardY + 54;
        const listHeight = chartH - 54;
        ctx.save();
        ctx.beginPath();
        ctx.rect(rightX, listY, rightW, listHeight);
        ctx.clip();
        employeeNames.forEach(emp => {
            const rowY = listY + emp.y;
            if (rowY > listY + listHeight) return;
            ctx.save();
            ctx.beginPath();
            ctx.arc(rightX + 35, rowY + 15, 15, 0, Math.PI * 2);
            ctx.clip();
            ctx.fillStyle = '#eee'; ctx.fill();
            const avatarImg = avatars[emp.id % avatars.length] || imgEmployee;
            if (avatarImg && avatarImg.complete) ctx.drawImage(avatarImg, rightX + 20, rowY, 30, 30);
            ctx.restore();
            ctx.fillStyle = '#333'; ctx.textAlign = 'left'; ctx.font = 'bold 13px Arial';
            ctx.fillText(emp.name, rightX + 60, rowY + 4);
            ctx.fillStyle = '#777'; ctx.font = '11px Arial';
            ctx.fillText(emp.dept, rightX + 60, rowY + 18);
            ctx.textAlign = 'right'; ctx.fillStyle = '#333'; ctx.font = 'bold 13px Arial';
            ctx.fillText(emp.closed.toString(), rightX + rightW - 20, rowY + 11);
            ctx.fillStyle = '#f59e0b';
            ctx.fillText(emp.pending.toString(), rightX + rightW - 90, rowY + 11);
            ctx.beginPath();
            ctx.moveTo(rightX + 20, rowY + 46);
            ctx.lineTo(rightX + rightW - 20, rowY + 46);
            ctx.strokeStyle = '#f1f1f1'; ctx.lineWidth = 1; ctx.stroke();
        });
        ctx.restore();
        ctx.textAlign = 'left';
    }
    function renderPhase_tags(now, margin, containerW, containerH, startY) {
        if (now % 30 < 2) {
            const tag = tagData[Math.floor(Math.random() * tagData.length)];
            tag.count = Math.max(10, tag.count + Math.floor(Math.random() * 20) - 8);
            [...tagData]
                .sort((a, b) => b.count - a.count)
                .forEach((t, idx) => {
                    const obj = tagData.find(x => x.id === t.id);
                    if (obj) obj.targetY = idx * 40;
                });
            const total = tagData.reduce((a, c) => a + c.count, 0);
            tagData.forEach(t => t.pct = ((t.count / total) * 100).toFixed(2) + "%");
        }
        tagData.forEach(t => t.y += (t.targetY - t.y) * 0.1);
        const tableW = Math.min(600, containerW);
        const tableX = (w - tableW) / 2;
        const cardH = containerH * 0.9;
        
        drawCard(tableX, startY, tableW, cardH);
        ctx.textAlign = 'left'; ctx.fillStyle = '#333'; ctx.font = 'bold 18px Arial';
        ctx.fillText("Xếp hạng trạng thái", tableX + 30, startY + 20);
        
        const listY = startY + 45;
        const listHeight = cardH - 45;
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(tableX, listY, tableW, listHeight);
        ctx.clip();
        
        tagData.forEach(tag => {
            const y = startY + 45 + tag.y;
            // Dọn bớt việc vẽ nếu nó nằm hoàn toàn ngoài tầm nhìn (Tối ưu nhẹ)
            if (y > listY + listHeight) return; 
            
            ctx.fillStyle = tag.color;
            ctx.beginPath();
            ctx.roundRect(tableX + 30, y, ctx.measureText(tag.label).width + 20, 28, 4);
            ctx.fill();
            ctx.textBaseline = 'middle';
            ctx.fillStyle = tag.text; ctx.font = 'bold 13px Arial';
            ctx.fillText(tag.label, tableX + 40, y + 14);
            ctx.textAlign = 'right'; ctx.fillStyle = '#333';
            ctx.fillText(tag.pct, tableX + tableW - 20, y + 14);
            ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        });
        
        ctx.restore();
    }
    function renderPhase_network(now, centerX) {
        const isSync = phase === 'sync';
        targetHubY = isSync ? h * 0.62 : Math.max(h * 0.2, 140);
        hubY += (targetHubY - hubY) * 0.05;
        const nodes = isSync ? zaloNodes : employeeNodes;
        nodes.forEach(n => { n.update(); n.draw(); });
        ctx.fillStyle = '#fff';
        drawCloud(ctx, centerX, hubY, config.hubRadius);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = phase === 'security' ? '#ffc107' : config.color.zework;
        ctx.save();
        const pulse = phase === 'sync' ? 1 : 1 + Math.sin(now / 300) * 0.05;
        ctx.translate(centerX, hubY);
        ctx.scale(pulse, pulse);
        drawCloud(ctx, 0, 0, config.hubRadius);
        ctx.stroke();
        ctx.restore();
        if (imgZework && imgZework.complete)
            ctx.drawImage(imgZework, centerX - 30, hubY - 30, 60, 60);
        ctx.font = `bold ${w < 500 ? 18 : 24}px -apple-system, BlinkMacSystemFont, Inter, sans-serif`;
        ctx.textAlign = 'center'; ctx.fillStyle = '#101828';
        ctx.fillText(PHASE_TITLES[phase], centerX, 30);
        const MAX_PACKETS = 3;
        const nodesSettled = (Date.now() - lastPhaseSwitch) > 1500;
        const packetChance = isSync ? 0.02 : 0.01;
        if (nodesSettled && packets.length < MAX_PACKETS && Math.random() < packetChance) {
            const node = nodes[Math.floor(Math.random() * nodes.length)];
            if (node && node.opacity === 1) {
                const hubRef = { currentX: w / 2, currentY: hubY };
                const [src, dst] = isSync ? [node, hubRef] : [hubRef, node];
                const icon = phase === 'security'
                    ? imgLock
                    : (isSync ? (Math.random() > 0.45 ? imgMsg : imgCall) : (Math.random() > 0.5 ? imgMsg : imgCall));
                packets.push(new Packet(src, dst, icon));
            }
        }
        for (let i = packets.length - 1; i >= 0; i--) {
            packets[i].update(); packets[i].draw();
            if (packets[i].done) packets.splice(i, 1);
        }
    }
    function animate() {
        if (!isAnimating) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();
        const duration = PHASE_DURATIONS[phase];
        if (now - lastPhaseSwitch > duration) {
            lastPhaseSwitch = now;
            packets.length = 0;
            PHASE_TRANSITIONS[phase]();
        }
        const centerX = w / 2;
        if (phase === 'analytics' || phase === 'tags') {
            ctx.fillStyle = '#101828'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.font = `bold ${w < 500 ? 16 : 24}px -apple-system, BlinkMacSystemFont, Inter, sans-serif`;
            ctx.fillText(PHASE_TITLES[phase], centerX, 20);
            const margin = 20;
            const containerW = w - margin * 2;
            const containerH = h - 60;
            const startY = 70;
            if (phase === 'analytics') {
                renderPhase_analytics(margin, containerW, containerH, startY);
            } else {
                renderPhase_tags(now, margin, containerW, containerH, startY);
            }
        } else {
            renderPhase_network(now, centerX);
        }
        requestAnimationFrame(animate);
    }
    function drawCloud(ctx, x, y, r) {
        const s = r / 50; ctx.beginPath(); ctx.moveTo(x - 30 * s, y + 20 * s);
        ctx.bezierCurveTo(x - 65 * s, y + 20 * s, x - 65 * s, y - 20 * s, x - 35 * s, y - 25 * s);
        ctx.bezierCurveTo(x - 20 * s, y - 55 * s, x + 20 * s, y - 55 * s, x + 35 * s, y - 25 * s);
        ctx.bezierCurveTo(x + 65 * s, y - 20 * s, x + 65 * s, y + 20 * s, x + 30 * s, y + 20 * s);
        ctx.bezierCurveTo(x + 20 * s, y + 45 * s, x - 20 * s, y + 45 * s, x - 30 * s, y + 20 * s);
        ctx.closePath();
    }
    function drawCard(x, y, w, h) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'; ctx.shadowColor = "rgba(0,0,0,0.05)"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.shadowBlur = 0;
    }
    function drawMiniChart(x, y, w, h) {
        ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + w, y + h); ctx.stroke();
        if (chartData.length > 1) {
            const stepX = w / (chartData.length - 1); ctx.lineWidth = 2; ctx.strokeStyle = '#0068ff'; ctx.beginPath();
            let maxIndex = Math.floor(chartData.length * chartProgress);
            for (let i = 0; i < chartData.length; i++) {
                if (i > maxIndex) break;
                const px = x + i * stepX; const py = (y + h) - (chartData[i] / 100) * h;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
    }
    let simStarted = false;
    const startSim = () => {
        if (simStarted) return;
        simStarted = true;
        loadImages();
        ({ width: w, height: h } = resizeCanvas());
        initZaloNodes();
        isAnimating = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        zaloNodes.forEach(n => n.draw());
        ctx.fillStyle = '#fff';
        drawCloud(ctx, w / 2, h / 2, config.hubRadius);
        ctx.fill();
        setTimeout(() => {
            initChartData();
            setTimeout(() => {
                isAnimating = true;
                animate();
            }, 50);
        }, 50);
    };
    window.startDashboardSimulation = startSim;
    window.stopDashboardSimulation = () => { isAnimating = false; };
    window.pauseDashboardSimulationForVideo = () => { isAnimating = false; };
    window.resumeDashboardSimulation = () => {
        resetToSyncCycle();
        isAnimating = true;
        animate();
    };
    const initOnLoad = () => {
        ({ width: w, height: h } = resizeCanvas());
        if (w === 0 || h === 0) return;
        hubY = h * 0.62;
        targetHubY = h * 0.62;
        initZaloNodes();
        const cx = w / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `bold ${w < 500 ? 18 : 24}px -apple-system, BlinkMacSystemFont, Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#101828';
        ctx.fillText(PHASE_TITLES.sync, cx, 20);
        zaloNodes.forEach(n => {
            ctx.beginPath();
            ctx.moveTo(n.currentX, n.currentY);
            ctx.lineTo(cx, hubY);
            ctx.strokeStyle = config.color.line;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(n.currentX, n.currentY, 30, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = config.color.zalo;
            ctx.shadowColor = config.color.zalo;
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.shadowBlur = 0;
        });
        ctx.fillStyle = '#fff';
        drawCloud(ctx, cx, hubY, config.hubRadius);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = config.color.zework;
        drawCloud(ctx, cx, hubY, config.hubRadius);
        ctx.stroke();
        simInitialized = true;
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnLoad, { once: true });
    } else {
        initOnLoad();
    }
})();
