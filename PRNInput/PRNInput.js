import React, { Component } from 'react';
import { Text, ScrollView, View, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class PRNInput extends Component {
    constructor(props) {
      super(props)

      console.log('props', this.props)
    }

    render() {
        return (
          <TextInput
            placeholder={this.props.placeholder}
            multiline={true}
            textAlignVertical={'top'}
            placeholderTextColor={this.props.textColor}
            textColor={this.props.textColor}
            value={this.props.value}
            style={{width:'100%', top:3, color:this.props.textColor}}
            onBlur={this.props.onPress}
            onFocus={this.props.onPress}
            onEndEditing={this.props.onPress}
            onSelectionChange={this.props.onPress}
            onChangeText={(message) => this.props.onChange(message)}
            />
        );
    }

    componentDidMount() {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.props.onPress);
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.props.onPress);
    }

    componentWillUnmount() {
      this.keyboardDidHideListener.remove();
      this.keyboardDidShowListener.remove();
    }
}

PRNInput.propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    placeholder: PropTypes.string,
    onPress: PropTypes.func,
};

PRNInput.defaultProps = {
    primaryColor: 'grey',
    secondaryColor: 'black',
    placeholder: 'type your message...',
    onPress: () => {}
}

export default PRNInput;
