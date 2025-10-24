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

1. 下载项目文件
```
git clone https://github.com/your-username/slider-verification.git
```


2. 引入必要的文件：
```
<!-- 引入样式 -->
<link rel="stylesheet" href="css/verification.css">
```

<!-- 引入脚本 -->
```
<script src="js/verification.js"></script>
```


3. 创建HTML容器：
```
<div id="verification-container"></div>
```

4. 初始化验证组件：
```
// 基本用法
const verification = new SliderVerification('verification-container');
```

// 带配置的用法
```
const verification = new SliderVerification('verification-container', {
    width: 350,
    height: 200,
    attempts: 3,
    onSuccess: function() {
        console.log('验证成功！');
        // 执行后续操作
    }
});
```

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


许可证

本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情。

星星这个项目 ⭐ 如果你觉得它有用！
