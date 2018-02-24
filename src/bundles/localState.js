/**
 * Bundles that can be used instead of local sate management in React
 * components. This is like an alternative to `this.state` that can save
 * some boilerplate and benefit from bund's optimizations.
 *
 * You most definitely want to connect them sequentially, not in
 * combined bundle, so all the props are added directly.
 *
 */

export const editable = {
  initialState: {
    editedItem: null,
  },

  actions: {
    onEdit: (_, id) => ({ editedItem: id }),
    onClearEdit: () => ({ editedItem: null }),
  }
};

export const addForm = {
  initialState: {
    addFormShown: false,
  },

  actions: {
    onToggleAddForm: ({ addFormShown }) => ({ addFormShown: !addFormShown }),
  }
};
