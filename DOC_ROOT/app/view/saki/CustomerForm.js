Ext.define("ext5.view.saki.CustomerForm", {
	extend : "Ext.form.Panel",
	alias : "widget.saki-customerform",
	bodyPadding : 10,
	bind : {
		title : "<b>{currentCustomer.name}</b>"
	},
	modelValidation : true,
	fieldDefaults : {
		labelWidth : 70,
		labelAlign : "right",
		selectOnFocus : true,
		flex : 1,
		anchor : "100%"
	},
	items : [ {
		fieldLabel : "Customer",
		bind : "{currentCustomer.name}",
		xtype : "textfield"
	}, {
		layout : "hbox",
		anchor : "100%",
		defaults : {
			xtype : "textfield"
		},
		items : [ {
			fieldLabel : "Street",
			bind : "{currentCustomer.addrStreet}"
		}, {
			fieldLabel : "City",
			bind : "{currentCustomer.addrCity}"
		}, {
			fieldLabel : "Country",
			bind : "{currentCustomer.addrCountry}"
		} ]
	} ],
	buttons : [ {
		text : "Commit",
		handler : "onCommit",
		glyph : 61452,
		disabled : true,
		bind : {
			disabled : "{!status.dirtyAndValid}"
		}
	}, {
		text : "Reject",
		handler : "onReject",
		glyph : 61666,
		disabled : true,
		bind : {
			disabled : "{!status.dirty}"
		}
	} ]
});
