### 说明

从零手写一个 MVVM 框架

### 实现逻辑

- 1、将 options 参数绑定到 this 上
- 2、beforeCreated 生命周期：如果有 `beforeCreate` 执行 `beforeCreate` 方法
- 3、数据代理：将 data 和 methods 中的属性使用 Object.definePrototype 代理到 this 上，实现使用 this.key 访问到 data 和 methods 对象里的属性。
- 4、数据劫持（核心）：遍历 data 中的属性，使用 Object.definePrototype 给它们添加 get 和 set 方法，当获取时触发 get 方法如果是编译阶段的触发，就订阅这条信息（信息的来源在编译阶段存储到全局遍历 window.target 中），如果是修改 data 中的数据触发 set 方法，并调用 Dep 类的发布方法。
- 5、created 生命周期：如果有`created`执行 created 方法
- 6、编译：获取所有 DOM 节点，将真实 DOM 使用转化为文档碎片存储在内存中提高性能。遍历内存中的 DOM 节点，如果 nodeType 是 1（元素） 或 3（文本节点）并且正则匹配到双大括号，则将更新节点的方法存储到全局变量 window.target 中，使用 node.textContent 方法实现双大括号内容的编译，然后清空全局变量；如果检测到 nodeType 是 1（元素节点）
  ，遍历元素节点的所有属性，如果属性名有`@`，就使用`addEventListener`绑定对应的事件，并把 methods 中对应的方法绑定到第二个参数上；如果是`v-model`则使用 addEventListener 绑定 input 事件，第二个参数方法中给对应的 data 属性赋值；其他的编译逻辑大致差不多
- 7、mounted 生命周期：如果有 created 属性执行 created 方法

## 第一次提交

实现 created，mounted 生命周期，
实现 v-model 双向数据绑定，
实现模板编译
实现 click,blur,focus 等事件

## 第二次提交

为了便于维护，将数据劫持、模版编译、数据监听的逻辑代码进行拆分
