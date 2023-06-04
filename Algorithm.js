import { Wheel } from "./Icons";

export function bfs(se, rc) {
  let s = [];
  let arr  =  []
  let direction = ["left","right","top","down"]
  s.push(se[0]);
  let rl = rc.length;
  let cl = rc[0].childNodes.length;
  rc[se[0][0]].childNodes[se[0][1]].classList.add("visited");
  
  let path = new Map();
  let t = [];
  t.push(se[1]);

  function findpath() {
    let size = s.length;
    while (size--) {
      let [r, c] = s.pop();
      let dirx = [0, 0, -1, 1];
      let diry = [-1, 1, 0, 0];

      for (let i = 0; i < 4; i++) {
        let x = r + dirx[i];
        let y = c + diry[i];
        if (x < 0 || y < 0 || x >= rl || y >= cl) continue;
        if (x === se[1][0] && y === se[1][1]) {
          path.set(`${x}:${y}`, [r, c,direction[i]]);
          animatepath(rc, t, path);
          console.log(arr)
          return;
        }
        if (!rc[x].childNodes[y].classList.contains("visited")) {
          rc[x].childNodes[y].classList.add("visited");
          s.unshift([x, y]);
          path.set(`${x}:${y}`, [r, c,direction[i]]);
        }
      }
      if (se[0][0] === r && se[0][1] === c) continue
      rc[r].childNodes[c].style.background = "#43f38a";
    }

    setTimeout(() => {
      findpath()
    },500)
  }
  findpath();

  function animatepath() {
    let [a, b] = t.pop();
    let builder = path.has(`${a}:${b}`);
    if (!builder) {
      return
    };
    let [x, y,handle] = path.get(`${a}:${b}`);
    arr.push([a,b,handle])
    if (x === se[0][0] && y === se[0][1]) return;
    t.push([x, y]);
    rc[x].childNodes[y].style.background = "#40CEE3";
    animatepath();
  }
}
