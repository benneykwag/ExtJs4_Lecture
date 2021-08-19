Ext.define("ex5.view.saki.MainModel", {
	extend : "Ext.app.ViewModel",
	alias : "viewmodel.saki-main",
	stores : {
		customers : {
			model : "Customer",
			autoLoad : true
		}
	},
	formulas : {
		currentCustomer : {
			bind : {
				bindTo : "{customersGrid.selection}",
				deep : true
			},
			get : function(b) {
				return b
			},
			set : function(b) {
				if (!b.isModel) {
					b = this.get("customers").getById(b)
				}
				this.set("currentCustomer", b)
			}
		},
		status : {
			bind : {
				bindTo : "{currentCustomer}",
				deep : true
			},
			get : function(c) {
				var d = {
					dirty : c ? c.dirty : false,
					valid : c && c.isModel ? c.isValid() : false
				};
				d.dirtyAndValid = d.dirty && d.valid;
				return d
			}
		}
	}
});
