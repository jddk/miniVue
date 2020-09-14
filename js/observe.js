/*
 * @name:
 * @Date: 2020-09-11 14:22:45
 * @LastEditTime: 2020-09-14 15:27:55
 * @FilePath: \jddk\js\observe.js
 * @permission:
 */
//  数据劫持，监测到data中的数据的变化，如果是改变就广播修改
export default class Observe {
	constructor(vm) {
		this.$vm = vm;
		this.$data = vm.$data;
		this.$emit = vm.emit;
		this.observe();
	}

	observe() {
		let that = this;
		Object.keys(that.$data).forEach((key) => {
			defineProperty(that.$data, key, that.$data[key]);
		});
		// 检测data中数据
		function defineProperty(data, key, value) {
			Object.defineProperty(data, key, {
				get() {
					return value;
				},
				set(newVal) {
					if (newVal != value) {
						value = newVal;
						that.$emit.call(that.$vm, key);
					}
				},
			});
		}
	}
}
