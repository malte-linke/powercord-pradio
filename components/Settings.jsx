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
        maxValue={25}
        defaultValue={10}
        initialValue={getSetting("stream_volume", 10)}
        markers={[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
        ]}
        stickToMarkers={true}
        onValueChange={(value) => updateSetting("stream_volume", value)}
      >
        Playback Volume
      </SliderInput>

      <Category
        name="Modal Settings"
        description="This settings only apply ifyou are using the modal feature."
        disabled={getSetting("modalSettings", false)}
        opened={getSetting("modalSettings", false)}
        onChange={() =>
          updateSetting(
            "modalSettings",
            !getSetting("modalSettings", false)
          )
        }
      >
        <SwitchItem
          note="Should PRadio display a custom modal above your usermodal?"
          value={getSetting("modal", false)}
          onChange={() => updateSetting("modal", !getSetting("modal", false))}
        >
          Display Modal
        </SwitchItem>

        <TextInput
          note="I am currently working on a way to automaticall fetch the album cover. In the mean time, you can set an image url here to display whatever you want."
          require={true}
          defaultValue={getSetting("modal_image", "https://cdn.discordapp.com/avatars/861202961827758081/0515b91b544c7fd212e62199e459260e.png?size=1024")}
          onChange={(value) => updateSetting("modal_image", value)}
        >
          Temporary: Custom Modal Image
        </TextInput>
      </Category>
    </div>
  );
};

module.exports = Settings;
