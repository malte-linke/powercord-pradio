const { React } = require("powercord/webpack");
const {
  Category,
  SliderInput,
  SwitchItem,
  ColorPickerInput,
  TextInput,
} = require("powercord/components/settings");

const Settings = ({ getSetting, updateSetting }) => {
  return (
    <div>
      <TextInput
        note="Your radio station url. This is the url that the audio stream will be played from."
        require={true}
        defaultValue={getSetting("stream_url", "")}
        onChange={(value) => updateSetting("stream_url", value)}
      >
        Radio Station
      </TextInput>

      <SliderInput
        note="Sets the playback volume"
        required={true}
        minValue={0}
        maxValue={100}
        defaultValue={50}
        initialValue={getSetting("stream_volume", 50)}
        markers={[
          0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
        ]}
        stickToMarkers={true}
        onValueChange={(value) => updateSetting("stream_volume", value)}
      >
        Playback Volume
      </SliderInput>

      <SwitchItem
        note="Should PRadio display a custom modal above your usermodal? THIS FEATURE IS COMING SOON"
        value={getSetting("modal", false)}
        onChange={() => updateSetting("modal", !getSetting("modal", false))}
      >
        Display Modal
      </SwitchItem>
    </div>
  );
};

module.exports = Settings;
