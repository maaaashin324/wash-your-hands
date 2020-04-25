import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';

export default function Header({
  navigation: { canGoBack, goBack },
  scene: {
    route: { name },
  },
}: StackHeaderProps): React.FunctionComponentElement<StackHeaderProps> {
  return (
    <Appbar.Header>
      {canGoBack() && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={name} />
    </Appbar.Header>
  );
}
