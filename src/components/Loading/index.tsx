import React, {useEffect, useRef} from 'react';
import {
  View,
  //   ActivityIndicator,
  StyleSheet,
  Animated,
  Image,
  Easing,
} from 'react-native';

const LoadingScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Image source={require('../../../assets/images/loadingimg.png')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
  },
});

export default LoadingScreen;
