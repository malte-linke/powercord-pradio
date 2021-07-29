module.exports = class Cover {

  constructor(parent) {

    // create element structure
    //#region I am sorry... I know... I am lazy
    
    this.container = document.createElement('div');
    this.container.id = 'pradio-modal';
    let sub = document.createElement("div");
    sub.classList.add('container-3baos1');
    let avatarWrapper = document.createElement("div");
    avatarWrapper.classList.add('avatarWrapper-2yR4wp');
    this.image = document.createElement("img");
    this.image.classList.add('avatar-SmRMf2','pradio-cover');
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
    avatarWrapper.appendChild(this.image);
    sub.appendChild(avatarWrapper);
    nametagSub.appendChild(this.title);
    nametag.appendChild(nametagSub);
    nametag.appendChild(this.artist);
    sub.appendChild(nametag);
    this.container.appendChild(sub);

    this.image.setAttribute("width", "32");
    this.image.setAttribute("height", "32");
    this.image.setAttribute("style", "border-radius: 50%");

    //#endregion

    let injectInterval = setInterval(() => {
      if (this.container.parentNode === null) {
        try { this.inject(); } catch (e) { console.log(e); }
      } else {
        
        clearInterval(injectInterval);
      }
    },500);
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
    document
      .querySelector(`section.panels-j1Uci_`)
      .insertBefore(this.container, document.querySelector(`div.container-3baos1`));
  }

}