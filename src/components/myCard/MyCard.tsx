import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import Layout from '@constants/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

type MyCardProps = {
  title: string;
  content: string;
  thumbnail?: string;
  buttonTitle: string;
  callback: () => void;
  style: ViewStyle;
};

const MyCard: React.FC<MyCardProps> = ({
  title,
  content,
  thumbnail,
  buttonTitle,
  callback,
  style,
}) => {
  const { WIDTH } = Layout.WINDOW;

  return (
    <Card style={{ ...styles.container, ...style, width: WIDTH }}>
      <Card.Title title={title} subtitle={content} />
      <Card.Cover source={{ uri: thumbnail }} style={{ width: WIDTH }} />
      <Divider />
      <Card.Actions>
        <Button onPress={callback}>{!buttonTitle ? 'OK' : buttonTitle}</Button>
      </Card.Actions>
    </Card>
  );
};

export default MyCard;
