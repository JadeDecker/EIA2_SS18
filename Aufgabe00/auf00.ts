document.addEventListener('DOMContentLoaded', function() {
    var name : string;
    name = prompt("Name: ", "");
    document.getElementById("name").innerHTML += name;
})