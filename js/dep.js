/*
 * @name:
 * @Date: 2020-09-17 15:47:32
 * @LastEditTime: 2020-09-17 16:44:32
 * @FilePath: \jddk\js\dep.js
 * @permission:
 */
// 用于收集依赖和发布更新
export default class Dep {
	constructor() {
		this.subs = [];
	}

	// 订阅
	on(item) {
		this.subs.push(item);
	}

	// 发布
	emit() {
		this.subs.forEach((item) => {
			item.update();
		});
	}
}
