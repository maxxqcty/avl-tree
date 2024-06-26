function Height(node) {
    if (!node) {
        return 0; 
    }
    return node.h;
}

function GetBalance(node) {
    if (!node) {
        return 0;
    }
    return Height(node.left) - Height(node.right);
}

function rotateToRight(node) {
    var n = node.left;
    var nr = n.right;
    n.right = node;
    node.left = nr;
    node.h = 1 + Math.max(Height(node.left), Height(node.right));
    n.h = 1 + Math.max(Height(n.left), Height(n.right));
    return n;
}

function rotateToLeft(node) {
    var newP = node.right;
    var temp = newP.left;
    newP.left = node;
    node.right = temp;
    node.h = 1 + Math.max(Height(node.left), Height(node.right));
    newP.h = 1 + Math.max(Height(newP.left), Height(newP.right));
    return newP;
}

function Reallocate(node, x, y) {
    if (!node) return;
    var temp = Math.pow(2, node.h - 1) * 50;

    if (node.linel) {
        graph.removeChild(node.linel);
        node.linel = null;
    }
    if (node.liner) {
        graph.removeChild(node.liner);
        node.liner = null;
    }

    if (node.left) {
        node.linel = getLine(x, y, x - temp, y + 100, 1);
    }
    if (node.right) {
        node.liner = getLine(x, y, x + temp, y + 100, -1);
    }

    node.node.left = x + "px";
    node.node.top = y + "px";
    node.heightElem.style.top = y - 20 + "px";
    node.heightElem.style.left = x + 30 + "px"; // Adjust position to the right of the node
    node.heightElem.innerHTML = node.h; // Update height value

    Reallocate(node.left, x - temp, y + 100);
    Reallocate(node.right, x + temp, y + 100);
}

function mostLeft(node) {
    var cur = node;
    while (cur.left) {
        cur = cur.left;
    }
    return cur;
}

function setPosition(node, shifting) {
    if (!node) {
        return;
    }
    setPosition(node.left, shifting);
    setPosition(node.right, shifting);
    node.node.left = parseInt(node.node.left) + shifting + "px";
    if (node.linel) {
        node.linel.style.left =
            parseInt(node.linel.style.left) + shifting + "px";
    }
    if (node.liner) {
        node.liner.style.left =
            parseInt(node.liner.style.left) + shifting + "px";
    }
}
