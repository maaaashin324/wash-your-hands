import VIDEOS from '@constants/videos';

// eslint-disable-next-line
export const videoListsWithYoutubeURL = VIDEOS.map((eachVideoItem) => ({
  title: eachVideoItem.title,
  subTitle: eachVideoItem.subTitle,
  youtubeURL: eachVideoItem.videoURL,
  thumbnailURL: eachVideoItem.thumbnail,
}));
