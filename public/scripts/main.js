//MISC
//UI Elements
const filterUnits = document.querySelector("#filter-units");
const filterRHand = document.querySelector("#filter-right-hand");
const filterLHand = document.querySelector("#filter-left-hand");
const filterHead = document.querySelector("#filter-head");
const filterBody = document.querySelector("#filter-body");
const filterAccessory1 = document.querySelector("#filter-accessory-1");
const filterAccessory2 = document.querySelector("#filter-accessory-2");
const filterMateria1 = document.querySelector("#filter-materia-1");
const filterMateria2 = document.querySelector("#filter-materia-2");
const filterMateria3 = document.querySelector("#filter-materia-3");
const filterMateria4 = document.querySelector("#filter-materia-4");
const unitCollection = document.querySelector("#unit-collection");
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
const unitName = document.querySelector(".unit-name");
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
const unitResistPoison = document.querySelector("#unit-resist-poison");
const unitResistBlind = document.querySelector("#unit-resist-blind");
const unitResistSleep = document.querySelector("#unit-resist-sleep");
const unitResistSilence = document.querySelector("#unit-resist-silence");
const unitResistParalysis = document.querySelector("#unit-resist-paralysis");
const unitResistConfuse = document.querySelector("#unit-resist-confuse");
const unitResistPetrification = document.querySelector("#unit-resist-petrification");
const unitResistDisease = document.querySelector("#unit-resist-disease");
const unitResistCharm = document.querySelector("#unit-resist-charm");
const unitResistStop = document.querySelector("#unit-resist-stop");
const unitResistDeath = document.querySelector("#unit-resist-death");

//Data
let unitDataSource = "public/data/units.json"
let equipmentDataSource = "public/data/equipment.json"
let units;
let equipment;
let selectedUnit;

