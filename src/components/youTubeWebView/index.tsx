import React from 'react';
import { WebView } from 'react-native-webview';

const YouTubeWebView: React.FC<{ uri: string }> = ({ uri }) => (
  <WebView source={{ uri }} />
);

export default YouTubeWebView;
