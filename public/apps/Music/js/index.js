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
    .then(function (data) { return data.json(); })
    .then(function (data1) {
    songs = data1;
    for (var id in songs) {
        if (Object.prototype.hasOwnProperty.call(songs, id)) {
            var data = songs[id];
            songsElem.innerHTML += "<div class=\"song col-3\">\n                                  <div>\n                                    ".concat(data.title, "\n                                    <hr>\n                                  </div>\n                                  <div class=\"composer\">\n                                    ").concat(data.composer, "\n                                  </div>\n                                  <button id=\"download-").concat(id, "\" class=\"download\">Download</button>\n                                </div>");
        }
    }
    // @ts-ignore
    downloadBtns = document.getElementsByClassName('download');
    var _loop_1 = function (i) {
        var btn = downloadBtns[i];
        btn.addEventListener('click', function (e) {
            download(songs[btn.id.split('-')[1]], e);
        });
    };
    for (var i = 0; i < downloadBtns.length; i++) {
        _loop_1(i);
    }
});
Object.defineProperty(String.prototype, 'forEach', {
    value: function (callback) {
        if (this) {
            for (var i = 0; i < this.length; i++) {
                var result = callback(this[i], i, this);
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
