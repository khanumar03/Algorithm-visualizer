import { StartPoint, Target, Wheel } from "./Icons";

export function resetBoard(row,_rowChild,startend,iconsp) {
    let H = Math.floor(window.innerHeight / 30);
    let W = Math.floor(window.innerWidth / 30);
  
    row.innerHTML = null
  
    for (let i = 0; i <= H; i++) {
      let newElemRow = document.createElement("span");
      newElemRow.className = "row_child";
      row.appendChild(newElemRow);
    }
    _rowChild = document.querySelectorAll(".row_child");
    _rowChild.forEach((child) => {
      for (let i = 0; i <= W; i++) {
        let newElemRow = document.createElement("span");
        newElemRow.className = "col";
        child.appendChild(newElemRow);
      }
    });
  
    let icr = Math.floor(_rowChild.length / 2);
    let icc = Math.floor(_rowChild[icr].childNodes.length / 2);
  
    let iconStartelement = document.createElement("div");
    iconStartelement.className = "icon";
    iconStartelement.innerHTML = `<span class="iconsvg">${StartPoint}</span>`;
    // -
    // let iconWheelelement = document.createElement("div");
    // iconWheelelement.className = "icon_w";
    // iconWheelelement.innerHTML = `<span class="iconsvg">${Wheel}</span>`;
  
    let iconTargetelement = document.createElement("div");
    iconTargetelement.className = "icon";
    iconTargetelement.innerHTML = `<span class="iconsvg">${Target}</span>`;
  
    _rowChild[icr].childNodes[Math.floor(icc / 2)].appendChild(iconStartelement);
    _rowChild[icr].childNodes[Math.floor(icc / 2)].classList.add("startp");

  
    startend.push([icr,Math.floor(icc / 2),0])
  
    _rowChild[icr].childNodes[Math.floor(icc / 2) + icc].appendChild(
      iconTargetelement
    );
    _rowChild[icr].childNodes[Math.floor(icc / 2) + icc].classList.add("endp");
  
    startend.push([icr,Math.floor(icc / 2) + icc])

    iconsp = document.querySelectorAll(".icon");

  let check = [];

  _rowChild.forEach((x,ir) => {
    x.childNodes.forEach((c,ic) => {
      c.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("startp")) {
          e.target.classList.remove("startp");
          check.push("startp");
          e.target.innerHTML = null;
          return;
        }
        e.target.classList.remove("endp");
        e.target.innerHTML = null;
      });
      c.addEventListener("mouseup", (e) => {
        
        if (check.pop() === "startp") {
          if(ir === startend[1][0] && ic === startend[1][1]) {
            const temp = _rowChild[startend[0][0]].childNodes[startend[0][1]]
            temp.appendChild(iconStartelement)
            temp.classList.add("startp")
            return
          }
          e.target.appendChild(iconStartelement);
          e.target.classList.add("startp");
          startend[0][0] = ir
          startend[0][1] = ic
          return;
        }
        if(ir === startend[0][0] && ic === startend[0][1]) {
          const temp = _rowChild[startend[1][0]].childNodes[startend[1][1]]
          temp.appendChild(iconTargetelement)
          temp.classList.add("endp")
          return
        }
        e.target.appendChild(iconTargetelement);
        e.target.classList.add("endp");
        startend[1][0] = ir
        startend[1][1] = ic
      });
    });
  });

    return _rowChild
  }