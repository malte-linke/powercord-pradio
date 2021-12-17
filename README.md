# PRadio: Stream radio in Discord

This plugin allows you to listen to your favorite radio stations while talking to your best friends. <br>
You can specify your own radio stream in the settings.<br>
I will add a custom playing modal in the future and a option to automatically turn the volume down once someone is talking.<br>
<br>
<b>
  Important: The provided url MUST be a link to a DIRECT MEDIA STREAM. This means https://radioXYZ.fm is not a valid url!<br>
  Stream urls normaly look like https://play.radioXYZ.fm/source.mp3
</b>

## Support

If you need help, please feel free to contact me on Discord (Parzival#9999).<br>
You can also create a new issue on GitHub. It normaly doesn't take long for me to repsond.

## Installation

1. Go to your powercord plugins folder. Run ``git clone https://github.com/malte-linke/powercord-pradio.git``
2. Restart discord to fetch missing plugins.

## Stream Support & Shoutcast Metadata Protocol

The plugin supports Shoutcast Metadata Protocol (ICY).</br>
This basically means, if your radio stations sends the song title, my plugin will display you the currently playing song.

### Supported Stream Types

| Type           | Description              | Support |
| -------------- | ------------------------ | :-----: |
| .mp3, .ogg ... | Any direct media stream. | ✔️      |
| .m3u / .m3u8   | Multimedia playlists.    | ❌      |

## Since 1.1.0

You now have a modal above your username! Its not the best...<br>
Also, I am still looking for an easy way to retrieve the album covers automatically.<br>

<img src=https://i.imgur.com/Np3nmyJ.png>

###### Audio visualizer: <a href="//github.com/malte-linke/powercord-pspectrum">malte-linke/powercord-pspectrum</a>

## Demo

I actually do not know what to show here, so here is the settings page:

<img src="https://i.imgur.com/g5S1Zn6.png">

