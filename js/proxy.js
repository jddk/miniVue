/*
 * @name:
 * @Date: 2020-09-11 14:25:18
 * @LastEditTime: 2020-09-14 16:40:37
 * @FilePath: \jddk\js\proxy.js
 * @permission:
 */
// 数据代理，将data中的数据绑定到this上

export default class Porxy_data {
	constructor(vm) {
		this.$vm = vm;
		// 代理data到this上
		this.proxy(vm.$data);
		// 代理methods到this上
		this.proxy(vm.$methods);
	}

	proxy(obj) {
		Object.keys(obj).forEach((item) => {
			// 检测this上的数据
			Object.defineProperty(this.$vm, item, {
				get() {
					return obj[item];
				},
				set(val) {
					if (obj[item] != val) {
						obj[item] = val;
					}
				},
			});
		});
	}
}
