
module.exports = class StreamPlayer {

  constructor(plugin) {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.plugin = plugin;

    // play if url already set
    let url = plugin.settings.get('stream_url', '');
    if (url !== "") this.play(url);

    // set volume if set in settings
    let volume = plugin.settings.get('stream_volume', 50);
    this.setVolume(volume);

    // creates an settings update interval
    this.usettings = setInterval(() => {
      // check if url has changed
      let url = plugin.settings.get('stream_url', '');
      if (this.audio.src !== url && url !== '') this.play(url);

      //check if volume has changed
      let volume = plugin.settings.get('stream_volume', 50);
      if (this.audio.volume !== volume) this.setVolume(volume);
    }, 250);
  }

  play(url = null) {
    if (url) {
      this.audio.src = url;
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
  }
}