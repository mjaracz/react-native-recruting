import { VideoPlayer, VideoView } from 'expo-video';
import { View, StyleSheet } from 'react-native';

interface VideoPlayerProps {
  customPlayer: VideoPlayer;
  videoStyles?: string;
  containerStyles?: string;
  width?: number;
  height?: number;
}

export default function CustomVideoPlayer(props: VideoPlayerProps) {
  return (
    <View style={styles.contentContainer} className={`${props.containerStyles}`}>
      <VideoView
        style={{ ...styles.video, width: props?.width, height: props?.height }}
        className={props.videoStyles}
        player={props.customPlayer}
        allowsPictureInPicture
        allowsFullscreen
      />
    </View>
  );
}


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});