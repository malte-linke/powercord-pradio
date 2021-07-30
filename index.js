const { Plugin } = require("powercord/entities");
const { inject, uninject } = require('./lib/Injector');
const { name } = require("./manifest.json");

module.exports = class PRadio extends (Plugin) {

  startPlugin() {
    // register settings
    powercord.api.settings.registerSettings('pradio', {
      category: this.entityID,
      label: name,
      render: require("./components/Settings"),
    });


    // injects the plugin
    inject(this);
  }

  pluginWillUnload() {
    // unregister settings tab
    powercord.api.settings.unregisterSettings('pradio');

    // uninjects the plugin
    uninject();
  }
};
