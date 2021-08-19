Ext.define("ext5.view.saki.Main", {
	extend : "Ext.container.Container",
	alias : "widget.saki-main",
	controller : "saki-main",
	viewModel : {
		type : "saki-main"
	},
	layout : {
		type : "vbox",
		align : "stretch"
	},
	defaults : {
		border : true
	},
	items : [ {
		xtype : "saki-customersgrid",
		title : "Customers Grid",
		height : 220,
		glyph : 61646
	}, {
		xtype : "saki-customerform",
		title : "Customer Form",
		height : 150,
		glyph : 61686
	} ]
});