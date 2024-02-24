import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Card from './Card';
import Animated, { useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const Board: React.FC = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const cardPairs = Array.from({ length: 5 }, (_, index) => index + 1).flatMap((number) => [number, number]);
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
  };

  const handleCardPress = (index: number) => {
    if (selectedCards.includes(index) || cards[index] === -1) {
      return;
    }
    setAttempts((prevAttempts) => prevAttempts + 1);

    if (selectedCards.length === 1) {
      compareSelectedCards(index);
    } else {
      setSelectedCards([index]);
    }
  };

  const compareSelectedCards = (index: number) => {
    const [firstCardIndex] = selectedCards;
    const firstCard = cards[firstCardIndex];
    const secondCard = cards[index];

    if (firstCard === secondCard) {
      const newCards = [...cards];
      newCards[firstCardIndex] = -1;
      newCards[index] = -1;
      setCards(newCards);
      setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 1);
      setSelectedCards([]);

      if (matchedPairs + 1 === 5) {
        showWinnerAlert();
      }
    } else {
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };

  const showWinnerAlert = () => {
    Alert.alert(
      '¡Felicidades!',
      `¡Has encontrado todos los pares en ${attempts} intentos!`,
      [{ text: 'OK', onPress: () => console.log('Game finished!') }]
    );
  };

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const renderCards = () => {
    return cards.map((card, index) => (
      <TouchableOpacity key={index} onPress={() => handleCardPress(index)}>
        <Card
          index={index}
          value={card}
          isSelected={selectedCards.includes(index)}
          imageFront={getCardImage(card)}
          imageBack={require('./pokebola.jpg')}
          onPress={() => handleCardPress(index)}
        />
      </TouchableOpacity>
    ));
  };

  const getCardImage = (value: number) => {
    switch (value) {
      case 1:
        return require('./Arceus.jpg');
      case 2:
        return require('./Charizard.jpg');
      case 3:
        return require('./Mew.jpg');
      case 4:
        return require('./mewtwo.jpg');
      case 5:
        return require('./Pikachu.jpg');
      default:
        return require('./pokebola.jpg');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>{renderCards()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Board;
