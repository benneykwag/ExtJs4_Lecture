Ext.define("ext5.view.saki.CustomersGrid", {
	extend : "Ext.grid.Panel",
	alias : "widget.saki-customersgrid",
	plugins : [ {
		ptype : "cellediting"
	} ],
	modelValidation : true,
	bind : {
		store : "{customers}",
		title : "<b>{currentCustomer.name}</b>"
	},
	reference : "customersGrid",
	columns : [ {
		text : "Customer",
		dataIndex : "name",
		flex : 1.5,
		editor : {
			bind : "{currentCustomer.name}",
			selectOnFocus : true
		}
	}, {
		text : "Street",
		dataIndex : "addrStreet",
		flex : 2,
		editor : {
			bind : "{currentCustomer.addrStreet}",
			selectOnFocus : true
		}
	}, {
		text : "City",
		dataIndex : "addrCity",
		flex : 2,
		editor : {
			bind : "{currentCustomer.addrCity}",
			selectOnFocus : true
		}
	}, {
		text : "Country",
		dataIndex : "addrCountry",
		width : 80,
		editor : {
			bind : "{currentCustomer.addrCountry}",
			selectOnFocus : true
		}
	} ]
});
