import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface BasicButtonProps {
  title: string;
  onPress: () => void;
}

const BasicButton: React.FC<BasicButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#28AF6E',
    borderRadius: 12,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default BasicButton;
