module.exports = class Cover {

  constructor(plugin) {

    // create element structure
    //#region I am sorry... I know... I am lazy
    this.muted = plugin.settings.get('muted', false);
    this.plugin = plugin;

    this.container = document.createElement('div');
    this.container.setAttribute("id", 'pradio-modal');
    let sub = document.createElement("div");
    sub.classList.add('container-3baos1');
    let avatarWrapper = document.createElement("div");
    avatarWrapper.classList.add('avatarWrapper-2yR4wp');
    this.image = document.createElement("img");
    this.image.classList.add('avatar-SmRMf2', 'pradio-cover');
    let nametag = document.createElement("div");
    nametag.classList.add('nameTag-3uD-yy');
    nametag.setAttribute("role", "button");
    nametag.setAttribute("tabindex", "0");
    let nametagSub = document.createElement("div");
    nametagSub.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'pradio-title');
    this.title = document.createElement("div");
    this.title.classList.add('size14-e6ZScH', 'title-eS5yk3');
    this.artist = document.createElement("div");
    this.artist.classList.add('size12-3cLvbJ', 'subtext-3CDbHg', 'pradio-artist');
    let muteContainer = document.createElement("div");
    muteContainer.classList.add("flex-1xMQg5", "flex-1O1GKY", "horizontal-1ae9ci", "horizontal-2EEEnY", "flex-1O1GKY", "directionRow-3v3tfG", "justifyStart-2NDFzi", "alignStretch-DpGPf3", "noWrap-3jynv6");
    muteContainer.setAttribute("style", "flex: 0 1 auto");
    this.muteButton = document.createElement("button");
    this.muteButton.classList.add("button-14-BFJ", "enabled-2cQ-u7", "button-38aScr", "lookBlank-3eh9lL", "colorBrand-3pXr91", "grow-q77ONN");
    muteContainer.appendChild(this.muteButton);
    let muteIconContainer = document.createElement("div");
    muteIconContainer.classList.add("contents-18-Yxp");
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
    let parent = document.querySelector(`section.panels-j1Uci_`);

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
        svg.classList.remove("colorDanger-2qLCe1");
      } else {
        svg.classList.add("colorDanger-2qLCe1");
      }


      // mute button event
      this.muteButton.onclick = () => {
        this.muted = !this.muted;

        let svg = document.querySelector(`svg#pradio-mute-button`);
        if (!this.muted) {
          svg.classList.remove("colorDanger-2qLCe1");
        } else {
          svg.classList.add("colorDanger-2qLCe1");
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
    let parent = document.querySelector(`section.panels-j1Uci_`);
    let container = document.querySelector(`div#pradio-modal`);
    try { parent.removeChild(container); } catch (e) { console.log(`%c[PRadio/Warn]`, `color:orange;`, `Failed to remove child! This error might be okay.`); }
    //this.container.remove();
  }

}