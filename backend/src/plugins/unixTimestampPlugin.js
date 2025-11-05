/**
 * Mongoose plugin to automatically convert all Date fields to Unix timestamps
 * Usage: schema.plugin(unixTimestampPlugin);
 */

export function unixTimestampPlugin(schema) {
  schema.eachPath((pathname, schematype) => {
    if (schematype.instance === 'Date') {
      const options = { ...schema.path(pathname).options };

      schema.remove(pathname);
      schema.add({
        [pathname]: {
          ...options,
          type: Number,
          set: (v) => {
            if (!v) return v;
            if (v instanceof Date) return v.getTime();
            if (typeof v === 'string') return new Date(v).getTime();
            return v;
          }
        }
      });
    }
  });

  if (schema.options.timestamps) {
    schema.remove('createdAt');
    schema.remove('updatedAt');

    schema.add({
      createdAt: { type: Number, default: Date.now },
      updatedAt: { type: Number, default: Date.now }
    });

    schema.pre('save', function(next) {
      this.updatedAt = Date.now();
      if (this.isNew) this.createdAt = Date.now();
      next();
    });

    schema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function(next) {
      this.set({ updatedAt: Date.now() });
      next();
    });
  }
}
