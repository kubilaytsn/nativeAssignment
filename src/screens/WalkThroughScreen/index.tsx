import React, {useRef} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';

function WalkThroughScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  const swiperRef = useRef<Swiper | null>(null);

  return (
    <Swiper showsButtons={false} ref={swiperRef}>
      <View style={styles.slide}>
        <Image source={require('../../../assets/images/walkthrough1.png')} />
        <View style={styles.imgContainer}>
          <Image
            source={require('../../../assets/images/Content1.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            title={'Continue'}
            onPress={() => {
              swiperRef.current?.scrollBy(1, false);
            }}
          />
        </View>
      </View>
      <View style={styles.slide}>
        <Image
          style={styles.walkthroughTitle}
          source={require('../../../assets/images/walkthrough2.png')}
        />
        <View style={styles.imgContainerBehindBg}>
          <ImageBackground source={require('../../../assets/images/bg1.png')}>
            <Image
              source={require('../../../assets/images/Content2.png')}
              style={styles.imagePhone}
              resizeMode="contain"
            />
          </ImageBackground>
          <Image
            source={require('../../../assets/images/Artwork.png')}
            style={styles.imageArt}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContentLast}>
          <CustomButton
            title={'Continue'}
            onPress={() => {
              navigation.navigate('Plans');
            }}
          />
        </View>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  walkthroughTitle: {
    marginTop: 10,
  },
  text: {
    color: '#13231B',
    fontSize: 30,
    fontWeight: '600',
  },
  imgContainer: {
    paddingTop: 10,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainerBehindBg: {
    marginTop: 70,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 375,
    height: 650,
  },
  imagePhone: {
    width: 375,
    height: 530,
  },
  imageArt: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: -80,
    right: 20,
    bottom: 0,
  },
  button: {
    marginTop: -140,
  },
  buttonContentLast: {
    marginTop: -52,
  },
});

export default WalkThroughScreen;
