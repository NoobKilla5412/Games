type Song = {
  title: string;
  id: string;
  link: string;
  composer: string;
};
var songs: {
  [x: string]: Song;
};
var downloadBtns: HTMLCollectionOf<HTMLButtonElement>;
var ownedSongs: {
  _value: { [x: string]: boolean };
  value: { [x: string]: boolean };
} = {
  _value: JSON.parse(localStorage.getItem("music:ownedSongs") || "{}") || {},
  set value(setValue: { [x: string]: boolean }) {
    this._value = setValue;
    localStorage.setItem("music:ownedSongs", typeof setValue == "object" ? JSON.stringify(setValue) : setValue);
  }
};
var songsElem = <HTMLDivElement>document.getElementById("songs")!;
function download(song: Song) {
  console.log(song);
  ownedSongs.value[song.id] = true;
}
fetch("json/songs.json")
  .then((data) => data.json())
  .then((data1) => {
    songs = data1;
    for (const id in songs) {
      if (Object.prototype.hasOwnProperty.call(songs, id)) {
        const data = songs[id];
        songsElem.innerHTML += `<div class="song col-3">
                                  <div>
                                    ${data.title}
                                    <hr>
                                  </div>
                                  <div class="composer">
                                    ${data.composer}
                                  </div>
                                  <button id="download-${id}" class="download">Download</button>
                                </div>`;
      }
    }
    downloadBtns = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("download");
    for (let i = 0; i < downloadBtns.length; i++) {
      const btn = downloadBtns[i];
      btn.addEventListener("click", () => {
        download(songs[btn.id.split("-")[1]]);
      });
    }
  });
Object.defineProperty(String.prototype, "forEach", {
  value(callback: (value: string, index: number, array: ThisType<any>) => any) {
    if (this) {
      for (let i = 0; i < this.length; i++) {
        const result = callback(this[i], i, this);
        if (result) {
          return result;
        }
      }
    }
    return void 0;
  }
});
// var newWindow = open('/', '_blank');
// console.log('newWindow: ', newWindow);
// setTimeout(() => {
//   newWindow!.location.href = 'https://mechnosense.org';
//   // newWindow!.document.body.innerHTML;
//   setTimeout(() => {
//     console.log('  newWindow!.document.body.innerHTML: ', newWindow!.document.body.innerHTML);
//   }, 5000);
// }, 1000);
// 'hi'.forEach((value: string) => {
//   console.log(value);
//   return false;
// });
// console.log(void 0);
// class Music {
//   private _track: string;
//   constructor() {
//     this._track = 'hi';
//   }
//   public set track(v: string) {
//     this._track = v;
//   }
// }
