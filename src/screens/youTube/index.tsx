import React from 'react';
import { WebView } from 'react-native-webview';

const YouTubeWebView: React.FC<{ route }> = ({ route }) => (
  <WebView source={{ uri: route.params.uri }} />
);

export default YouTubeWebView;
