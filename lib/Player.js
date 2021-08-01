const IceCastParser = require('../node_modules/icecast-parser/dist/Parser.js').Parser;
const Cover = require('./Cover.js');

module.exports = class StreamPlayer {

  constructor(plugin) {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.crossOrigin = 'anonymous';
    this.plugin = plugin;
    this.cover = new Cover(plugin);

    // play if url already set
    let url = plugin.settings.get('stream_url', '');
    if (url !== "") this.play(url);

    // set volume if set in settings
    let volume = plugin.settings.get('stream_volume', 50);
    this.setVolume(volume);
    
    // check if modal is en/disabled
    let modal = plugin.settings.get("modal", false);
    if (modal) this.cover.inject();

    let muted = plugin.settings.get('muted', false) && plugin.settings.get("modal", false);
    if (modal) this.cover.onMuteChanged(m => muted = m);

    // creates an settings update interval
    let lastImage = "", wasCoverEnabled = plugin.settings.get("modal", false);
    this.usettings = setInterval(() => {
      // check if url has changed
      let url = plugin.settings.get('stream_url', '');
      if (this.audio.src !== url && url !== '') this.play(url);

      // check if image has changed
      let image = plugin.settings.get('modal_image', 'https://cdn.discordapp.com/avatars/861202961827758081/0515b91b544c7fd212e62199e459260e.png?size=1024');
      if (image !== lastImage) this.cover.setImg(image);

      // check if modal was en/disabled
      let modal = plugin.settings.get("modal", false);
      if (modal != wasCoverEnabled) {
        if (modal) this.cover.inject();
        else this.cover.uninject();
        wasCoverEnabled = modal;
        console.log(`MODAL: ${modal}`);
      }

      //check if volume has changed
      let volume = plugin.settings.get('stream_volume', 50);
      if (this.audio.volume !== volume && !muted) this.setVolume(volume);
      else if (muted && modal) this.setVolume(0);
    }, 250);
  }

  play(url = null) {
    if (url) {
      this.audio.src = url;

      // remove all listeners on old parser if a new url is set
      if (this.parser) this.parser.removeAllListeners();
      this.createMetaParser(url);
    }
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  // sets the volume of the audio from 0 to 100
  setVolume(volume) {
    this.audio.volume = volume / 100;
  }

  destroy() {
    this.audio.remove();
    clearInterval(this.usettings);
    
    this.parser.removeAllListeners()
    this.cover.uninject();
  }

  createMetaParser(url) {
    
    // creates a new icecast parser
    this.parser = new IceCastParser({
      autoUpdate: true,
      emptyInterval: 5 * 60,
      errorInterval: 10 * 60,
      keepListening: false,
      metadataInterval: 5,
      notifyOnChangeOnly: false,
      url: url,
      useragent: 'PRadio Powercord Plugin',
    });

    // handle song
    this.parser.on('metadata', (metadata) => {
      let streamTitle = metadata.get("StreamTitle");

      if (streamTitle.includes(" - ")) {
        // expected format: Author - Title

        let [ artist, title ] = streamTitle.split(' - ');
        this.cover.setArtist(artist);
        this.cover.setTitle(title);
      } else {
        // unexpected format
        this.cover.setArtist("");
        this.cover.setTitle(streamTitle);
      }
    });
  }
}