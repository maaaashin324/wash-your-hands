import React from 'react';
// eslint-disable-next-line
// @ts-ignore
import { StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

interface MyCardInterface {
  title: string;
  content: string;
  thumbnail?: string;
  buttonTitle: string;
  callback: () => void;
  style: ViewStyle;
}

const MyCard: React.FC<MyCardInterface> = ({
  title,
  content,
  thumbnail,
  buttonTitle,
  callback,
  style,
}) => {
  const window = useWindowDimensions();

  return (
    <Card style={{ ...styles.container, ...style, width: window.width - 10 }}>
      <Card.Title title={title} subtitle={content} />
      <Card.Cover
        source={{ uri: thumbnail, cache: 'only-if-cached' }}
        style={{ width: window.width - 10, minWidth: window.width - 10 }}
      />
      <Divider />
      <Card.Actions>
        <Button onPress={callback}>{!buttonTitle ? 'OK' : buttonTitle}</Button>
      </Card.Actions>
    </Card>
  );
};

export default MyCard;
