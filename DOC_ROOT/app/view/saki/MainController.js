Ext.define("ext5.view.saki.MainController", {
	extend : "Ext.app.ViewController",
	alias : "controller.saki-main",
	onReject : function() {
		var b = this.getViewModel().get("currentCustomer");
		b.reject()
	},
	onCommit : function() {
		var b = this.getViewModel().get("currentCustomer");
		b.commit();
		b.reject()
	}
});
