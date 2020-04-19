import React from 'react';
// eslint-disable-next-line
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '@constants/colors';

type TabBarIconProps = {
  name: string;
  focused: boolean;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused }) => {
  return (
    <MaterialIcons
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
