function ajout1() {
    document.getElementById("resultat").value += "1";
   
}
function ajout2() {
    document.getElementById("resultat").value += "2";
}
function ajout3() {
    document.getElementById("resultat").value += "3";
}
function ajout4() {
    document.getElementById("resultat").value += "4";
}
function ajout5() {
    document.getElementById("resultat").value += "5";
}
function ajout6() {
    document.getElementById("resultat").value += "6";
}
function ajout7() {
    document.getElementById("resultat").value += "7";
}
function ajout8() {
    document.getElementById("resultat").value += "8";
}
function ajout9() {
    document.getElementById("resultat").value += "9";
}
function ajout0() {
    document.getElementById("resultat").value += "0";
}
function ajoutv(){
    document.getElementById("resultat").value += ".";
}
function ajoutp(){
    document.getElementById("resultat").value += "(";
}
function ajoutp2(){
    document.getElementById("resultat").value += ")";
}
function ajoutPlus() {
    document.getElementById("resultat").value += "+";
}
function ajoutMoins() {
    document.getElementById("resultat").value += "-";
}
function ajoutFois() {
    document.getElementById("resultat").value += "*";
}
function ajoutDivise() {
    document.getElementById("resultat").value += "/";
}
function effacer() {
    document.getElementById("resultat").value = "";
}
function egal() {
    let expression = document.getElementById("resultat").value;
    let resultat = eval(expression);
    document.getElementById("resultat2").value = resultat;
}
function del(){
    let sup = document.getElementById("resultat");
    sup.value = sup.value.slice(0, -1);
}
function reset(){
    document.getElementById("resultat").value = "";
    document.getElementById("resultat2").value = "";
}
function effacer(){
    document.getElementById("resultat").value = "";
}
