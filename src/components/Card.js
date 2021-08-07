import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colorMap, screenWidth} from '../styles/Index';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImg: this.props.showImg,
      image: this.props.image,
      columns: this.props.columns,
    };
  }
  static propTypes = {
    showImg: PropTypes.bool, //是否显示图片
    image: PropTypes.object, //图片地址
    columns: PropTypes.array, //右侧内容
    width: PropTypes.number, //图片宽度
    height: PropTypes.number, //图片高度
  };
  static defaultProps = {
    showImg: true,
    width: parseInt(screenWidth / 4),
    height: parseInt((screenWidth / 4) * 1.5),
    image: {
      path: '',
    },
    columns: [],
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      image:nextProps.image,
      columns: nextProps.columns,
    });
  }
  _renderCardRightItem = (item, index) => {
    if (!item.render) {
      return (
        <View key={index} style={styles.cardRightItem}>
          <Text style={[styles.cardRightItemText]}>{item}</Text>
        </View>
      );
    } else {
      return (
        <View key={index} style={styles.cardRightRender}>
          {item.render()}
        </View>
      );
    }
  };
  render() {
    const {showImg, image, columns} = this.state;
    const {height, width} = this.props;
    const rightContent = columns.map((v, i) => {
      return this._renderCardRightItem(v, i);
    });
    if (showImg) {
      return (
        <View style={styles.container}>
          <View style={[styles.cardLeft, {height, width}]}>
            <Image
              source={{uri: image.path}}
              style={{height, width}}
              resizeMethod="resize"
            />
          </View>
          <View style={styles.cardRight}>{rightContent}</View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  cardLeft: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderStyle: 'solid',
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLeftImg: {},
  cardRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: colorMap.black[1],
  },
  cardRightItem: {
    alignItems: 'center',
    textAlign: 'left',
    flexDirection: 'row',
  },
  cardRightRender: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  cardRightItemText: {
    lineHeight: 24,
    height: 24,
    flex: 1,
    marginRight: 5,
  },
});
export default Card;
