var L02;
(function (L02) {
    window.addEventListener("load", init);
    //let api: string = "http://localhost:8200";
    let api = "https://eia2-ss18-aufgabe5.herokuapp.com/";
    let daten = [];
    function init() {
        document.getElementById("speichern").addEventListener("click", speichern);
        document.getElementById("suchen").addEventListener("click", suchen);
    }
    function speichern() {
        let i = daten.length;
        let geschlecht;
        daten[i] = [];
        daten[i]["vorname"] = document.getElementById("inputvorname").value;
        daten[i]["nachname"] = document.getElementById("inputnachname").value;
        daten[i]["martrikelnummer"] = document.getElementById("inputmartrikelnummer").value;
        daten[i]["alter"] = document.getElementById("inputalter").value;
        if (document.getElementById("male").checked) {
            geschlecht = "männlich";
        }
        else {
            geschlecht = "weiblich";
        }
        daten[i]["geschlecht"] = geschlecht;
        daten[i]["studiengang"] = document.getElementById("inputstudiengang").value;
        let studi;
        studi = {
            vorname: document.getElementById("inputvorname").value,
            nachname: document.getElementById("inputnachname").value,
            martrikelnummer: parseInt(document.getElementById("inputmartrikelnummer").value),
            alter: parseInt(document.getElementById("inputalter").value),
            geschlecht: geschlecht,
            studiengang: document.getElementById("inputstudiengang").value
        };
        console.log(JSON.stringify(studi));
        let xhr = new XMLHttpRequest();
        xhr.open("GET", api + "?command=insert&data=" + JSON.stringify(studi), true);
        xhr.addEventListener("readystatechange", refresh);
        xhr.send();
        document.getElementById("inputvorname").value = "";
        document.getElementById("inputnachname").value = "";
        document.getElementById("inputmartrikelnummer").value = "";
        document.getElementById("inputalter").value = "";
        document.getElementById("male").checked = false;
        document.getElementById("female").checked = false;
        document.getElementById("inputstudiengang").value = "0";
    }
    function refresh() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", api + "?command=refresh", true);
        xhr.addEventListener("readystatechange", function (_event) {
            var xhr = _event.target;
            if (xhr.readyState == XMLHttpRequest.DONE) {
                document.getElementById("datentabelle").innerHTML = xhr.response;
            }
        });
        xhr.send();
    }
    function suchen() {
        let query = document.getElementById("inputsuche").value;
        document.getElementById("suchtabelle").innerHTML = "";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", api + "?command=search&searchFor=" + query, true);
        xhr.addEventListener("readystatechange", function (_event) {
            var xhr = _event.target;
            if (xhr.readyState == XMLHttpRequest.DONE) {
                document.getElementById("datentabelle").innerHTML = xhr.response;
            }
        });
        xhr.send();
    }
})(L02 || (L02 = {}));
//# sourceMappingURL=aufgabe6.js.map