let historique = []
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


    let calcul={
    expression: document.getElementById("resultat").value ,
    resultatt:document.getElementById("resultat2").value
}

 historique.push(calcul);
 console.log(historique);

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

    for (let i = 0; i < historique.length; i++) {
        const item = historique[i];
        const ligne = document.createElement("div");
        ligne.className = "ligne-historique";
        ligne.textContent = `${item.expression} = ${item.resultatt}`;
        contenuHistorique.appendChild(ligne);
    }
}

function fermerHistorique() {
    document.getElementById("historique").style.display = "none";
}
