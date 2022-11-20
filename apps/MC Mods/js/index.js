const list = document.getElementById('mods');
list.id = "mod-list";
for (const key in mods) {
  if (Object.hasOwnProperty.call(mods, key)) {
    const element = mods[key];
    list.innerHTML +=
      `<div class="mod">
        <img src="${element.image}">
        <div>
          ${element.title}:<br>
          <a href="mods/${key}/${key}.jar">Download</a>
        </div>
      </div>`;
  }
}