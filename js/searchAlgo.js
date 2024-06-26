function callSearch() {
    if (input.value == "") {
        errorM.innerHTML = "You must enter a value.";
        errorM.classList.add("shake");
        setTimeout(function () {
            errorM.innerHTML = "";
            errorM.classList.remove("shake");
        }, 1000);
        return;
    }
    transcript.innerHTML = "PATH: "; // Reset transcript display
    let found = Search(parseInt(input.value), root, "ROOT");
    if (!found) {
        errorM.innerHTML = "Node not found :(";
        errorM.classList.add("shake");
        setTimeout(function () {
            errorM.innerHTML = "";
            errorM.classList.remove("shake");
        }, 1000);
    }
    setTimeout(function () {
        mainColor(root);
    }, 3 * time);
}

function Search(val, node, path) {
    if (!node) {
        transcript.innerHTML = "Node not found.";
        return false;
    }

    let tempPath = `${path} [${node.n.innerHTML}] >> `;

    transcript.innerHTML += tempPath;

    if (node.n.innerHTML == val) {
        node.n.classList.add("found");
        transcript.innerHTML = transcript.innerHTML.slice(0, -9); // Remove the trailing ">>"
        return true;
    } else if (node.n.innerHTML < val) {
        node.n.classList.add("visited");
        let found = Search(val, node.right, "RIGHT");
        if (!found) {
            node.n.classList.remove("visited");
        }
        return found;
    } else if (node.n.innerHTML > val) {
        node.n.classList.add("visited");
        let found = Search(val, node.left, "LEFT");
        if (!found) {
            node.n.classList.remove("visited");
        }
        return found;
    }
}
