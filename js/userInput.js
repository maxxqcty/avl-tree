var add = document.getElementById("add");
var search = document.getElementById("search");
var graph = document.querySelector(".graph");
var Deletee = document.getElementById("Deletee");
var input = document.getElementById("input");
let errorM = document.getElementById("error-message");
var transcript = document.getElementById("transcript"); // Add this line
var root = null;
var time = 1000;
var rootTopPosition = 80;

document.onkeypress = function (e) {
    if (e.keyCode == 13 || e.charCode == 105 || e.charCode == 73) {
        Add();
        input.value = "";
    } else if (e.charCode == 115 || e.charCode == 83) {
        callSearch();
        input.value = "";
    } else if (e.charCode == 100 || e.charCode == 68) {
        callDelete();
        input.value = "";
    }
};

add.onclick = function () {
    Add();
    input.value = "";
    transcript.innerHTML = "";
};

search.onclick = function () {
    callSearch();
    input.value = "";
};

Deletee.onclick = function () {
    callDelete();
    input.value = "";
    transcript.innerHTML = "";
};