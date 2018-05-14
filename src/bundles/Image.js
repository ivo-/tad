import { IMAGE_APP } from '../constants';

// =============================================================================
// Initial state

const initialState = {
  id: 6,
  app: IMAGE_APP,
  title: 'Image',
  src: 'https://i.ytimg.com/vi/QNEEvICoW_w/hqdefault.jpg',
};

// =============================================================================
// Actions

export function setImage(state, src) {
  return { ...state, src };
}

// =============================================================================
// Bundle

export default {
  key: 'image',
  initialState,
  actions: {
    setImage,
  },
};
