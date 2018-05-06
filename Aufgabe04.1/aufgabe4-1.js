var L02;
(function (L02) {
    window.addEventListener("load", init);
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
        document.getElementById("inputvorname").value = "";
        document.getElementById("inputnachname").value = "";
        document.getElementById("inputmartrikelnummer").value = "";
        document.getElementById("inputalter").value = "";
        document.getElementById("male").checked = false;
        document.getElementById("female").checked = false;
        document.getElementById("inputstudiengang").value = "0";
        document.getElementById("datentabelle").innerHTML = "";
        for (let x = 0; x < daten.length; x++) {
            document.getElementById("datentabelle").innerHTML += '<tr><td class="datentd">' + daten[x]["nachname"] + '</td><td  class="datentd">' + daten[x]["vorname"] + '</td><td  class="datentd">' + daten[x]["martrikelnummer"] + '</td><td  class="datentd">' + daten[x]["alter"] + '</td><td  class="datentd">' + daten[x]["geschlecht"] + '</td><td  class="datentd">' + daten[x]["studiengang"] + '</td></tr>';
        }
    }
    function suchen() {
        let query = document.getElementById("inputsuche").value;
        document.getElementById("suchtabelle").innerHTML = "";
        let ergebnisse = 0;
        for (let x = 0; x < daten.length; x++) {
            if (daten[x]["martrikelnummer"] == query) {
                document.getElementById("suchtabelle").innerHTML += '<tr><td class="datentd">' + daten[x]["nachname"] + '</td><td  class="datentd">' + daten[x]["vorname"] + '</td><td  class="datentd">' + daten[x]["martrikelnummer"] + '</td><td  class="datentd">' + daten[x]["alter"] + '</td><td  class="datentd">' + daten[x]["geschlecht"] + '</td><td  class="datentd">' + daten[x]["studiengang"] + '</td></tr>';
                ergebnisse++;
            }
        }
    }
})(L02 || (L02 = {}));
//# sourceMappingURL=aufgabe4-1.js.map