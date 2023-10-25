import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';

function GetStartedScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <ImageBackground
      source={require('../../../assets/images/started-back-ground.png')}
      resizeMode="cover"
      style={styles.bg}>
      <View style={styles.Wrapper}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={[styles.text, styles.text2]}>PlantApp</Text>
      </View>
      <View style={styles.desc}>
        <Text style={styles.textDesc}>
          Identify more than 3000+ plants and 88% accuracy.
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../../assets/images/plant1.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          title="Get Started"
          onPress={() => {
            navigation.navigate('WalkThrough');
          }}
        />
      </View>
      <View style={styles.aggrements}>
        <Text style={styles.aggrementText}>
          <Text>By tapping next, you are agreeing to PlantID </Text>
          <Text style={styles.underlineText}> Terms of Use</Text> &{' '}
          <Text style={styles.underlineText}>Privacy Policy</Text>.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: '100%',
  },
  Wrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
    paddingBottom: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 28,
    fontWeight: '400',
    color: '#13231B',
  },
  text2: {
    fontWeight: '600',
    marginLeft: 10,
  },
  desc: {
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  textDesc: {
    fontSize: 16,
    fontWeight: '400',
    color: '13231b',
    lineHeight: 20,
  },
  imgContainer: {
    paddingTop: 10,
    paddingBottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 375,
    height: 499,
  },
  button: {
    marginTop: -25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  aggrements: {
    paddingLeft: 73,
    paddingRight: 70,
    paddingTop: 50,
  },
  aggrementText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#597165',
    textAlign: 'center',
    lineHeight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

export default GetStartedScreen;
