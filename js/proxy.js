/*
 * @name:
 * @Date: 2020-09-11 14:25:18
 * @LastEditTime: 2020-09-14 15:17:09
 * @FilePath: \jddk\js\proxy.js
 * @permission:
 */
// 数据代理，将data中的数据绑定到this上

export default class Porxy_data {
	constructor(vm) {
		this.$vm = vm;
		this.$data = vm.$data;
		this.proxy_data();
	}

	proxy_data() {
		Object.keys(this.$data).forEach((item) => {
			// 检测this上的数据
			Object.defineProperty(this.$vm, item, {
				get() {
					return this.$data[item];
				},
				set(val) {
					if (this.$data[item] != val) {
						this.$data[item] = val;
					}
				},
			});
		});
	}
}
