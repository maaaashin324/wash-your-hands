import React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

interface MyCardInterface {
  title: string;
  content: string;
  thumbnail?: string;
  buttonTitle: string;
  callback: () => {};
}

const MyCard: React.FC<MyCardInterface> = ({
  title,
  content,
  thumbnail,
  buttonTitle,
  callback,
}) => (
  <Card>
    {!thumbnail ? null : <Card.Cover source={{ uri: thumbnail }} />}
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{content}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button onPress={callback}>{buttonTitle}</Button>
    </Card.Actions>
  </Card>
);

export default MyCard;
