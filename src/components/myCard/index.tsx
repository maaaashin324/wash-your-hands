import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    height: 150,
  },
  content: {
    paddingTop: 5,
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
}) => (
  <Card style={{ ...styles.container, ...style }}>
    <Card.Cover source={{ uri: thumbnail }} style={styles.cover} />
    <Card.Content style={styles.content}>
      <Title>{title}</Title>
      <Paragraph>{content}</Paragraph>
      <Divider />
      <Card.Actions>
        <Button onPress={callback}>{!buttonTitle ? 'OK' : buttonTitle}</Button>
      </Card.Actions>
    </Card.Content>
  </Card>
);

export default MyCard;
