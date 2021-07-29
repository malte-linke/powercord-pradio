var player;

// trys to inject the plugin into discord
function inject(plugin, success = null, error = null) {
  
  // create player
  player = new (require('./Player'))(plugin);

}

// uninjects the plugin from discord
function uninject() {

  // stop audio
  player.stop();
  player.destroy();
}



module.exports = { inject, uninject }