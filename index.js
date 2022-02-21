const { Plugin } = require("powercord/entities");
const { inject, uninject } = require('./lib/Injector');
const { name } = require("./manifest.json");
const { waitFor } = require('powercord/util');

module.exports = class PRadio extends (Plugin) {

  startPlugin() {
    // register settings
    powercord.api.settings.registerSettings('pradio', {
      category: this.entityID,
      label: name,
      render: require("./components/Settings"),
    });

    
    // I think this will fix some things
    waitFor(`section.panels-3wFtMD`).then(() => {
      
      // injects the plugin
      inject(this);

    });
  }

  pluginWillUnload() {
    // unregister settings tab
    powercord.api.settings.unregisterSettings('pradio');

    // uninjects the plugin
    uninject();
  }
};
