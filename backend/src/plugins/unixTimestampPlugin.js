/**
 * Mongoose plugin to convert timestamps to Unix format (milliseconds)
 * This plugin can be applied to any Mongoose schema to ensure dates are stored as Unix timestamps
 */

export function unixTimestampPlugin(schema) {
  schema.pre('save', function() {
    if (this.createdAt) {
      this._doc.createdAt = this.createdAt.getTime();
    }
    if (this.updatedAt) {
      this._doc.updatedAt = this.updatedAt.getTime();
    }

    const schemaObj = schema.obj;
    for (const fieldName in schemaObj) {
      const fieldDef = schemaObj[fieldName];
      if (fieldDef.type === Date || fieldDef === Date) {
        if (this[fieldName] instanceof Date) {
          this[fieldName] = this[fieldName].getTime();
        }
      } else if (Array.isArray(fieldDef) && fieldDef.length > 0 && (fieldDef[0].type === Date || fieldDef[0] === Date)) {
        if (Array.isArray(this[fieldName])) {
          this[fieldName] = this[fieldName].map(date => date instanceof Date ? date.getTime() : date);
        }
      }
    }
  });

  schema.pre('findOneAndUpdate', function() {
    this.set({ updatedAt: Date.now() });
  });

  schema.pre('updateOne', function() {
    this.set({ updatedAt: Date.now() });
  });

  schema.pre('updateMany', function() {
    this.set({ updatedAt: Date.now() });
  });
}
