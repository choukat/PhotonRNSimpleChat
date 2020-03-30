import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'

import styles from './styles';

class PRNActionBar extends Component {
    constructor(props) {
      super(props)

      console.log('props', this.props)
    }

    render() {
        return (
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={this.props.onMediaPress}
              style={{justifyContent:'center'}}>
              <Icon
                name={'camera'}
                type={'font-awesome'}
                color={this.props.primaryColor}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.onSend}
              style={{justifyContent:'center'}}>
              <Icon
                name={'send'}
                type={'font-awesome'}
                color={this.props.primaryColor}
                />
            </TouchableOpacity>
          </View>
        );
    }
}

PRNActionBar.propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
};

PRNActionBar.defaultProps = {
    primaryColor: 'grey',
    secondaryColor: 'black',
}

export default PRNActionBar;
