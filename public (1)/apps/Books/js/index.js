const select = document.getElementById("select");
const reader = document.getElementById("reader");
const btns = document.getElementById("btns");
const gotoDiv = document.getElementById("goto");
const pageNum = document.getElementById("pageNum");
const confirmBtn = document.getElementById("confirmBtn");
var pageNum1;
var pageNum2;
var prevElem;
var nextElem;
var active = false;
var id = 0;
var page = 1;
const books = [
  {
    title: "Book with no title yet",
    content: [
      `<div class=\\"text-center\\" style=\\"font-family:Pacifico\\"><h1>Book with no title yet</h1>Hannah</div>`,
      `<h2>
        Chapter 1
      </h2>
      <p>
        Amy Williams was an ordinary young girl. She lived in her house with her mom and dad. Her mom was taking her shopping. "I don't want to go shopping," said Amy. It was a rainy day, and Amy did not like the rain. They got to the store, and got out of the car. There was a lot of yelling. It seemed that the people outside of the store were arguing about something. "Lets go to the store another day," said Mom. They went home and turned on the TV. There was the news that a scientist had found out that the world was only a simulation. "Oh dear!" exclaimed Mom.
      </p>`,
      "Someone discovers that we are all actually robots — who created us and why?"
    ],
    author: "Hannah"
  },
  {
    title: "My Life as a Drop of Water",
    content: [
      `<div class=\\"text-center\\"><h1>My Life as a Drop of Water</h1>Brandon</div>`,
      `\tI am a drop of water and I live in the ocean. One day, I started to feel very hot. Then I started to dissapear!
  I floated up and up and up. Finally, I reached the clouds. I floated along for a while, and grew. Then I grew
  some more. And more. And more! Then when i had gotten big enough, i fell right out of that cloud! I was so
  suprised. "Weeeeee," I said, as i fell. Then I hit the ground. "Ouch!" i exclaimed. Then i started to flow down
  the hill. I went into a river, and got sucked into a pipe! I went in the pipe for a while.
  \t"This is boring," i said to another drop next to me.
  \t"I know, right," it said.
  \t"Do you want to play a game?" i asked it.
  \t"Sure."
  \t"What game?"
  \t"Do <i>you</i> have any ideas?" it questioned.
  \t"We could play tag."
  \t"Ok."
  \tFor the next few hours, we played tag. Then we eventually got to a house and went up through the sink.
  "Aaaaah!" i shouted, "It's bright!" Clonk. I hit the bottom of the cup. "This water looks bad, i don't think that i
  will drink it," says a very loud voice. Then i feel the cup tipping. Splash! I am going down the sink drain! Glug
  glug glug. After a few hours, I got to a water treatment plant. I then got piped out into a river. "This has been
  fun," I said as I started to go into the ground, "But i have to leave you now."
  \tAfter I had gone into the ground I knew that I was not going to come out for a long time.
  This is where i will leave you. Currently, I am probably floating around in a aquifer somewhere.`
    ],
    author: "Brandon"
  }
];
var options = Parse2.parse2DefaultOptions;
options.lineSpacing = 1;
options.tabSize = 4;
function updatePage() {
  reader.innerHTML = `<div class="page" id="page1">
       ${Parse2.parse2(books[id].content[page - 1] || "", options)}
     </div>
     <div class="page" id="page2">
       ${Parse2.parse2(books[id].content[page] || "", options)}
     </div>`;
  pageNum1.innerHTML = page;
  pageNum2.innerHTML = page + 1;
  localStorage.setItem(`books:page/${id}`, page);
}
function go(e) {
  id = select.options[select.options.selectedIndex].id;
  select.style.display = "none";
  document.getElementById("go").style.display = "none";
  reader.style.display = "block";
  document.getElementById("btns").style.display = "block";
  page = parseInt(localStorage.getItem(`books:page/${id}`)) || 1;
  document.getElementById("pageNum").max = books[id].content.length;
  updatePage();
  active = true;
}
function next() {
  if (page < books[id].content.length - 1) {
    page += 2;
    updatePage();
  }
}
function prev() {
  if (page > 2) {
    page -= 2;
    updatePage();
  }
}
books.forEach((book, i) => {
  select.innerHTML += `<option id="${i}">${book.title} by ${book.author}</option>`;
});
btns.innerHTML = `<div class="pageNums" id="pageNum1">1</div>
       <div class="pageNums" id="pageNum2">2</div>
       <button class="nav" id="prev" onclick="prev();">&lt;- Prev</button>
       <button id="back" onclick="location.reload();">Back</button>
       <button class="nav" id="next" onclick="next();">Next -></button>`;
pageNum1 = document.getElementById("pageNum1");
pageNum2 = document.getElementById("pageNum2");
prevElem = document.getElementById("prev");
nextElem = document.getElementById("next");
// go();
// page = 2;
// updatePage();
document.getElementById("go").addEventListener("click", go);
document.addEventListener("keydown", (e) => {
  if (active) {
    if (e.altKey && e.key == "g") {
      gotoDiv.showModal();
    } else if (e.key == "ArrowLeft" || e.key == "ArrowUp" || (e.shiftKey && e.key == " ")) {
      prev();
    } else if (e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == " ") {
      next();
    }
  }
});
pageNum.addEventListener("change", (e) => {
  confirmBtn.value = pageNum.value;
});
gotoDiv.addEventListener("close", () => {
  if (gotoDiv.returnValue != "default" && parseInt(gotoDiv.returnValue) % 2 == 1) {
    page = parseInt(gotoDiv.returnValue);
    updatePage();
  }
  pageNum.value = "";
});
// go();
