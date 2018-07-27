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
const unitResistPoison = document.querySelector("#unit-resist-poison")
const unitResistBlind = document.querySelector("#unit-resist-blind")
const unitResistSleep = document.querySelector("#unit-resist-sleep")
const unitResistSilence = document.querySelector("#unit-resist-silence")
const unitResistParalysis = document.querySelector("#unit-resist-paralysis")
const unitResistConfuse = document.querySelector("#unit-resist-confuse")
const unitResistPetrification = document.querySelector("#unit-resist-petrification")
const unitResistDisease = document.querySelector("#unit-resist-disease")
const unitResistCharm = document.querySelector("#unit-resist-charm")
const unitResistStop = document.querySelector("#unit-resist-stop")

//Data
let unitDataSource = "/data/units.json"
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
        selectedUnit.stats = {
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
        };

        selectedUnit.resists = {
            fire: 0,
            ice: 0,
            lightning: 0,
            water: 0,
            wind: 0,
            earth: 0,
            holy: 0,
            dark: 0,
            poison: 0,
            blind: 0,
            sleep: 0,
            silence: 0,
            paralysis: 0,
            confuse: 0,
            disease: 0,
            petrification: 0,
            charm: 0,
            stop: 0
        };
        calcStats(selectedUnit);
        calcResists(selectedUnit);

        displayUnit(selectedUnit);
    }

    function calcStats(unit) {
        /*
        Cycles through unit slots
        Cycles through stats of each item
        */

        $.each(unit.equipment, function (slot, item) {
            $.each(item, function (mod, itemValue) {
                if (mod == "atk")
                    unit.stats.atk += itemValue;
                if (mod == "atkPercent")
                    unit.stats.atkPercent += itemValue;
                if (mod == "mag")
                    unit.stats.mag += itemValue;
                if (mod == "magPercent")
                    unit.stats.magPercent += itemValue;
                if (mod == "def")
                    unit.stats.def += itemValue;
                if (mod == "defPercent")
                    unit.stats.defPercent += itemValue;
                if (mod == "evade") {
                    $.each(itemValue, function (evadeType, value) {
                        if (evadeType == "physical")
                            unit.stats.pEvade += value;
                        if (evadeType == "magical")
                            unit.stats.mEvade += value;
                    })
                }
            })
        })
    }

    function calcResists(unit) {
        $.each(unit.equipment, function (slot, item) {
            if (item.resist != null) {
                $.each(item.resist, function (index, resist) {
                    console.log(item.name + ": " + resist.name + " + " + resist.percent)
                    if (resist.name == "fire")
                        unit.resists.fire += resist.percent;
                    if (resist.name == "ice")
                        unit.resists.ice = resist.percent;
                    if (resist.name == "lightning")
                        unit.resists.lightning += resist.percent;
                    if (resist.name == "wind")
                        unit.resists.wind += resist.percent;
                    if (resist.name == "water")
                        unit.resists.water += resist.percent;
                    if (resist.name == "earth")
                        unit.resists.earth += resist.percent;
                    if (resist.name == "light")
                        unit.resists.holy += resist.percent;
                    if (resist.name == "dark")
                        unit.resists.dark += resist.percent;
                    if (resist.name == "poison")
                        unit.resists.poison += resist.percent;
                    if (resist.name == "blind")
                        unit.resists.blind += resist.percent;
                    if (resist.name == "sleep")
                        unit.resists.sleep += resist.percent;
                    if (resist.name == "silence")
                        unit.resists.silence += resist.percent;
                    if (resist.name == "paralysis")
                        unit.resists.paralysis += resist.percent;
                    if (resist.name == "confuse")
                        unit.resists.confuse += resist.percent;
                    if (resist.name == "disease")
                        unit.resists.disease += resist.percent;
                    if (resist.name == "petrification")
                        unit.resists.petrification += resist.percent;
                    if (resist.name == "charm")
                        unit.resists.charm += resist.percent;
                    if (resist.name == "stop")
                        unit.resists.stop += resist.percent;
                })
            }
        })
    }

    function displayUnit(unit) {
        unitName.textContent = selectedUnit.name;
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
        unitResistFire.textContent = unit.resists.fire;
        unitResistIce.textContent = unit.resists.ice;
        unitResistLightning.textContent = unit.resists.lightning;
        unitResistWater.textContent = unit.resists.water;
        unitResistWind.textContent = unit.resists.wind
        unitResistEarth.textContent = unit.resists.earth;
        unitResistHoly.textContent = unit.resists.holy;
        unitResistDark.textContent = unit.resists.dark;
        unitResistPoison.textContent = unit.resists.poison;
        unitResistBlind.textContent = unit.resists.blind;
        unitResistSleep.textContent = unit.resists.sleep;
        unitResistSilence.textContent = unit.resists.silence;
        unitResistParalysis.textContent = unit.resists.paralysis;
        unitResistConfuse.textContent = unit.resists.confuse;
        unitResistPetrification.textContent = unit.resists.petrification;
        unitResistDisease.textContent = unit.resists.disease;
        unitResistCharm.textContent = unit.resists.charm;
        unitResistStop.textContent = unit.resists.stop;
        console.log(unit)
    }
})
