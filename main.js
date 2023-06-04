import { bfs } from "./Algorithm";
import { resetBoard } from "./Board";
import { StartPoint, Target } from "./Icons";

const row = document.querySelector(".row");
const btn = document.querySelector("._btn");
const resetBtn = document.querySelector(".reset");
let iconsp;
let _rowChild;

let startend = [];

window.onload = () => {
  _rowChild = resetBoard(row, _rowChild, startend,iconsp);
};

btn.addEventListener("click", () => {
  bfs(startend, _rowChild);
});

resetBtn.addEventListener("click", () => {
  _rowChild = resetBoard(row, _rowChild, startend);
});

function dfs() {
  let s = [];
  s.push(startend[0]);
  let rl = _rowChild.length;
  let cl = _rowChild[0].childNodes.length;
  _rowChild[startend[0][0]].childNodes[startend[0][1]].classList.add("visited");

  let path = new Map();

  function findpath() {
    let [r, c] = s.pop();

    let dirx = [0, 0, -1, 1];
    let diry = [-1, 1, 0, 0];

    for (let i = 0; i < 4; i++) {
      let x = r + dirx[i];
      let y = c + diry[i];
      if (x < 0 || y < 0 || x >= rl || y >= cl) continue;
      if (x === startend[1][0] && y === startend[1][1]) {
        path.set(`${x}:${y}`, [r, c]);
        animatepath();
        return;
      }
      if (!_rowChild[x].childNodes[y].classList.contains("visited")) {
        _rowChild[x].childNodes[y].classList.add("visited");
        s.push([x, y]);
        path.set(`${x}:${y}`, [r, c]);
      }
    }
    _rowChild[r].childNodes[c].style.background = "rgba(0, 225, 0, 0.9)";
    requestAnimationFrame(findpath);
  }
  findpath();

  let t = [];
  t.push(startend[1]);

  function animatepath() {
    let [a, b] = t.pop();
    let builder = path.has(`${a}:${b}`);
    if (!builder) {
      return;
    }

    let [x, y] = path.get(`${a}:${b}`);
    t.push([x, y]);
    _rowChild[x].childNodes[y].style.background = "purple";
    requestAnimationFrame(animatepath);
  }
}
