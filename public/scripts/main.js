//UI Elements
const selectUnit = document.querySelector("#select-unit");
const unitName = document.querySelector(".unit-name");
const equipLHand = document.querySelector("#equip-left-hand");
const equipRHand = document.querySelector("#equip-right-hand");
const equipHead = document.querySelector("#equip-head");
const equipBody = document.querySelector("#equip-body");
const equipAccessory1 = document.querySelector("#equip-accessory-1");
const equipAccessory2 = document.querySelector("#equip-accessory-2");
const equipMateria1 = document.querySelector("#equip-materia-1");
const equipMateria2 = document.querySelector("#equip-materia-2");
const equipMateria3 = document.querySelector("#equip-materia-3");
const equipMateria4 = document.querySelector("#equip-materia-4");
const unitHp = document.querySelector("#unit-hp");
const unitMp = document.querySelector("#unit-mp");
const unitAtk = document.querySelector("#unit-atk");
const unitMag = document.querySelector("#unit-mag");
const unitDef = document.querySelector("#unit-def");
const unitSpr = document.querySelector("#unit-spr");
const unitHpPercent = document.querySelector("#unit-hp-percent");
const unitMpPercent = document.querySelector("#unit-mp-percent");
const unitAtkPercent = document.querySelector("#unit-atk-percent");
const unitMagPercent = document.querySelector("#unit-mag-percent");
const unitDefPercent = document.querySelector("#unit-def-percent");
const unitSprPercent = document.querySelector("#unit-spr-percent");
const unitProvoke = document.querySelector("#unit-provoke");
const unitPEvade = document.querySelector("#unit-pEvade");
const unitMEvade = document.querySelector("#unit-mEvade");
const unitResistFire = document.querySelector("#unit-resist-fire");
const unitResistIce = document.querySelector("#unit-resist-ice");
const unitResistLightning = document.querySelector("#unit-resist-lightning");
const unitResistWater = document.querySelector("#unit-resist-water");
const unitResistWind = document.querySelector("#unit-resist-wind");
const unitResistEarth = document.querySelector("#unit-resist-earth");
const unitResistHoly = document.querySelector("#unit-resist-holy");
const unitResistDark = document.querySelector("#unit-resist-dark");

//Data
let unitDataSource = "/data/units.json";
let equipmentDataSource = "/data/equipment.json"
let units;
let equipment;
let selectedUnit;
let selectedValues;

