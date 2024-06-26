function callDelete() {
    if (input.value == "") {
        errorM.innerHTML = "You must enter a value.";
        errorM.classList.add("shake");
        setTimeout(function () {
            errorM.innerHTML = "";
            errorM.classList.remove("shake");
        }, 1000);
        return;
    }
    let val = parseInt(input.value);
    if (!Search(val, root)) {
        errorM.innerHTML = "Node not found :(";
        errorM.classList.add("shake");
        setTimeout(function () {
            errorM.innerHTML = "";
            errorM.classList.remove("shake");
        }, 1000);

        transcript.innerHTML = " ";
        return;
    } else {
        transcript.innerHTML = " ";
    }
    root = Delete(val, root);
    setTimeout(function () {
        Reallocate(root, graph.clientWidth / 2, rootTopPosition);
        mainColor(root);
    }, time);
}
function Delete(val, node) {
    if (!node) {
        return node;
    }
    if (val < node.n.innerHTML) {
        node.left = Delete(val, node.left);
    } else if (val > node.n.innerHTML) {
        node.right = Delete(val, node.right);
    } else if (val == node.n.innerHTML) {
        if (!node.left) {
            var temp = node;
            node = node.right;
            graph.removeChild(temp.n);
            graph.removeChild(temp.heightElem);
            if (node) {
                graph.removeChild(temp.liner);
            }
            temp = null;
            return node;
        } else if (!node.right) {
            var temp = node;
            node = node.left;
            graph.removeChild(temp.n);
            graph.removeChild(temp.heightElem);
            graph.removeChild(temp.linel);
            temp = null;
            return node;
        } else {
            var temp = mostLeft(node.right);
            node.n.innerHTML = temp.n.innerHTML;
            node.right = Delete(parseInt(temp.n.innerHTML), node.right);
        }
        setTimeout(function () {
            Reallocate(root, graph.clientWidth / 2, rootTopPosition);
            mainColor(root);
        }, time);
    }
    if (node) {
        node.h = 1 + Math.max(Height(node.left), Height(node.right));
        node.heightElem.innerHTML = node.h; // Update height value

        var balance = GetBalance(node);

        if (balance > 1 && GetBalance(node.left) >= 0) {
            return rotateToRight(node);
        }

        if (balance < -1 && GetBalance(node.right) <= 0) {
            return rotateToLeft(node);
        }

        if (balance > 1 && GetBalance(node.left) < 0) {
            node.left = rotateToLeft(node.left);
            return rotateToRight(node);
        }

        if (balance < -1 && GetBalance(node.right) > 0) {
            node.right = rotateToRight(node.right);
            return rotateToLeft(node);
        }
    }

    return node;
}
