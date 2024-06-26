
function Node(val, x, y) {
    this.left = null;
    this.right = null;
    this.h = 1; // Initial height of the node is 1
    this.n = document.createElement("div");
    this.n.innerHTML = val;
    this.n.className = "node";
    this.node = this.n.style;
    this.node.top = y + "px";
    this.node.left = x + "px";

    // Create height element
    this.heightElem = document.createElement("div");
    this.heightElem.className = "node-height";
    this.heightElem.innerHTML = this.h;
    this.heightElem.style.position = "absolute";
    this.heightElem.style.top = (y - 20) + "px"; // Position above the node
    this.heightElem.style.left = (x + 30) + "px"; // Adjust position to the right of the node
    graph.appendChild(this.heightElem);

    this.linel = null;
    this.liner = null;
    graph.appendChild(this.n);
    return this;
}

        function getLength(x1, y1, x2, y2) {
            var x = Math.pow(y1 - y2, 2);
            var y = Math.pow(x1 - x2, 2);
            return Math.sqrt(x + y);
        }

        function getAngle(x1, x2, dist) {
            var a = Math.abs(x1 - x2);
            return Math.asin(a / dist);
        }

        function getLine(x1, y1, x2, y2, fact) {
            var line = document.createElement("div");
            line.className = "line";
            line.style.top = y1 + 25 + "px";
            line.style.left = x1 + 25 + "px";
            var length = getLength(x1, y1, x2, y2);
            line.style.height = length + "px";
            line.style.transform = "rotate(" + fact * getAngle(x1, x2, length) + "rad)";
            graph.appendChild(line); // Append line to .graph
            return line;
        }

        function mainColor(node) {
            if (!node) return;
            node.n.classList.remove("visited", "found");
            mainColor(node.left);
            mainColor(node.right);
        }