import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  Track,
} from "react-native-track-player";

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      progressUpdateEventInterval: 10,
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    isSetup = true;

    return isSetup;
  }
}

export async function addTrack() {
  // await TrackPlayer.add(playlistData);
  // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export default async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
    TrackPlayer.seekTo(position);
  });
  // TrackPlayer.addEventListener(
  //   Event.PlaybackProgressUpdated,
  //   ({ track, position }) => {
  //     console.log(track.toString(), position.toString());
  //     console.log("playback proggress upfated");
  //     // dispatch(
  //     //   setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
  //     // );
  //   },
  // );
  // TrackPlayer.addEventListener(
  //   Event.PlaybackActiveTrackChanged,
  //   ({ track }) => {},
  // );
}

export const handlePlay = async (track: Track) => {
  const queue = await TrackPlayer.getQueue();
  const alreadyInQueue = queue?.find((item) => item.id === track.id);
  if (alreadyInQueue) {
    console.log("already in queue");
  } else {
    TrackPlayer.add(track).then((index: any) =>
      TrackPlayer.skip(index).then(() => TrackPlayer.play()),
    );
  }
};