$(function () {
    console.log("Ready");
    intializeData();
    loadEventListeners();






    function intializeData() {
        $.get(unitDataSource, (data) => {
            units = data;
            units.forEach(function (unit) {
                setCollectionItem(unitCollection, "unit-item", unit)

            })

        }).then(function () {
            $.get(equipmentDataSource, (data) => {
                equipment = data;
                equipment.forEach(function (equip) {
                    let slot = whichSlot(equip);

                    if (slot == "weapon") {
                        setCollectionItem(equipLHand, "lHand-item", equip);
                        setCollectionItem(equipRHand, "rHand-item", equip)

                    }

                    else if (slot == "head") {
                        setCollectionItem(equipHead, "head-item", equip);
                    }

                    else if (slot == "body") {
                        setCollectionItem(equipBody, "body-item", equip);
                    }

                    else if (slot == "accessory") {
                        setCollectionItem(equipAccessory1, "accessory1-item", equip);
                        setCollectionItem(equipAccessory2, "accessory2-item", equip);

                    }

                    else if (slot == "materia") {
                        setCollectionItem(equipMateria1, "materia1-item", equip);
                        setCollectionItem(equipMateria2, "materia2-item", equip);
                        setCollectionItem(equipMateria3, "materia3-item", equip);
                        setCollectionItem(equipMateria4, "materia4-item", equip);
                    }
                })


            }).then(function () {
                document.querySelectorAll(".collection").forEach(function (collection) {
                    collection.parentElement.style.display = "none";
                })


                generateUnit();
            })
        })
    }


    function setCollectionItem(slot, slotClass, item) {
        let option = document.createElement("a");
        option.className += "collection-item " + slotClass;
        option.setAttribute("href", "#/")
        option.value = item.id;
        option.style.display = "none";
        option.textContent = item.name;
        slot.appendChild(option);
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
        document.addEventListener("mousedown", function (e) {
            if (!e.target.classList.contains("collection-item")) {
                document.querySelectorAll(".collection").forEach(function (collection) {
                    collection.parentNode.style.display = "none";
                })
            }
        })

        filterUnits.addEventListener("keyup", function (e) {
            addFilter(e, ".unit-item");
        })

        filterLHand.addEventListener("keyup", function (e) {
            addFilter(e, ".lHand-item")
        })

        filterRHand.addEventListener("keyup", function (e) {
            addFilter(e, ".rHand-item")
        })

        filterHead.addEventListener("keyup", function (e) {
            addFilter(e, ".head-item")
        })

        filterBody.addEventListener("keyup", function (e) {
            addFilter(e, ".body-item")
        })

        filterAccessory1.addEventListener("keyup", function (e) {
            addFilter(e, ".accessory1-item");
        })

        filterAccessory2.addEventListener("keyup", function (e) {
            addFilter(e, ".accessory2-item");
        })

        filterMateria1.addEventListener("keyup", function (e) {
            addFilter(e, ".materia1-item");
        })
        filterMateria2.addEventListener("keyup", function (e) {
            addFilter(e, ".materia2-item");
        })
        filterMateria3.addEventListener("keyup", function (e) {
            addFilter(e, ".materia3-item")
        })
        filterMateria4.addEventListener("keyup", function (e) {
            addFilter(e, ".materia4-item");
        })

        unitCollection.addEventListener("mousedown", function (e) {
            selectItem(e, filterUnits);
        })

        equipRHand.addEventListener("mousedown", function (e) {
            selectItem(e, filterRHand);
        })

        equipLHand.addEventListener("mousedown", function (e) {
            selectItem(e, filterLHand);
        })

        equipHead.addEventListener("mousedown", function (e) {
            selectItem(e, filterHead);
        })

        equipBody.addEventListener("mousedown", function (e) {
            selectItem(e, filterBody);
        })

        equipAccessory1.addEventListener("mousedown", function (e) {
            selectItem(e, filterAccessory1);
        })

        equipAccessory2.addEventListener("mousedown", function (e) {
            selectItem(e, filterAccessory2);
        })

        equipMateria1.addEventListener("mousedown", function (e) {
            selectItem(e, filterMateria1);
        })

        equipMateria2.addEventListener("mousedown", function (e) {
            selectItem(e, filterMateria2);
        })
        equipMateria3.addEventListener("mousedown", function (e) {
            selectItem(e, filterMateria3);
        })
        equipMateria4.addEventListener("mousedown", function (e) {
            selectItem(e, filterMateria4);
        })
    }

    function selectItem(e, filter) {
        if (e.target.classList.contains("collection-item")) {
            filter.value = e.target.textContent;
            e.target.parentNode.parentNode.style.display = "none";
            generateUnit();
        }
    }

    function addFilter(e, itemClass) {
        e.preventDefault();
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(itemClass).forEach(function (listItem) {
            if (listItem.firstChild) {
                const item = listItem.firstChild.textContent.toLowerCase();
                if (item.indexOf(text) != -1 && item.indexOf(text) != null) {
                    listItem.parentNode.parentNode.style.display = "block";
                    listItem.style.display = "block";
                }
                else {
                    listItem.style.display = "none";
                }
            }
        });

    }

    function generateUnit() {
        let x = filterUnits.value;
        selectedUnit = units.find(unit => unit.name == x);
        selectedUnit.equipment = {};
        selectedUnit.equipment.lHand = equipment.find(equip => equip.name == filterLHand.value);
        selectedUnit.equipment.rHand = equipment.find(equip => equip.name == filterRHand.value);
        selectedUnit.equipment.accessory1 = equipment.find(equip => equip.name == filterAccessory1.value);
        selectedUnit.equipment.accessory2 = equipment.find(equip => equip.name == filterAccessory2.value);
        selectedUnit.equipment.body = equipment.find(equip => equip.name == filterBody.value);
        selectedUnit.equipment.head = equipment.find(equip => equip.name == filterHead.value);
        selectedUnit.equipment.materia1 = equipment.find(equip => equip.name == filterMateria1.value);
        selectedUnit.equipment.materia2 = equipment.find(equip => equip.name == filterMateria2.value);
        selectedUnit.equipment.materia3 = equipment.find(equip => equip.name == filterMateria3.value);
        selectedUnit.equipment.materia4 = equipment.find(equip => equip.name == filterMateria4.value);
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
            stop: 0,
            death: 0
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
                if (mod == "spr")
                    unit.stats.spr += itemValue;
                if (mod == "sprPercent")
                    unit.stats.sprPercent += itemValue;
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
                    if (resist.name == "death")
                        unit.resists.death += resist.percent;
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
        unitResistDeath.textContent = unit.resists.death;

        console.log(unit)
    }
})