import React, { Component } from 'react';
import { Text, ScrollView, View, Image, FlatList, Keyboard } from 'react-native';
import PRNInput from './PRNInput';
import PRNActionBar from './PRNActionBar';
import PRNBubble from './PRNBubble';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'

import styles from './styles';

class PhotonRNSimpleChat extends Component {
    constructor(props) {
      super(props)

      this.state = {
        message: '',
        animSended: 0,
      }

      this.lastMessage = null
      this.nextMessage = 0
      this.scrollView = React.createRef();
      this._handleInputPress = this._handleInputPress.bind(this)
      this._onSend = this._onSend.bind(this)
    }

    componentDidMount() {
      this._scrollToEnd()
    }

    _handleInputPress() {
      setTimeout(() => this._scrollToEnd(), 200);
    }

    _scrollToEnd() {
      this.scrollView.scrollToEnd({animated:false})
    }

    _onSend() {
      if(this.state.message.length > 0) {
        this.props.onSend(this.state.message)
        this.setState({message: ''})
        Keyboard.dismiss()
      }
    }

    animSended(id) {
      this.setState({animSended: id})
      setTimeout(() => this.setState({animSended: 0}), 500)
    }

    render() {
        console.log('messages', this.props.messagesList)
        this.nextMessage = 0
        return (
            <View style={[styles.mainContaner]}>
              <ScrollView
                ref={component => this.scrollView = component}
                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                style={[styles.messagesList, {backgroundColor:this.props.backgroundMessagesColor}]}>
                {this.props.messagesList.map((message) => {
                  this.nextMessage = this.nextMessage + 1
                  let color = this.props.colorStrangerMessage
                  let borderBubbleRadius = {
                    borderTopRightRadius:18,
                    borderBottomRightRadius:18,
                    borderTopLeftRadius:18,
                    borderBottomLeftRadius:18,
                  }

                  let displayAvatar = false
                  let position = {justifyContent:'flex-start', marginRight:60}
                  if(message.me) {
                    color = this.props.colorUserMessage
                    position = {justifyContent:'flex-end', marginLeft:55, marginRight:0}
                    borderBubbleRadius.borderTopRightRadius = 5
                    borderBubbleRadius.borderBottomRightRadius = 5
                    if (this.props.messagesList[this.nextMessage] == undefined) {
                      borderBubbleRadius.borderBottomRightRadius = 18
                    } else {
                      if(this.props.messagesList[this.nextMessage].user.id != message.user.id){
                        borderBubbleRadius.borderBottomRightRadius = 18
                      }
                    }
                  } else {
                    borderBubbleRadius.borderTopLeftRadius = 5
                    borderBubbleRadius.borderBottomLeftRadius = 5
                    if (this.nextMessage >= this.props.messagesList.length) {
                      displayAvatar = true
                      borderBubbleRadius.borderBottomLeftRadius = 18
                    } else {
                      if(this.props.messagesList[this.nextMessage].user.id != message.user.id){
                        displayAvatar = true
                        borderBubbleRadius.borderBottomLeftRadius = 18
                      }
                    }
                  }

                  let displayPseudo = false
                  let displaySpace = false
                  if(!((this.lastMessage !== null ) && (this.lastMessage.user.id === message.user.id))) {
                    if(message.me) {
                      displaySpace = true
                      borderBubbleRadius.borderTopRightRadius = 18
                    } else {
                      displayPseudo = true
                      displaySpace = true
                      borderBubbleRadius.borderTopLeftRadius = 18
                    }
                  }

                  let sended = true
                  if(message.sended !== undefined) {
                    sended = message.sended
                  }

                  let image = ''
                  if(message.image !== undefined) {
                    image = message.image
                  }

                  if((this.lastMessage == null) || (this.lastMessage.idMessage !== message.idMessage)) {
                    this.lastMessage = message
                    return(
                      <View style={{flexDirection:'row'}}>
                        <View style={{marginHorizontal:10, width:35, justifyContent:'flex-end', flexDirection:'column'}}>
                          {displayAvatar &&
                          <Image
                            style={{ borderRadius:25, width:35, height:35}}
                            source={{uri: message.user.avatar}}
                          />
                          }
                        </View>
                        <View style={{flex:1, flexDirection:'column'}}>
                          {displaySpace &&
                          <View style={{height:10}}/>
                          }
                          {displayPseudo && this.props.displayPseudos &&
                          <View style={[{flex:1, flexDirection:'row', marginLeft:10}, {justifyContent: position.justifyContent}]}>
                            <Text style={{}}>{message.user.pseudo}</Text>
                          </View>
                          }
                          <PRNBubble
                            contentText={message.content}
                            textColor={this.props.textColor}
                            primaryColor={color}
                            fontSize={this.props.fontSize}
                            position={position}
                            borderBubbleRadius={borderBubbleRadius}
                            image={image}
                            showImage={this.props.showImage}
                            />
                        </View>
                        {message.me &&
                          <View style={{width:25, justifyContent:'flex-end', flexDirection:'column'}}>
                            {(!message.sended || this.state.animSended === message.idMessage) &&
                              <View style={{alignSelf:'center', justifyContent:'center', borderRadius:25, backgroundColor:this.props.colorUserMessage, height:10, width:10}}>
                                {(this.state.animSended == message.idMessage ) &&
                                  <Icon
                                  name={'check'}
                                  type={'font-awesome'}
                                  color={this.props.textColor}
                                  size={5}/>}
                                {(this.state.animSended !== message.idMessage) &&
                                <View style={{alignSelf:'center', borderRadius:25, backgroundColor:this.props.textColor, height:8, width:8}}/>
                                }
                              </View>
                            }
                          </View>
                        }
                      </View>
                    )
                  }
                })
                }
              </ScrollView>
              <View style={[styles.bottomBar, {backgroundColor:this.props.backgroundActionBarColor}]}>
                <View style={[styles.inputContainer, {backgroundColor:this.props.backgroundInputColor, borderRadius:18, borderWidth:1, borderColor:this.props.primaryColor}]}>
                  <PRNInput
                    backgroundColor={this.props.backgroundInputColor}
                    onPress={this._handleInputPress}
                    textColor={this.props.inputTextColor}
                    value={this.state.message}
                    onChange={(message) => this.setState({message: message})}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                  />
                </View>
                <View style={styles.actionBarContainer}>
                  <PRNActionBar
                    primaryColor={this.props.primaryColor}
                    secondaryColor={this.props.secondaryColor}
                    onSend={this._onSend}
                    onMediaPress={this.props.onMediaPress}/>
                </View>
              </View>
            </View>
        )
    }
}

PhotonRNSimpleChat.propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    colorUserMessage: PropTypes.string,
    colorStrangerMessage: PropTypes.string,
    messagesList: PropTypes.array,
    onSend: PropTypes.func,
    textColor: PropTypes.string,
    fontSize: PropTypes.int,
    displayPseudos: PropTypes.bool,
    animSended: PropTypes.int,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    showImage: PropTypes.func,
};

PhotonRNSimpleChat.defaultProps = {
    primaryColor: 'grey',
    secondaryColor: 'grey',
    textColor: 'white',
    colorStrangerMessage: 'silver',
    colorUserMessage : 'grey',
    backgroundMessagesColor:'white',
    backgroundActionBarColor:'white',
    backgroundInputColor:'white',
    messagesList: [],
    onSend: () => {console.log('message send')},
    fontSize:14,
    displayPseudos: false,
    animSended: 0,
    placeholder: 'Type your message...',
    placeholderTextColor: 'white',
    showImage: (image) => {console.log('press Image', image)}
}

export default PhotonRNSimpleChat;
