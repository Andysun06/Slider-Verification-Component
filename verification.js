class SliderVerification {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // 默认配置
        this.options = {
            width: 350,
            height: 200,
            pieceSize: { min: 50, max: 70 },
            attempts: 2,
            tolerance: 10,
            ...options
        };

        this.init();
    }

    init() {
        // 创建模态框结构
        this.createModalStructure();

        // 获取DOM元素
        this.canvas = this.container.querySelector('#puzzle-bg');
        this.ctx = this.canvas.getContext('2d');
        this.puzzlePiece = this.container.querySelector('#puzzle-piece');
        this.puzzleTarget = this.container.querySelector('#puzzle-target');
        this.message = this.container.querySelector('#verification-message');
        this.refreshBtn = this.container.querySelector('#refresh-btn');
        this.puzzleContainer = this.container.querySelector('.puzzle-container');

        // 初始化状态
        this.targetX = 0;
        this.targetY = 0;
        this.pieceWidth = 0;
        this.pieceHeight = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.startLeft = 0;
        this.startTop = 0;
        this.attempts = 0;

        // 绑定事件
        this.bindEvents();

        // 初始化验证
        this.initVerification();
    }

    createModalStructure() {
        this.container.innerHTML = `
            <div class="verification-modal">
                <div class="modal-header">
                    安全验证
                </div>
                <div class="modal-body">
                    <p class="verification-instruction">请拖动正确拼图到目标位置</p>
                    
                    <div class="verification-canvas">
                        <div class="puzzle-container">
                            <canvas class="puzzle-bg" id="puzzle-bg"></canvas>
                            <div class="puzzle-target" id="puzzle-target"></div>
                            <div class="puzzle-piece" id="puzzle-piece"></div>
                        </div>
                    </div>
                    
                    <div class="verification-message" id="verification-message"></div>
                    
                    <button class="refresh-btn" id="refresh-btn">
                        ↻ 换一个验证
                    </button>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.refreshBtn.addEventListener('click', () => this.initVerification());
        this.puzzlePiece.addEventListener('mousedown', (e) => this.startDrag(e));
        this.puzzlePiece.addEventListener('touchstart', (e) => this.startDrag(e));
    }

    initVerification() {
        // 重置状态
        this.isDragging = false;
        this.attempts = 0;
        this.message.textContent = '';
        this.message.className = 'verification-message';

        // 清除之前的干扰元素
        document.querySelectorAll('.fake-target').forEach(el => el.remove());

        // 设置canvas尺寸
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;

        // 生成背景
        this.drawBackground();

        // 随机拼图大小
        this.pieceWidth = this.options.pieceSize.min +
            Math.floor(Math.random() * (this.options.pieceSize.max - this.options.pieceSize.min));
        this.pieceHeight = this.options.pieceSize.min +
            Math.floor(Math.random() * (this.options.pieceSize.max - this.options.pieceSize.min));

        // 设置拼图样式
        this.puzzlePiece.style.width = this.pieceWidth + 'px';
        this.puzzlePiece.style.height = this.pieceHeight + 'px';

        // 随机目标位置(30%-70%)
        this.targetX = Math.floor((this.canvas.width - this.pieceWidth) * (0.3 + Math.random() * 0.4));
        this.targetY = Math.floor((this.canvas.height - this.pieceHeight) * (0.3 + Math.random() * 0.4));

        // 设置目标位置
        this.puzzleTarget.style.width = this.pieceWidth + 'px';
        this.puzzleTarget.style.height = this.pieceHeight + 'px';
        this.puzzleTarget.style.left = this.targetX + 'px';
        this.puzzleTarget.style.top = this.targetY + 'px';

        // 设置拼图初始位置(随机位置)
        const initX = Math.floor(Math.random() * (this.canvas.width - this.pieceWidth - 20)) + 10;
        const initY = Math.floor(Math.random() * (this.canvas.height - this.pieceHeight - 20)) + 10;
        this.puzzlePiece.style.left = initX + 'px';
        this.puzzlePiece.style.top = initY + 'px';

        // 添加干扰验证框
        this.addFakeTargets();

        // 绘制目标缺口
        this.drawTargetGap();
    }

    drawBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格背景
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格线
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 1;

        // 水平线
        for (let y = 0; y < this.canvas.height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // 垂直线
        for (let x = 0; x < this.canvas.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }

    addFakeTargets() {
        const fakeCount = 6 + Math.floor(Math.random() * 3);

        for (let i = 0; i < fakeCount; i++) {
            const fake = document.createElement('div');
            fake.className = 'fake-target';

            // 随机大小(30-80px)，但不同于真实尺寸
            let width, height;
            do {
                width = 30 + Math.floor(Math.random() * 50);
                height = 30 + Math.floor(Math.random() * 50);
            } while (
                Math.abs(width - this.pieceWidth) < 10 &&
                Math.abs(height - this.pieceHeight) < 10
            );

            // 随机位置(避开真实目标)
            let x, y;
            do {
                x = Math.floor(Math.random() * (this.canvas.width - width));
                y = Math.floor(Math.random() * (this.canvas.height - height));
            } while (
                Math.abs(x - this.targetX) < 50 &&
                Math.abs(y - this.targetY) < 50
            );

            fake.style.width = width + 'px';
            fake.style.height = height + 'px';
            fake.style.left = x + 'px';
            fake.style.top = y + 'px';

            this.puzzleContainer.appendChild(fake);
        }
    }

    drawTargetGap() {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.targetX, this.targetY, this.pieceWidth, this.pieceHeight);
        this.ctx.strokeStyle = '#4285f4';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.targetX, this.targetY, this.pieceWidth, this.pieceHeight);
        this.ctx.restore();
    }

    startDrag(e) {
        if (this.attempts >= this.options.attempts) {
            this.message.textContent = '尝试次数过多，请刷新验证';
            return;
        }

        e.preventDefault();
        this.isDragging = true;

        // 记录初始位置
        this.startX = e.clientX || e.touches[0].clientX;
        this.startY = e.clientY || e.touches[0].clientY;
        this.startLeft = parseInt(this.puzzlePiece.style.left);
        this.startTop = parseInt(this.puzzlePiece.style.top);

        // 添加事件监听
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));
        document.addEventListener('touchmove', this.drag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        // 计算移动距离
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        const deltaX = x - this.startX;
        const deltaY = y - this.startY;

        // 计算新位置
        const newLeft = Math.max(0, Math.min(
            this.startLeft + deltaX,
            this.canvas.width - this.pieceWidth
        ));
        const newTop = Math.max(0, Math.min(
            this.startTop + deltaY,
            this.canvas.height - this.pieceHeight
        ));

        // 更新位置
        this.puzzlePiece.style.left = newLeft + 'px';
        this.puzzlePiece.style.top = newTop + 'px';
    }

    endDrag() {
        if (!this.isDragging) return;
        this.isDragging = false;

        // 移除事件监听
        document.removeEventListener('mousemove', this.drag.bind(this));
        document.removeEventListener('mouseup', this.endDrag.bind(this));
        document.removeEventListener('touchmove', this.drag.bind(this));
        document.removeEventListener('touchend', this.endDrag.bind(this));

        // 检查验证结果
        this.checkVerification();
    }

    checkVerification() {
        const pieceLeft = parseInt(this.puzzlePiece.style.left);
        const pieceTop = parseInt(this.puzzlePiece.style.top);

        // 计算距离差
        const deltaX = Math.abs(pieceLeft - this.targetX);
        const deltaY = Math.abs(pieceTop - this.targetY);

        // 容错范围
        if (deltaX < this.options.tolerance && deltaY < this.options.tolerance) {
            // 验证成功
            this.verificationSuccess();
        } else {
            // 验证失败
            this.attempts++;
            this.verificationFailed();
        }
    }

    verificationSuccess() {
        this.message.textContent = '验证成功！';
        this.message.className = 'verification-message verification-success';
        this.puzzlePiece.style.borderColor = '#34a853';
        this.puzzlePiece.style.backgroundColor = 'rgba(52, 168, 83, 0.2)';

        // 触发成功回调
        if (this.options.onSuccess) {
            this.options.onSuccess();
        }

        setTimeout(() => this.initVerification(), 1500);
    }

    verificationFailed() {
        if (this.attempts >= this.options.attempts) {
            this.message.textContent = '尝试次数过多，请刷新验证';
        } else {
            this.message.textContent = `验证失败，还有${this.options.attempts - this.attempts}次尝试机会`;
        }

        // 触发失败回调
        if (this.options.onFail) {
            this.options.onFail(this.attempts);
        }
    }

    // 公共方法：重置验证
    reset() {
        this.initVerification();
    }

    // 公共方法：销毁实例
    destroy() {
        // 移除事件监听
        document.removeEventListener('mousemove', this.drag.bind(this));
        document.removeEventListener('mouseup', this.endDrag.bind(this));
        document.removeEventListener('touchmove', this.drag.bind(this));
        document.removeEventListener('touchend', this.endDrag.bind(this));

        // 清空容器
        this.container.innerHTML = '';
    }
}