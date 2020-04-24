import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default Object.freeze({
  WINDOW: {
    WIDTH: width,
    HEIGHT: height,
  },
  IS_SMALL_DEVICE: width < 375,
});
