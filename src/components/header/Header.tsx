import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { RouteType } from '@types';
import { COLORS } from '@/constants';
import { getHeaderTitle } from '@/utils/navigations';

export default function Header({
  navigation: { canGoBack, goBack },
  scene: { route },
}: StackHeaderProps): React.FunctionComponentElement<StackHeaderProps> {
  const thisRoute = route as RouteType;
  return (
    <Appbar.Header style={{ backgroundColor: COLORS.bar }}>
      {canGoBack() && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={getHeaderTitle(thisRoute)} />
    </Appbar.Header>
  );
}
