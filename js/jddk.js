/*
 * @name:
 * @Date: 2020-09-11 11:18:59
 * @LastEditTime: 2020-09-14 14:05:54
 * @FilePath: \jddk\js\jddk.js
 * @permission:
 */
import Compile from "./compile.js";
import Observe from "./observe.js";
import Proxy_data from "./proxy.js";
export default class Vue {
	constructor(options) {
		this.$data = options.data();
		this.$el = options.el;
		this.$methods = options.methods;
		this.$created = options.created;
		this.$mounted = options.mounted;
		this.$list = {};

		// 数据代理
		new Proxy_data(this);
		// 数据劫持
		new Observe(this);

		if (this.$created) {
			this.$created();
		}
		// 编译器
		new Compile(this, this.on);

		// mounted生命周期，已经编译完
		if (this.$mounted()) {
			this.$mounted();
		}
	}

	// 订阅
	on(key, fn) {
		if (!(this.$list[key] instanceof Array)) {
			this.$list[key] = [];
		}
		this.$list[key].push(fn);
	}

	// 发布
	emit(key) {
		this.$list[key].forEach((fn) => {
			fn();
		});
	}
}
