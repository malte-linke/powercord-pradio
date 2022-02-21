module.exports = class Cover {

  constructor(plugin) {

    // create element structure
    //#region I am sorry... I know... I am lazy
    this.muted = plugin.settings.get('muted', false);
    this.plugin = plugin;

    this.container = document.createElement('div');
    this.container.setAttribute("id", 'pradio-modal');
    let sub = document.createElement("div");
    sub.classList.add('container-YkUktl');
    let avatarWrapper = document.createElement("div");
    avatarWrapper.classList.add('avatarWrapper-1B9FTW');
    this.image = document.createElement("img");
    this.image.classList.add('avatar-1EWyVD', 'pradio-cover');
    let nametag = document.createElement("div");
    nametag.classList.add('nameTag-sc-gpq');
    nametag.setAttribute("role", "button");
    nametag.setAttribute("tabindex", "0");
    let nametagSub = document.createElement("div");
    nametagSub.classList.add('colorStandard-21JIj7', 'size14-3fJ-ot', 'pradio-title');
    this.title = document.createElement("div");
    this.title.classList.add('size14-3fJ-ot', 'title-338goq');
    this.artist = document.createElement("div");
    this.artist.classList.add('size12-oc4dx4', 'subtext-2HDqJ7', 'pradio-artist');
    let muteContainer = document.createElement("div");
    muteContainer.classList.add("flex-2S1XBF", "flex-3BkGQD", "horizontal-112GEH", "horizontal-1Piu5-", "flex-3BkGQD", "directionRow-2Iu2A9", "justifyStart-2Mwniq", "alignStretch-Uwowzr", "noWrap-hBpHBz");
    muteContainer.setAttribute("style", "flex: 0 1 auto");
    this.muteButton = document.createElement("button");
    this.muteButton.classList.add("button-12Fmur", "enabled-9OeuTA", "button-f2h6uQ", "lookBlank-21BCro", "colorBrand-I6CyqQ", "grow-2sR_-F");
    muteContainer.appendChild(this.muteButton);
    let muteIconContainer = document.createElement("div");
    muteIconContainer.classList.add("contents-3ca1mk");
    this.muteButton.appendChild(muteIconContainer);
    muteIconContainer.innerHTML = `<svg id="pradio-mute-button" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z" aria-hidden="true"></path></svg>`;

    avatarWrapper.appendChild(this.image);
    sub.appendChild(avatarWrapper);
    nametagSub.appendChild(this.title);
    nametag.appendChild(nametagSub);
    nametag.appendChild(this.artist);
    sub.appendChild(nametag);
    sub.appendChild(muteContainer);
    this.container.appendChild(sub);


    this.image.setAttribute("width", "32");
    this.image.setAttribute("height", "32");
    this.image.setAttribute("style", "border-radius: 50%");

    //#endregion
  }

  onMuteChanged(callback) {
    this.muteCallback = callback;
  }

  setImg(src) {
    this.image.src = src;
  }

  setTitle(title) {
    this.title.innerText = title;
  }

  setArtist(artist) {
    this.artist.innerText = artist;
  }

  inject() {
    let parent = document.querySelector(`section.panels-3wFtMD`);

    parent.insertBefore(this.container, parent.lastChild)


    // verify injection
    let injectionValid = () => document.querySelector(`div#pradio-modal`) != null;

    let handle = () => {
      if (!injectionValid()) {
        try { this.inject(); } catch (e) { console.log(e); }
        console.log(`%c[PRadio]`, `color:yellow;`, `Injecting cover...`);
      }


      let svg = document.querySelector(`svg#pradio-mute-button`);
      if (!this.muted) {
        svg.classList.remove("strikethrough-2Kl6HF");
      } else {
        svg.classList.add("strikethrough-2Kl6HF");
      }


      // mute button event
      this.muteButton.onclick = () => {
        this.muted = !this.muted;

        let svg = document.querySelector(`svg#pradio-mute-button`);
        if (!this.muted) {
          svg.classList.remove("strikethrough-2Kl6HF");
        } else {
          svg.classList.add("strikethrough-2Kl6HF");
        }

        if (this.muteCallback) this.muteCallback(this.muted);
        this.plugin.settings.set('muted', this.muted);
      };

    };

    handle();

    document.addEventListener("readystatechange", () => {
      if (document.readyState == "complete") handle();
    });
  }

  uninject() {
    let parent = document.querySelector(`section.panels-3wFtMD`);
    let container = document.querySelector(`div#pradio-modal`);
    try { parent.removeChild(container); } catch (e) { console.log(`%c[PRadio/Warn]`, `color:orange;`, `Failed to remove child! This error might be okay.`); }
    //this.container.remove();
  }

}