$(function () {
    console.log("Ready");
    intializeData();
    loadEventListeners();


    function intializeData() {
        $.get(unitDataSource, (data) => {
            units = data;
            units.sort((a, b) => { return a.name > b.name })
            units.forEach(function (unit) {
                let option = document.createElement("option");
                option.value = unit.id;
                option.textContent = unit.name;
                selectUnit.appendChild(option);

            })
        }).then(function () {
            $.get(equipmentDataSource, (data) => {
                equipment = data;
                equipment.sort((a, b) => { return a.name > b.name });
                equipment.forEach(function (equip) {
                    let slot = whichSlot(equip);
                    let option = document.createElement("option");
                    option.value = equip.id;
                    option.textContent = equip.name;

                    if (slot == "weapon") {
                        let option2 = document.createElement("option");
                        option2.value = equip.id;
                        option2.textContent = equip.name;
                        equipLHand.appendChild(option);
                        equipRHand.appendChild(option2);
                    }

                    else if (slot == "head") {
                        equipHead.appendChild(option);
                    }

                    else if (slot == "body") {
                        equipBody.appendChild(option);
                    }

                    else if (slot == "accessory") {
                        let option2 = document.createElement("option");
                        option2.value = equip.id;
                        option2.textContent = equip.name;
                        equipAccessory1.appendChild(option);
                        equipAccessory2.appendChild(option2);
                    }

                    else if (slot == "materia") {
                        let option2 = document.createElement("option");
                        option2.value = equip.id;
                        option2.textContent = equip.name;

                        let option3 = document.createElement("option");
                        option3.value = equip.id;
                        option3.textContent = equip.name;

                        let option4 = document.createElement("option");
                        option4.value = equip.id;
                        option4.textContent = equip.name;

                        equipMateria1.appendChild(option);
                        equipMateria2.appendChild(option2);
                        equipMateria3.appendChild(option3);
                        equipMateria4.appendChild(option4);
                    }
                })


            }).then(function () {
                $('select').formSelect();
            })
        })
    }


    function whichSlot(x) {
        let slot;

        if (x.type == "katana" || x.type == "greatSword" || x.type == "sword" || x.type == "dagger" || x.type == "rod" || x.type == "staff" || x.type == "axe" || x.type == "hammer" || x.type == "mace" || x.type == "spear" || x.type == "fist" || x.type == "bow" || x.type == "gun" || x.type == "whip" || x.type == "throwing" || x.type == "harp" || x.type == "lightShield" || x.type == "heavyShield") {
            slot = "weapon";
        }
        else if (x.type == "hat" || x.type == "helm") {
            slot = "head";
        }
        else if (x.type == "clothes" || x.type == "lightArmor" || x.type == "heavyArmor" || x.type == "robe") {
            slot = "body";
        }
        else if (x.type == "accessory") {
            slot = "accessory";
        }

        else if (x.type == "materia") {
            slot = "materia";
        }
        else {
            console.error(x.id + ": Unknown type [" + x.type + "]");
        }
        return slot
    }
    function loadEventListeners() {
        document.querySelectorAll("select").forEach(function (selector) {
            selector.addEventListener("change", function () {
                generateUnit(selectUnit.value);
            })
        })

    }

    function generateUnit(unitId) {
        selectedUnit = units.find(unit => unit.id == unitId);
        selectedUnit.equipment = {};
        selectedUnit.equipment.lHand = equipment.find(equip => equip.id == equipLHand.value);
        selectedUnit.equipment.rHand = equipment.find(equip => equip.id == equipRHand.value);
        selectedUnit.equipment.accessory1 = equipment.find(equip => equip.id == equipAccessory1.value);
        selectedUnit.equipment.accessory2 = equipment.find(equip => equip.id == equipAccessory2.value);
        selectedUnit.equipment.body = equipment.find(equip => equip.id == equipBody.value);
        selectedUnit.equipment.head = equipment.find(equip => equip.id == equipHead.value);
        selectedUnit.equipment.materia1 = equipment.find(equip => equip.id == equipMateria1.value);
        selectedUnit.equipment.materia2 = equipment.find(equip => equip.id == equipMateria2.value);
        selectedUnit.equipment.materia3 = equipment.find(equip => equip.id == equipMateria3.value);
        selectedUnit.equipment.materia4 = equipment.find(equip => equip.id == equipMateria4.value);

        unitName.textContent = selectedUnit.name;
        calcStats(selectedUnit);

    }

    function calcStats(unit) {
        let stats = {
            hp: 0,
            mp: 0,
            atk: 0,
            mag: 0,
            def: 0,
            spr: 0,
            hpPercent: 0,
            mpPercent: 0,
            atkPercent: 0,
            magPercent: 0,
            defPercent: 0,
            sprPercent: 0,
            provoke: 0,
            pEvade: 0,
            mEvade: 0,
            resistFire: 0,
            resistIce: 0,
            resistLightning: 0,
            resistWater: 0,
            resistWind: 0,
            resistEarth: 0,
            resistHoly: 0,
            resistDark: 0
        }

        unit.stats = stats;
        console.log(unit);
        Object.entries(unit.equipment).forEach((slot) => {
            if (slot[1].hp != null) {
                unit.stats.hp += parseInt(slot[1].hp);
            }
            if (slot[1].hpPercent != null) {
                unit.stats.hpPercent += parseInt(slot[1].hpPercent);
            }
            if (slot[1].mp != null) {
                unit.stats.mp += parseInt(slot[1].mp);
            }
            if (slot[1].mpPercent != null) {
                unit.stats.mpPercent += parseInt(slot[1].mpPercent);
            }
            if (slot[1].atk != null) {
                unit.stats.atk += parseInt(slot[1].atk);
            }
            if (slot[1].atkPercent != null) {
                unit.stats.atkPercent += parseInt(slot[1].atkPercent);
            }
            if (slot[1].mag != null) {
                unit.stats.mag += parseInt(slot[1].mag);
            }
            if (slot[1].magPercent != null) {
                unit.stats.magPercent += parseInt(slot[1].magPercent);
            }
            if (slot[1].def != null) {
                unit.stats.def += parseInt(slot[1].def);
            }
            if (slot[1].defPercent != null) {
                unit.stats.defPercent += parseInt(slot[1].defPercent);
            }

            if (slot[1].spr != null) {
                unit.stats.spr += parseInt(slot[1].spr);
            }
            if (slot[1].sprPercent != null) {
                unit.stats.sprPercent += parseInt(slot[1].sprPercent);
            }
            if (slot[1].provoke != null) {
                unit.stats.provoke += parseInt(slot[1].provoke);
            }
            if (slot[1].evade != null) {
                if (slot[1].evade.physical != null) {
                    unit.stats.pEvade += parseInt(slot[1].evade.physical);
                }

                if (slot[1].evade.magical != null) {
                    unit.stats.mEvade += parseInt(slot[1].evade.magical);
                }
            }



            if (slot[1].resist != null) {
                slot[1].resist.forEach(function (resist) {
                    if (resist.name == "fire") {
                        unit.stats.resistFire += resist.percent;
                    }

                    if (resist.name == "ice") {
                        unit.stats.resistIce += resist.percent;
                    }
                    if (resist.name == "lightning") {
                        unit.stats.resistLightning += resist.percent;
                    }
                    if (resist.name == "water") {
                        unit.stats.resistWater += resist.percent;
                    }
                    if (resist.name == "wind") {
                        unit.stats.resistWind += resist.percent;
                    }
                    if (resist.name == "earth") {
                        unit.stats.resistEarth += resist.percent;
                    }
                    if (resist.name == "light") {
                        unit.stats.resistHoly += resist.percent;
                    }
                    if (resist.name == "dark") {
                        unit.stats.resistDark += resist.percent;
                    }
                })
            }
        })
        unitHp.textContent = unit.stats.hp;
        unitMp.textContent = unit.stats.mp;
        unitAtk.textContent = unit.stats.atk;
        unitMag.textContent = unit.stats.mag;
        unitDef.textContent = unit.stats.def;
        unitSpr.textContent = unit.stats.spr;
        unitHpPercent.textContent = unit.stats.hpPercent;
        unitMpPercent.textContent = unit.stats.mpPercent;
        unitAtkPercent.textContent = unit.stats.atkPercent;
        unitMagPercent.textContent = unit.stats.magPercent;
        unitDefPercent.textContent = unit.stats.defPercent;
        unitSprPercent.textContent = unit.stats.sprPercent;
        unitProvoke.textContent = unit.stats.provoke;
        unitPEvade.textContent = unit.stats.pEvade;
        unitMEvade.textContent = unit.stats.mEvade;
        unitResistFire.textContent = unit.stats.resistFire;
        unitResistIce.textContent = unit.stats.resistIce;
        unitResistLightning.textContent = unit.stats.resistLightning;
        unitResistWater.textContent = unit.stats.resistWater;
        unitResistWind.textContent = unit.stats.resistWind
        unitResistEarth.textContent = unit.stats.resistEarth;
        unitResistHoly.textContent = unit.stats.resistHoly;
        unitResistDark.textContent = unit.stats.resistDark;
        console.log(unit)
    }
})