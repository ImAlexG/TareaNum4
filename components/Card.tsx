import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface CardProps {
  index: number;
  value: number;
  isSelected: boolean;
  imageFront: any;
  imageBack: any;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({
  index,
  value,
  isSelected,
  imageFront,
  imageBack,
  onPress,
}) => {
  const rotation = useSharedValue(0);

  const rotateCard = () => {
    rotation.value = withSpring(180);
    setTimeout(() => {
      rotation.value = withSpring(0);
    }, 1000);
  };

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.cardContainer, cardStyle]}>
      <TouchableOpacity onPress={() => {
        rotateCard();
        onPress();
      }}>
        <Image
          source={isSelected ? imageFront : imageBack}
          style={styles.cardImage}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 80,
    height: 120,
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Card;
