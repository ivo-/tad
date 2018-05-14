import { connect, bundle, comp } from 'bund';

import Image from './Image';
import { Image as ImageBundle } from '../../bundles';
import { editable } from '../../bundles/localState';

export default comp(
  connect(ImageBundle, {
    select: state => ({ ...state }),
    selectOnce: (_, { setImage }) => ({
      onSetImage: setImage,
    }),
  }),
  connect(bundle(editable), { selectAll: true })
)(Image);
