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
const clearBtn = document.querySelector("#clear-btn");

//Data
let unitDataSource = "/data/units.json"
let equipmentDataSource = "/data/equipment.json"
let units = [];
let equipment = {
    weapons: [],
    heads: [],
    bodies: [],
    accessories: [],
    materia: [],
}
let selectedUnit;


$(function () {
    console.log("Ready");
    intializeData();
    loadEventListeners();

    function intializeData() {
        $.get(unitDataSource, (data) => {
            data.forEach(function (unit) {
                units.push(unit);
            })

        }).then(function () {
            $.get(equipmentDataSource, (data) => {

                data.forEach(function (item) {
                    let slot = whichSlot(item);

                    if (slot == "weapon")
                        equipment.weapons.push(item);
                    else if (slot == "head")
                        equipment.heads.push(item);
                    else if (slot == "body")
                        equipment.bodies.push(item);
                    else if (slot == "accessory")
                        equipment.accessories.push(item);
                    else if (slot == "materia")
                        equipment.materia.push(item);
                })



            }).then(function () {
                //Hide all collections
                document.querySelectorAll(".collection").forEach(function (collection) {
                    collection.style.display = "none";
                })
                clearFilters();
            })
        })
    }

    function clearFilters() {
        document.querySelectorAll("input").forEach((filter) => filter.value = "")
        unitName.textContent = "";
        document.querySelectorAll("td").forEach((col) => col.textContent = 0);
    }

    function addFilter(e, index) {
        //Filter
        let filter = e.target;
        const text = filter.value.toLowerCase();

        //Get filter's corresponding collection
        let collection = document.querySelectorAll(".collection")[index];

        //Push appropriate units
        if (collection.id == "unit-collection") {
            setCollectionItems(units, text, collection);
        }
        else if (collection.id == "equip-right-hand" || collection.id == "equip-left-hand") {
            setCollectionItems(equipment.weapons, text, collection)
        }

        else if (collection.id == "equip-head") {
            setCollectionItems(equipment.heads, text, collection)
        }
        else if (collection.id == "equip-body") {
            setCollectionItems(equipment.bodies, text, collection)
        }

        else if (collection.id == "equip-accessory-1" || collection.id == "equip-accessory-2") {
            setCollectionItems(equipment.accessories, text, collection);
        }

        else if (collection.id == "equip-materia-1" || collection.id == "equip-materia-2" || collection.id == "equip-materia-3" || collection.id == "equip-materia-4") {
            setCollectionItems(equipment.materia, text, collection)
        }
        else {
            //For items that dont have a name
        }
    }

    function setCollectionItems(itemList, text, collection) {
        //Clear current list
        collection.style.display = "block";
        collection.innerHTML = "";
        if (text != "") {
            itemList.forEach(function (item) {
                if (item.name != null) {
                    const itemName = item.name.toLowerCase();
                    if (itemName.indexOf(text) != -1) {
                        let listItem = document.createElement("a");
                        listItem.className += "collection-item";
                        listItem.textContent = item.name;
                        if (whichSlot(item) != "unit") {
                            Object.keys(item).forEach(function (mod) {
                                if (mod == "hp" || mod == "mp" || mod == "atk" || mod == "mag" || mod == "def" || mod == "spr" ||
                                    mod == "hpPercent" || mod == "mpPercent" || mod == "atkPercent" || mod == "magPercent" || mod == "defPercent" || mod == "sprPercent") {
                                    listItem.textContent += ", " + mod + " + " + item[mod];
                                }
                            })
                        }
                        collection.append(listItem);
                    }
                }
                else {
                    //Unknown item
                }
            })
        } else {
            collection.style.display = "none";
        }
    }

    function isBasicMod(mod) {
        let isBasic = false;
        if (mod == "hp" || mod == "mp" || mod == "atk" || mod == "mag" || mod == "def" || mod == "spr" ||
            mod == "hpPercent" || mod == "mpPercent" || mod == "atkPercent" || mod == "magPercent" || mod == "defPercent" || mod == "sprPercent")
            isBasic = true;

        return isBasic
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

        else if (x.type == "summon" || x.type == "event" || x.type == "story" || x.type == "friendPoints") {
            slot = "unit"
        }
        else {
            console.error(x.id + ": Unknown type [" + x.type + "]");
        }
        return slot
    }

    function loadEventListeners() {

        document.querySelectorAll("input").forEach(function (filter) {
            filter.addEventListener("keypress", function (e) {
                if (e.keyCode == 13) {
                    console.log("You pressed enter!");
                    console.log(e);
                }
            })
        })

        clearBtn.addEventListener("click", function (e) {
            clearFilters();
        })


        document.querySelectorAll("input").forEach(function (filter, index) {
            filter.addEventListener("keyup", function (e) {
                addFilter(e, index);
            });
        })

        document.querySelectorAll(".collection").forEach(function (collection) {
            collection.addEventListener("click", function (e) {
                selectItem(e);
            })
        })
    }

    /**
     * When you click on a collection-item
     * @param {Event} e 
     */
    function selectItem(e) {
        //Click on a collection item
        if (e.target.classList.contains("collection-item")) {

            let filter = getCorrespondingFilter(e.target.parentNode.id);
            //Set the filter's value
            filter.value = e.target.textContent.split(",")[0];

            //equip the selected item
            equipItem(e.target);

            //Close all other collections
            document.querySelectorAll(".collection").forEach(function (collection) {
                collection.style.display = "none";
            })
        }
    }

    function equipItem(item) {
        let collection = item.parentNode;

        //Selecting a unit
        if (collection.id == "unit-collection") {
            selectedUnit = units.find((unit) => unit.name == item.textContent);
            selectedUnit.equipment = {};
            selectedUnit.resists = {};
            selectedUnit.stats = {};
        }


        //Equipment Selection
        else {
            if (collection.id == "equip-left-hand") {
                selectedUnit.equipment.lHand = findItem(item.textContent, equipment.weapons);
            }
            if (collection.id == "equip-right-hand") {
                selectedUnit.equipment.rHand = findItem(item.textContent, equipment.weapons);
            }
            if (collection.id == "equip-head") {
                selectedUnit.equipment.head = findItem(item.textContent, equipment.heads);
            }
            if (collection.id == "equip-body") {
                selectedUnit.equipment.body = findItem(item.textContent, equipment.bodies);
            }
            if (collection.id == "equip-accessory-1") {
                selectedUnit.equipment.accessory_1 = findItem(item.textContent, equipment.accessories);
            }
            if (collection.id == "equip-accesory-2") {
                selectedUnit.equipment.accessory_2 = findItem(item.textContent, equipment.accessories);
            }
            if (collection.id == "equip-materia-1") {
                selectedUnit.equipment.materia_1 = findItem(item.textContent, equipment.materia);
            }
            if (collection.id == "equip-materia-2") {
                selectedUnit.equipment.materia_2 = findItem(item.textContent, equipment.materia);
            }
            if (collection.id == "equip-materia-3") {
                selectedUnit.equipment.materia_3 = findItem(item.textContent, equipment.materia);
            }
            if (collection.id == "equip-materia-4") {
                selectedUnit.equipment.materia_4 = findItem(item.textContent, equipment.materia);
            }
        }
        generateUnit();
    }
    /**
     * 
     * @param {String} itemString 
     * @param {Array} equipment 
     */
    function findItem(itemString, equipment) {
        return equipment.find((item) => item.name == itemString.split(",")[0])
    }
    function getCorrespondingFilter(collectionId) {
        let filter;
        document.querySelectorAll(".collection").forEach(function (collection, index) {
            if (collectionId == collection.id)
                filter = document.querySelectorAll("input")[index];
        })
        return filter;
    }
    function generateUnit() {
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
            mEvade: 0
        }
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

        $.each(unit.equipment, function (slot, item) {
            if (item != null) {

                $.each(item, function (mod, itemValue) {
                    if (mod == "hp")
                        unit.stats.hp += itemValue;
                    if (mod == "hpPercent")
                        unit.stats.hpPercent += itemValue;
                    if (mod == "mp")
                        unit.stats.mp += itemValue;
                    if (mod == "mpPercent")
                        unit.stats.mpPercent += itemValue;
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
            }
        })
    }

    function calcResists(unit) {
        $.each(unit.equipment, function (slot, item) {
            if (item != null && item.resist != null) {
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
        unitName.textContent = unit.name;
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