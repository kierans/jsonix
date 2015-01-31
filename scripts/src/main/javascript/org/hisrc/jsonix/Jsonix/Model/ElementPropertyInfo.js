Jsonix.Model.ElementPropertyInfo = Jsonix.Class(
		Jsonix.Model.AbstractElementsPropertyInfo, {
			typeInfo : 'String',
			elementName : null,
			initialize : function(mapping) {
				Jsonix.Util.Ensure.ensureObject(mapping);
				Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize
						.apply(this, [ mapping ]);
				var ti = mapping.typeInfo||mapping.ti||'String';
				if (Jsonix.Util.Type.isObject(ti)) {
					this.typeInfo = ti;
				} else {
					Jsonix.Util.Ensure.ensureString(ti);
					this.typeInfo = ti;
				}
				var en = mapping.elementName||mapping.en||undefined;
				if (Jsonix.Util.Type.isObject(en)) {
					this.elementName = Jsonix.XML.QName.fromObject(en);
				} else if (Jsonix.Util.Type.isString(en)) {
					this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, en);
				} else {
					this.elementName = new Jsonix.XML.QName(this.defaultElementNamespaceURI, this.name);
				}
			},
			unmarshalElement : function(context, input, scope, callback) {
				return callback(this.typeInfo.unmarshal(context, input, scope));
			},
			marshalElementNode : function(value, context, output, scope) {
				this.marshalElementTypeInfo(this.elementName, value, this.typeInfo, context, output, scope);
			},
			doBuild : function(context, module) {
				this.typeInfo = context.resolveTypeInfo(this.typeInfo, module);
			},
			buildStructureElements : function(context, structure) {
				structure.elements[this.elementName.key] = this;
			},
			CLASS_NAME : 'Jsonix.Model.ElementPropertyInfo'
		});
