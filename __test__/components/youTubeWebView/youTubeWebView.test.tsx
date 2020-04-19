import React from 'react';
import renderer from 'react-test-renderer';
import YouTubeWebView from '@/components/youTubeWebView';
import videos from '@/constants/videos';

jest.mock('react-native-webview', () => ({ WebView: 'WebView' }));

describe('YouTubeWebView', () => {
  test('should render YouTubeWebView correctly', () => {
    const tree = renderer
      .create(<YouTubeWebView uri={videos[0].videoURL} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
