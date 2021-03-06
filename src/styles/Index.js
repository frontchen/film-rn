import {
  AppStyle,
  styleMap,
  colorMap,
  screenWidth,
  screenHeight,
  statusBarHeight,
  headerHeight,
  bottomHeight,
  tabBarHeight,
} from './AppStyle';
import headerStyle from './Header';

Object.assign(AppStyle, headerStyle);

module.exports = {
  AppStyle,
  styleMap,
  colorMap,
  screenWidth,
  screenHeight,
  statusBarHeight,
  headerHeight,
  bottomHeight,
  tabBarHeight,
};
