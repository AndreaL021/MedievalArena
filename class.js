export class Enemy {
    constructor(arg = undefined) {
        if (arg != undefined) {
            const campi = this.setCampi();
            campi.forEach((c) => {
                this[c.nome] = arg[c.nome] != undefined ? arg[c.nome] : c.default_val;
            });
        } else {
            const campi = this.setCampi();
            campi.forEach((c) => {
                this[c.nome] = c.default_val;
            });
        }
    }
    setCampi() {
        const campi = [
            { nome: "hp", default_val: 200 },
            { nome: "def", default_val: [0,0,0,0] },
            { nome: "atk", default_val: 50 },
            { nome: "poison", default_val: false },
            { nome: "heals", default_val: 0 },
            { nome: "img", default_val: new Image() },
            { nome: "xp", default_val: 10 }
        ];
        return campi;
    }
}
export class Player {
    constructor(arg = undefined) {
        if (arg != undefined) {
            const campi = this.setCampi();
            campi.forEach((c) => {
                this[c.nome] = arg[c.nome] != undefined ? arg[c.nome] : c.default_val;
            });
        } else {
            const campi = this.setCampi();
            campi.forEach((c) => {
                this[c.nome] = c.default_val;
            });
        }
    }
    setCampi() {
        const campi = [
            { nome: "hp", default_val: 1000 },
            { nome: "atk", default_val: [
                30,     //fisico
                25,     //fuoco
                25,     //fulmine
                25,     //acqua
                10      //veleno
            ]},
            { nome: "img", default_val: new Image() },
            { nome: "lvl", default_val: 1 },
            { nome: "xp", default_val: 0 }
        ];
        return campi;
    }
}