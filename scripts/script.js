let showDebug = false;

function getChapter(chapter, state) {
  let printState = {...state};
  delete printState["section"];
  delete printState["ifWasFalse"];

  const chapterBody = data[chapter];

  if (showDebug) {
    return "Chapter " + chapter + "\n" + JSON.stringify(printState) + chapterBody;
  }

  return chapterBody;
}

function set(op, raw_lval, raw_rval) {
  let lval = parseInt(raw_lval);
  let rval = parseInt(raw_rval);
  switch (op) {
    case "+": return lval + rval;
    case "-": return lval - rval;
    case "=": return rval;
  }
}

function calc(op, raw_lval, raw_rval) {
  let lval = parseInt(raw_lval);
  let rval = parseInt(raw_rval);
  switch (op) {
    case ">": return lval > rval;
    case "<": return lval < rval;
    case "=": return lval == rval;
  }
}

function parseAction(action, argument, state, ifWasFalse = false) {
  let effects = {
    "ifWasFalse": false,
  };

  switch (action[0]) {
    case "goto": {
        effects["section"] = action.slice(1).join(" ").trim();
      } break;
    case "set": {
        const prop = action[1];
        const op = action[2];
        const val = action[3];
        state[prop] = set(op, state[prop], val);
      } break;
    case "if": {
        const prop = action[1];
        const op = action[2];
        const val = action[3];
        if (calc(op, state[prop], val)) {
          effects = parseAction(argument, null, state);
        } else {
          effects["ifWasFalse"] = true;
        }
      } break;
    case "else": {
        if (ifWasFalse) {
          effects = parseAction(argument, null, state);
        }
      } break;
  }

  return effects;
}

function parseBranch(branch, state) {
  let effects = {
    "ifWasFalse": false,
  };

  let actions = branch.split(";").map(str => str.trim());
  for (let raw_action of actions) {
    let [action, ...follow] = raw_action.split(":").map(str => str.trim());
    action = action.split(" ").map(str => str.trim());

    let argument = null;
    if (follow.length > 0) {
      argument = follow[0].split(" ").map(str => str.trim());
    }

    effects = {...effects, ...parseAction(action, argument, state, effects["ifWasFalse"])};
  }

  return {...state, ...effects};
}

function parseModifiers(string) {
  let [modifiers_str, ...text_list] = string.split("]");
  let text = text_list.join("]");
  let modifiers = modifiers_str.slice(1).split(",").map(str => str.trim());

  if (text == "" || (modifiers_str.length > 0 && modifiers_str[0] != "[")) {
    return [string, ""];
  }

  return [text, modifiers];
}

function applyModifiers(element, modifiers) {
  for (const modifier of modifiers) {
    switch (modifier) {
      case "center":
        element.align = "center";
        break;
    }
  }
}

function updateStats(state) {
  let displayState = {...state};
  if (!showDebug) {
    delete displayState["section"];
    delete displayState["ifWasFalse"];
  }

  let stats = document.getElementById("stats");
  stats.innerHTML = "";
  for (const key in displayState) {
    stats.innerHTML += key + " : " + displayState[key] + "<br>";
  }
}

function loadChapter(state) {
  updateStats(state);

  const chapter = state.section;

  let book = document.getElementById("book");
  book.innerHTML = "";

  let lines = getChapter(chapter, state);

  let inputState = "body";
  for (let line of lines.split("\n")) {
    line = line.trim();
    switch (inputState) {
      case "body":
        if (line.startsWith("#")) {
          const [text, modifiers] = parseModifiers(line.slice(1));
          let header = document.createElement("h1");
          header.innerHTML = text;
          applyModifiers(header, modifiers);
          book.appendChild(header);
        } else if (line.startsWith("@[")) {
          const [text, modifiers] = parseModifiers(line.slice(1));
          let paragraph = document.createElement("p");
          paragraph.innerHTML = text;
          applyModifiers(paragraph, modifiers);
          book.appendChild(paragraph);
        } else if (line == "[CHOICES]") {
          inputState = "branches";
          let divider = document.createElement("hr");
          divider.classList.add("divider");
          book.appendChild(divider);
        } else {
          let paragraph = document.createElement("p");
          paragraph.innerHTML = line;
          book.appendChild(paragraph);
        }
        break;
      case "branches": {
          const [buttonText, branch] = line.split("->").map(str => str.trim());
          if (branch == undefined) break;
          const [branchAction, _branchComment] = branch.split("#").map(str => str.trim());
          let newState = parseBranch(branchAction, {...state});
          
          let button = document.createElement("a");
          button.innerHTML = buttonText;
          button.classList.add("branch");
          button.href = "javascript:void(0)";
          button.onclick = function() {
            loadChapter(newState);
          };
          book.appendChild(button);
        }
        break;
    }
  }
}

loadChapter({"section": "Title", "Eleni_relation": 0, "Jia_relation": 0});

function showStats() {
  let stats = document.getElementById("stats");
  if (stats.style.display == "none") {
    stats.style.display = "block";
  } else {
    stats.style.display = "none";
  }
}
