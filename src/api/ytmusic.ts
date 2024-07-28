import axios, { AxiosError, AxiosResponse } from "axios";

async function getYtMusic(videoId: string) {
  const result = await axios({
    method: "POST",
    url: "https://music.youtube.com/youtubei/v1/player?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42",
      Origin: "https://music.youtube.com",
      Referer: "https://music.youtube.com/",
      "Accept-Language": "de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    },
    data: {
      context: {
        client: {
          hl: "en",
          gl: "US",
          clientName: "WEB_MUSIC",
          clientVersion: "1.0",
          clientScreen: "WATCH",
        },
        thirdParty: {
          embedUrl: "https://www.youtube.com/",
        },
      },
      videoId,
      // playbackContext: {
      //   contentPlaybackContext: {
      //     signatureTimestamp: 19250,
      //   },
      // },
      racyCheckOk: true,
      contentCheckOk: true,
    },
  });
  return result.data.streamingData.adaptiveFormats[15];
}

export { getYtMusic };
