const historiqueKey = "historiqueCalculatrice";
let historique = JSON.parse(localStorage.getItem(historiqueKey) || "[]");

function sauvegarderHistorique() {
    localStorage.setItem(historiqueKey, JSON.stringify(historique));
}

function formaterDate(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Date inconnue";
    }

    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function formaterHeure(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Heure inconnue";
    }

    return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

function ajout(valeur) {
    const input = document.getElementById("resultat");
    const valeurAffichee = valeur;
    const dernier = input.value[input.value.length - 1];
    const operateurs = ["+", "-", "*", "/", "×", "÷"];

    if (operateurs.includes(valeurAffichee)) {
        if (input.value === "") {
            if (valeurAffichee === "-") {
                input.value = "-";
            }
            return;
        }

        if (operateurs.includes(dernier)) {
            input.value = input.value.slice(0, -1) + valeurAffichee;
        } else {
            input.value += valeurAffichee;
        }
        return;
    }

    if (valeurAffichee === ".") {
        const dernierNombre = input.value.split(/[+\-*/×÷]+/).pop();
        if (dernierNombre && dernierNombre.includes(".")) { 
            return;
        }
    }

    input.value += valeurAffichee;
}
function egal() {
    const input = document.getElementById("resultat");
    const output = document.getElementById("resultat2");
    const expression = input.value.replace(/×/g, "*").replace(/÷/g, "/");

    if (!expression || /[+\-*/]$/.test(expression)) {
        output.value = "Erreur";
        return;
    }

    try {
        const resultat = Function('"use strict"; return (' + expression + ');')();
        output.value = Number.isFinite(resultat) ? resultat : "Erreur";
    } 
    
    catch (error) {
        output.value = "Erreur";
    }

    if (output.value !== "Erreur") {
        const calcul = {
            expression: input.value,
            resultatt: output.value,
            dateHeure: new Date().toISOString()
        };

        historique.unshift(calcul);
        sauvegarderHistorique();
    }
}



function del() {
    const input = document.getElementById("resultat");
    input.value = input.value.slice(0, -1);
}



function reset() {
    document.getElementById("resultat").value = "";
    document.getElementById("resultat2").value = "";
}
function afficherHistorique() {
    const historiquePanel = document.getElementById("historique");
    const contenuHistorique = document.getElementById("contenu-historique");

    historiquePanel.style.display = "flex";
    contenuHistorique.innerHTML = "";

    const groupesParDate = historique.reduce((acc, item) => {
        const date = formaterDate(item.dateHeure);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    Object.entries(groupesParDate).forEach(([date, items]) => {
        const sectionDate = document.createElement("section");
        sectionDate.className = "section-date";

        const titreDate = document.createElement("h3");
        titreDate.className = "titre-date";
        titreDate.textContent = date;
        sectionDate.appendChild(titreDate);

        items.forEach((item) => {
            const ligne = document.createElement("div");
            ligne.className = "ligne-historique";

            const calcul = document.createElement("span");
            calcul.className = "calcul-historique";
            calcul.textContent = `${item.expression} = ${item.resultatt}`;

            const heure = document.createElement("span");
            heure.className = "heure-historique";
            heure.textContent = formaterHeure(item.dateHeure);

            ligne.appendChild(calcul);
            ligne.appendChild(heure);
            sectionDate.appendChild(ligne);
        });

        contenuHistorique.appendChild(sectionDate);
    });
}

function fermerHistorique() {
    document.getElementById("historique").style.display = "none";
}
