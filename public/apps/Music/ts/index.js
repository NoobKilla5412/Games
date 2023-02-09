"use strict";
var songs;
var downloadBtns;
var ownedSongs = {
    // @ts-ignore
    _value: JSON.parse(localStorage.getItem('music:ownedSongs')) || {},
    set value(setValue) {
        this._value = setValue;
        localStorage.setItem('music:ownedSongs', typeof setValue == 'object' ? JSON.stringify(setValue) : setValue);
    }
};
// @ts-ignore
var songsElem = document.getElementById('songs');
function download(song, e) {
    console.log(song);
    ownedSongs.value[song.id] = true;
}
fetch('json/songs.json')
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
    // @ts-ignore
    downloadBtns = document.getElementsByClassName('download');
    for (let i = 0; i < downloadBtns.length; i++) {
        const btn = downloadBtns[i];
        btn.addEventListener('click', (e) => {
            download(songs[btn.id.split('-')[1]], e);
        });
    }
});
Object.defineProperty(String.prototype, 'forEach', {
    value(callback) {
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
