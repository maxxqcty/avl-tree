function Add() {
    if (input.value == "") {
        errorM.innerHTML = "You must enter a value.";
        errorM.classList.add("shake");
        setTimeout(function () {
            errorM.innerHTML = "";
            errorM.classList.remove("shake");
        }, 1000); // Adjust the delay (in milliseconds) as needed

        return;
    }
    if (!root) {
        root = new Node(
            parseInt(input.value),
            graph.clientWidth / 2, // Centered horizontally
            rootTopPosition
        );
    } else {
        root = insert(
            parseInt(input.value),
            root,
            graph.clientWidth / 2, // Centered horizontally
            root.node.top + 100 // Ensure nodes are added below the root
        );
    }
    setTimeout(function () {
        Reallocate(root, graph.clientWidth / 2, rootTopPosition);
        mainColor(root);
    }, time);
}

function insert(val, node, x, y) {



    
    if (!node) {
        return new Node(val, x, y);
    }
    if (val < node.n.innerHTML) {
        node.n.classList.add("visited");
        node.left = insert(
            val,
            node.left,
            parseInt(node.node.left) - 50,
            parseInt(node.node.top) + 50
        );
    } else if (val > node.n.innerHTML) {
        node.n.classList.add("visited");
        node.right = insert(
            val,
            node.right,
            parseInt(node.node.left) + 50,
            parseInt(node.node.top) + 50
        );
    } else {
        // Node already exists
        errorM.innerHTML = "Node already exists.";
        node.n.classList.add("exist");
        errorM.classList.add("shake");
        setTimeout(function () {
            errorM.innerHTML = "";
            node.n.classList.remove("exist");
            errorM.classList.remove("shake");
        }, 1000); // Adjust the delay (in milliseconds) as needed
        return node;
    }
    node.h = 1 + Math.max(Height(node.left), Height(node.right));

    var balance = GetBalance(node);

    if (balance > 1 && val < node.left.n.innerHTML) {
        return rotateToRight(node);
    }

    if (balance < -1 && val > node.right.n.innerHTML) {
        return rotateToLeft(node);
    }

    if (balance > 1 && val > node.left.n.innerHTML) {
        node.left = rotateToLeft(node.left);
        return rotateToRight(node);
    }

    if (balance < -1 && val < node.right.n.innerHTML) {
        node.right = rotateToRight(node.right);
        return rotateToLeft(node);
    }

    return node;
}
