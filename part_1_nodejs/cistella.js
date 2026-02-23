import readlineSync from 'readline-sync';


class Producte {
    constructor(descripcio, preu) {
        this.descripcio = descripcio;
        this.preu = parseFloat(preu);
    }
    toString() {
        return `${this.descripcio} - ${this.preu.toFixed(2)} €`;
    }
}

class LiniaCistella {
    constructor(producte, quantitat) {
        this.producte = producte;
        this.quantitat = parseInt(quantitat);
    }

    getTotal() {
        return this.producte.preu * this.quantitat;
    }

    mostrarLiniaCistella() {
        console.log(
            `${this.quantitat} X ${this.producte.descripcio} (${this.producte.preu.toFixed(2)}€) = ${this.getTotal().toFixed(2)}€`
        );
    }
}


class Cistella {
    constructor() {
        this.productes = [];
    }

    afegirProducte(producte, quantitat) {
        this.productes.push(new LiniaProducte(producte, quantitat));
    }

    afegirLiniaProducte(línia) {
        this.productes.push(línia)
    }
    mostrarCistella() {
        if (this.productes.length === 0) {
            console.log('\nLa cistella està buida.\n');
            return;
        }

        console.log('\n--- Contingut de la Cistella ---');

        let total = 0;

        this.productes.forEach((item, index) => {
            const subtotal = item.producte.preu * item.quantitat;
            total += subtotal;

            console.log(
                `${index + 1}. ${item.producte.toString()} x ${item.quantitat} unitats - Subtotal: ${subtotal.toFixed(2)} €`
            );
        });

        console.log(`\nPreu Total: ${total.toFixed(2)} €\n`);
    }
}

function mostraAjuda() {
    console.log('Ajuda. Ordres permeses:\n');
    console.log('\thelp: Mostra aquesta ajuda');
    console.log('\texit: Ix de l\'aplicació');
    console.log('\tadd: Afig un nou producte a la cistella');
    console.log('\tshow: Mostra el contingut de la cistella');
}

function afegirProducte(cistella) {
    const nom = readlineSync.question('Nom del producte: ');
    const preu = readlineSync.question('Preu del producte: ');
    if (isNaN(preu)) {
        console.log('Error: El preu ha de ser un número.');
        return;
    }

    const quantitat = readlineSync.question('Nombre d\'unitats: ');
    if (isNaN(quantitat) || parseInt(quantitat) <= 0) {
        console.log('Error: La quantitat ha de ser un número positiu.');
        return;
    }


    const producte = new Producte(nom, preu);
    cistella.afegirProducte(producte, quantitat);

    console.log('Producte afegit correctament!\n');
}


function iniciarAplicacio() {
    

    let ordre;

    const cistella = new Cistella();

    console.log("🎄 Benvingut a l'aplicació de la Cistella de Nadal! 🎄");

    do {
        ordre = readlineSync.question('🎄> ').trim().toLowerCase();

        switch (ordre) {
            case 'add':
                afegirProducte(cistella);
                break;
            case 'show':
                cistella.mostrarCistella();
                break;
            case 'help':
                mostraAjuda();
                break;
            case 'exit':
                console.log('Bon Nadal!');
                break;
            default:
                console.log('Ordre desconeguda. Escriu "help" per vore les ordres disponibles.');
        }
    } while (ordre !== 'exit');
}


iniciarAplicacio();
