滑块验证组件 (Slider Verification Component)

一个轻量级、可定制的人机验证组件，提供直观的滑块拼图验证体验。

功能特性

• 🎯 直观验证 - 通过拖动拼图到目标位置的直观验证方式

• 🎨 高度可定制 - 支持自定义颜色、尺寸、难度等参数

• 📱 响应式设计 - 完美适配桌面端和移动端

• 🔒 安全防护 - 内置防刷机制和尝试次数限制

• ⚡ 轻量高效 - 纯前端实现，无依赖，加载快速

• ♿ 无障碍支持 - 良好的键盘导航和屏幕阅读器支持

快速开始

安装使用

1. 下载项目文件：
git clone https://github.com/your-username/slider-verification.git


2. 引入必要的文件：
<!-- 引入样式 -->
<link rel="stylesheet" href="css/verification.css">

<!-- 引入脚本 -->
<script src="js/verification.js"></script>


3. 创建HTML容器：
<div id="verification-container"></div>


4. 初始化验证组件：
// 基本用法
const verification = new SliderVerification('verification-container');

// 带配置的用法
const verification = new SliderVerification('verification-container', {
    width: 350,
    height: 200,
    attempts: 3,
    onSuccess: function() {
        console.log('验证成功！');
        // 执行后续操作
    }
});


配置选项

参数 类型 默认值 描述

width number 350 验证框宽度(px)

height number 200 验证框高度(px)

pieceSize object {min:40, max:70} 拼图尺寸范围

attempts number 3 最大尝试次数

tolerance number 10 容错像素范围

onSuccess function null 验证成功回调

onFail function null 验证失败回调

示例代码

// 完整配置示例
const verification = new SliderVerification('verification-container', {
    width: 400,
    height: 250,
    pieceSize: { min: 50, max: 80 },
    attempts: 5,
    tolerance: 15,
    onSuccess: function() {
        // 验证成功后的业务逻辑
        alert('验证成功！');
        submitForm();
    },
    onFail: function(attempts) {
        // 验证失败处理
        console.log(`剩余尝试次数: ${5 - attempts}`);
    }
});

// 重置验证
document.getElementById('reset-btn').addEventListener('click', function() {
    verification.reset();
});


API 方法

reset()

重置验证状态，生成新的验证挑战。
verification.reset();


destroy()

销毁验证实例，清理事件监听器。
verification.destroy();


自定义样式

组件支持通过CSS变量进行主题定制：
:root {
    --primary-color: #4285f4;      /* 主色调 */
    --success-color: #34a853;     /* 成功颜色 */
    --error-color: #f44336;       /* 错误颜色 */
    --bg-color: #f5f5f5;          /* 背景色 */
    --border-radius: 8px;         /* 圆角大小 */
}


浏览器兼容性

浏览器 最低版本

Chrome 60+

Firefox 55+

Safari 12+

Edge 79+

iOS Safari 12+

Android Browser 81+

项目结构


slider-verification/
├── css/
│   └── verification.css     # 样式文件
├── js/
│   └── verification.js      # 核心脚本
├── examples/                # 示例目录
│   ├── basic.html          # 基础用法示例
│   ├── custom.html         # 自定义配置示例
│   └── advanced.html       # 高级用法示例
├── docs/                   # 文档目录
│   └── api.md             # API文档
└── README.md              # 项目说明


开发指南

本地开发

1. 克隆仓库：
git clone https://github.com/your-username/slider-verification.git
cd slider-verification


2. 启动本地服务器：
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx http-server


3. 打开浏览器访问 http://localhost:8000/examples/

构建自定义版本

如需修改源码，请编辑 js/verification.js 文件，然后运行：
# 压缩代码（需要安装uglify-js）
uglifyjs js/verification.js -o js/verification.min.js


贡献指南

我们欢迎各种形式的贡献！请阅读 CONTRIBUTING.md 了解如何参与项目开发。

更新日志

v1.0.0 (2024-01-20)

• ✅ 初始版本发布

• ✅ 基础滑块验证功能

• ✅ 响应式设计支持

• ✅ 自定义配置选项

许可证

本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情。

相关项目

• https://github.com/your-username/vue-slider-verification - Vue.js 版本

• https://github.com/your-username/react-slider-verification - React 版本

支持与反馈

如果您在使用过程中遇到问题或有改进建议，请通过以下方式联系我们：

• 📧 邮箱：your-email@example.com

• 💬 提交 https://github.com/your-username/slider-verification/issues

• 📖 查看 https://github.com/your-username/slider-verification/wiki 获取更多文档

星星这个项目 ⭐ 如果你觉得它有用！
