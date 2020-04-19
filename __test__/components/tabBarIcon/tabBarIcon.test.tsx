import React from 'react';
import renderer from 'react-test-renderer';
import TabBarIcon from '@/components/tabBarIcon';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('TabBarIcon', () => {
  test('should be rendered with main theme color if focused', () => {
    const tree = renderer.create(<TabBarIcon name="home" focused />);
    expect(tree).toMatchSnapshot();
  });

  test('should be rendered with default color if not focused', () => {
    const tree = renderer.create(<TabBarIcon name="home" focused={false} />);
    expect(tree).toMatchSnapshot();
  });
});
