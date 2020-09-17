/*
 * @name:
 * @Date: 2020-09-11 11:18:59
 * @LastEditTime: 2020-09-17 15:41:40
 * @FilePath: \jddk\js\jddk.js
 * @permission:
 */
import Compile from "./compile.js";
import Observe from "./observe.js";
import Proxy from "./proxy.js";
export default class Jddk {
	constructor(options) {
		if (typeof options.data === "function") {
			this.$data = options.data();
		} else {
			this.$data = options.data;
		}
		this.$el = options.el;
		this.$methods = options.methods;
		this.$beforeCreate = options.beforeCreate;
		this.$created = options.created;
		this.$mounted = options.mounted;

		// beforeCreate生命周期：此时实例刚开始初始化，还没有将data中的数据进行代理，无法使用this.xx获取到data中的数据
		if (this.$beforeCreate) {
			this.$beforeCreate();
		}
		// 数据代理：将data的数据代理到this上
		new Proxy(this);

		// 数据劫持：检测data中的数据改变
		new Observe(this);

		// created生命周期：此时data中的数据已经全部绑定到了this上，但是HTML还没有开始编译
		if (this.$created) {
			this.$created();
		}

		// 编译器
		new Compile(this);

		// mounted生命周期：此时HTML已经编译完
		if (this.$mounted()) {
			this.$mounted();
		}
	}
}
