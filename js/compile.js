/*
 * @name:
 * @Date: 2020-09-11 11:28:14
 * @LastEditTime: 2020-09-14 15:41:06
 * @FilePath: \jddk\js\compile.js
 * @permission:
 */
export default class Compile {
	constructor(vm) {
		this.$vm = vm;
		this.$elNode = document.querySelector(vm.$el);
		this.$methods = vm.$methods;
		this.$on = vm.on;
		let fragment = this.nodeToFragment();
		let childNodes = fragment.childNodes;
		this.compileElement(childNodes);
		this.$elNode.appendChild(fragment);
	}

	// 真实DOM转化为文档碎片，在内存中处理提高性能
	nodeToFragment() {
		let fragment = document.createDocumentFragment();
		let nodes = [...this.$elNode.childNodes];
		nodes.forEach((item) => {
			fragment.appendChild(item);
		});
		return fragment;
	}

	// 对HTML进行编译，将双括号里的内容替换成data的值，将@xxx的属性绑定对应的事件或方法
	compileElement(childNodes) {
		let reg = /\{\{(.*)\}\}/;
		let that = this;
		childNodes.forEach((item) => {
			if (
				(item.nodeType === 1 || item.nodeType === 3) &&
				reg.test(item.textContent)
			) {
				let key = item.textContent.replace(reg, `$1`);
				setText(item, key);
				// 订阅
				that.$on.call(this.$vm, key, setText.bind(that, item, key));
			} else if (item.nodeType === 1) {
				let nodeAttrs = [...item.attributes];
				nodeAttrs.forEach((cell) => {
					if (cell.name.includes("@")) {
						item.addEventListener(
							cell.name.substr(1),
							this.$methods[cell.value].bind(this.$vm)
						);
					}
					if (cell.name == "v-model") {
						item.addEventListener("input", function (e) {
							that.$vm[cell.value] = e.srcElement.value;
						});
					}
				});
			}
		});

		function setText(node, key) {
			node.textContent = that.$vm[key];
		}
	}
}
