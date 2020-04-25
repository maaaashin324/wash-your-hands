import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { COLORS } from '@/constants';

export default function Header({
  navigation: { canGoBack, goBack },
  scene: {
    route: { name },
  },
}: StackHeaderProps): React.FunctionComponentElement<StackHeaderProps> {
  return (
    <Appbar.Header style={{ backgroundColor: COLORS.bar }}>
      {canGoBack() && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={name} />
    </Appbar.Header>
  );
}
