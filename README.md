# Video web exam

## Requirements

- ✅ 上下滑動切換 - 必要
- ✅ Following / For You 切換暫停(切換回去要從離開的進度繼續播放)
- ✅ 過場圖片 遮罩(封面圖) 功能，如影片所示意
- ✅ Progress Bar 可拖曳播放進度 
- ✅ 影片播放切換 - TikTok APP
- ✅ 驗測會採用 Mac Chrome & iPhone 實體手機 & iPhone Simulator

## Bonus

試看版本與完整版為兩個不同的 m3u8 檔案，試看版的 m3u8 只包含 5 分鐘的影片

(1) 試看版的 m3u8 不需加密，當播放完畢後會跳出提示訊息要求使用者付費購買完整版，若使用者已付費購買，則會有一個另一個 API 會將完整版的 m3u8 回傳給前端。

(2) 完整版的 m3u8 需要 DRM 加密，以防止使用者直接下載完整版的 m3u8 檔案。


## Quick Start

```sh
$ npm i
$ npm start
```