# PRadio
> Stream radio in Discord 

![Version][version-image]
![Size][size-image]
![License][license-image]

This plugin allows you to listen to your favorite radio stations while talking to your best friends. <br>
You can specify your own radio stream in the settings.<br>
<br>
<b>
  Important: The provided url MUST be a link to a DIRECT MEDIA STREAM. This means https://radioXYZ.fm is not a valid url!<br>
  Stream urls normaly look like https://play.radioXYZ.fm/source.mp3
</b>

![][demo-image]

## Installation

1. Open your powercord plugins directory and run `git clone https://github.com/malte-linke/powercord-pradio.git`.
2. Restart discord to fetch missing plugins.

## Stream Support & Shoutcast Metadata Protocol

The plugin supports Shoutcast Metadata Protocol (ICY).</br>
This basically means, if your radio stations sends the song title, my plugin will display you the currently playing song.

### Supported Stream Types

| Type           | Description              | Support |
| -------------- | ------------------------ | :-----: |
| .mp3, .ogg ... | Any direct media stream. | ✔️      |
| .m3u / .m3u8   | Multimedia playlists.    | ❌      |

## Release History

* 1.2.8
    * I forgot the changes since 1.1.0...
* 1.1.0
    * Added song modal. Now you can see the currently playing song.
* 1.0.0
    * First release

## Meta

Malte Linke – [Parzival#9999](https://discord.com/users/249877580180750336)

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/malte-linke](https://github.com/malte-linke)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[version-image]: https://img.shields.io/github/manifest-json/v/malte-linke/powercord-pradio?style=flat-square
[license-image]: https://img.shields.io/github/license/malte-linke/powercord-pradio?style=flat-square
[size-image]: https://img.shields.io/github/repo-size/malte-linke/powercord-pradio?label=size&style=flat-square
[demo-image]: https://i.imgur.com/Np3nmyJ.png

## Other Plugins

Check out my other plugins for [Powercord](https://powercord.dev/plugins/):

  - [BeatRPC](https://github.com/malte-linke/powercord-beatrpc) - A more detailed Beat Saber RPC
  - [PRadio](https://github.com/malte-linke/powercord-pradio) - Stream radio in Discord
  - [PSpectrum](https://github.com/malte-linke/powercord-pspectrum) - Audio visualizer for Discord