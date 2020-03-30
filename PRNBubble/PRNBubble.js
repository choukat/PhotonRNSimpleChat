import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'

import styles from './styles';

class PRNBubble extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        let position = {justifyContent: 'flex-start'}
        if(this.props.me) {
          position = {justifyContent: 'flex-end'}
        }

        return (
          <View style={[styles.mainContainer, this.props.position]}>
            <View style={[styles.bubbleStyle, {backgroundColor: this.props.primaryColor}, this.props.borderBubbleRadius]}>
              {(this.props.contentText.length > 0) &&
              <Text style={{fontSize:this.props.fontSize, color:this.props.textColor}}>{this.props.contentText}</Text>
              }
              {(this.props.image.length > 0) &&
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.props.showImage(this.props.image)}>
                  <Image
                    resizeMethod="resize"
                    style={[{width:200,  height:200}, this.props.borderBubbleRadius]}source={{uri: this.props.image}}/>
                </TouchableOpacity>
              }
            </View>
          </View>
        );
    }
}

PRNBubble.propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    contentText: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.int,
    position: PropTypes.object,
    borderBubbleRadius: PropTypes.object,
    image: PropTypes.string,
    showImage: PropTypes.func,
};

PRNBubble.defaultProps = {
    primaryColor: 'grey',
    secondaryColor: 'grey',
    contentText: '',
    textColor: 'white',
    fontSize: 16,
    position: {justifyContent:'flex-start'},
    image: '',
    showImage: (image) => {console.log('Press Image', image)},
    borderBubbleRadius: {borderTopRightRadius:18,
                         borderBottomRightRadius:18,
                         borderTopLeftRadius:18,
                         borderBottomLeftRadius:18}
}

export default PRNBubble;
