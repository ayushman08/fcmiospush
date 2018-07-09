/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FCM, { NotificationActionType } from "react-native-fcm";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  async componentDidMount() {
    // FCM.createNotificationChannel({
    //   id: 'default',
    //   name: 'Default',
    //   description: 'used for example',
    //   priority: 'high'
    // })
    // registerAppListener(this.props.navigation);
    // FCM.getInitialNotification().then(notif => {
    //   this.setState({
    //     initNotif: notif
    //   });
    //   if (notif && notif.targetScreen === "detail") {
    //     setTimeout(() => {
    //       this.props.navigation.navigate("Detail");
    //     }, 500);
    //   }
    // });

    try {
      let result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true
      });
    } catch (e) {
      console.error(e);
    }

    // FCM.getFCMToken().then(token => {
    //   console.log("TOKEN (getFCMToken)", token);
    //   this.setState({ token: token || "" });
    // });

    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.warn("APNS TOKEN (getFCMToken)", token);
      });
    }

    // topic example
    // FCM.subscribeToTopic('sometopic')
    // FCM.unsubscribeFromTopic('sometopic')
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
