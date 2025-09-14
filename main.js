// @framework-migration-guide
// This file contains the core logic for the character customization engine.
// When migrating to a framework like Angular or Vue, this logic can be split into different parts:
// - Services: For handling data and business logic (e.g., fetching items, equipping items).
// - Components: For rendering the UI and handling user interactions.
// - State Management: For managing the application's state (e.g., the character's equipped items).

// --- DATABASE / SERVICE ---
// @framework-migration-guide
// This object acts as a simulated database.
// In Angular/Vue, this would be a "Service" (e.g., `ItemService`).
// This service would be responsible for fetching and providing item data, 
// likely from a real backend API in a production application.
const masterItemList = {
    // ---- Ropa Interior ----
    'bra_1': { name: { es: 'Sujetador Básico', en: 'Basic Bra' }, type: 'bra', path: './img/bra/bra_1.png', requiredAffinity: 40 },
    'bra_2': { name: { es: 'Sujetador de Encaje', en: 'Lace Bra' }, type: 'bra', path: './img/bra/bra_2.png', requiredAffinity: 40 },
    'pantsus_1': { name: { es: 'Braguitas Básicas', en: 'Basic Panties' }, type: 'pantsus', path: './img/pantsus/pantsus_1.png', requiredAffinity: 40 },
    'pantsus_2': { name: { es: 'Braguitas de Lazo', en: 'Ribbon Panties' }, type: 'pantsus', path: './img/pantsus/pantsus_2.png', requiredAffinity: 40 },
    
    // ---- Ropa Casual ----
    'cheap_shirt': { name: { es: 'Camisa Barata', en: 'Cheap Shirt' }, type: 'top', path: './img/tops/cheap_shirt.png' },
    'good_shirt': { name: { es: 'Camisa Buena', en: 'Good Shirt' }, type: 'top', path: './img/tops/good_shirt.png' },
    'casual_top': { name: { es: 'Top Casual', en: 'Casual Top' }, type: 'top', path: './img/tops/casual_top.png' },
    'cheap_pants': { name: { es: 'Pantalones Baratos', en: 'Cheap Pants' }, type: 'bottom', path: './img/bottoms/cheap_pants.png' },
    'good_pants': { name: { es: 'Pantalones Buenos', en: 'Good Pants' }, type: 'bottom', path: './img/bottoms/good_pants.png' },
    'mini_skirt': { name: { es: 'Mini Falda', en: 'Mini Skirt' }, type: 'bottom', path: './img/bottoms/mini_skirt.png' },
    
    // ---- Trajes y Sets Temáticos ----
    'bunny_suit': { name: { es: 'Traje de Conejita', en: 'Bunny Suit' }, type: 'suit', path: './img/suits/bunny_suit.png', requiredAffinity: 70 },
    'bunny_ears': { name: { es: 'Orejas de Coneja', en: 'Bunny Ears' }, type: 'head', path: './img/head/bunny_ears.png', requiredAffinity: 70 },
    'bunny_stocks': { name: { es: 'Medias de Conejita', en: 'Bunny Stockings' }, type: 'stockings', path: './img/stocks/bunny_stocks.png', requiredAffinity: 70 },
    'east_suit': { name: { es: 'Atuendo Oriental', en: 'Eastern Outfit' }, type: 'suit', path: './img/suits/east_suit.png', requiredAffinity: 70 },
    'east_stocks': { name: { es: 'Medias Orientales', en: 'Eastern Stockings' }, type: 'stockings', path: './img/stocks/east_stocks.png', requiredAffinity: 70 },
    'leotard': { name: { es: 'Leotardo', en: 'Leotard' }, type: 'suit', path: './img/suits/leotard.png', requiredAffinity: 80 },
    'maid_diadema': { name: { es: 'Diadema de Doncella', en: 'Maid Diadem' }, type: 'head', path: './img/head/maid_diadema.png', requiredAffinity: 50 },
    'maid_top': { name: { es: 'Top de Doncella', en: 'Maid Top' }, type: 'top', path: './img/tops/maid_top.png', requiredAffinity: 50 },
    'maid_skirt': { name: { es: 'Falda de Doncella', en: 'Maid Skirt' }, type: 'bottom', path: './img/bottoms/maid_skirt.png', requiredAffinity: 50 },
    'maid_stocks': { name: { es: 'Medias de Doncella', en: 'Maid Stockings' }, type: 'stockings', path: './img/stocks/maid_stocks.png', requiredAffinity: 50 },
    'maid_guantelets': { name: { es: 'Guantes de Doncella', en: 'Maid Gauntlets' }, type: 'hands', path: './img/hands/maid_guantelets.png', requiredAffinity: 50 },
    'neko_ears': { name: { es: 'Orejas de Gato', en: 'Cat Ears' }, type: 'head', path: './img/head/neko_ears.png' },
    
    // ---- Equipamiento de Cuero (Crafteable) ----
    'leather_shirt': { name: { es: 'Coraza de Cuero', en: 'Leather Cuirass' }, type: 'top', path: './img/tops/leather_shirt.png' },
    'leather_skirt': { name: { es: 'Falda de Cuero', en: 'Leather Skirt' }, type: 'bottom', path: './img/bottoms/leather_skirt.png' },
    'leather_guantelets': { name: { es: 'Guanteletes de Cuero', en: 'Leather Gauntlets' }, type: 'hands', path: './img/hands/leather_guantelets.png' },
    'leather_stocks': { name: { es: 'Medias de Cuero', en: 'Leather Stockings' }, type: 'stockings', path: './img/stocks/leatherStocks.png' },

    // ---- Equipamiento de Acero (Crafteable) ----
    'steel_armor': { name: { es: 'Armadura de Acero', en: 'Steel Armor' }, type: 'top', path: './img/tops/steel_armor.png' },
    'steel_skirt': { name: { es: 'Falda de Acero', en: 'Steel Skirt' }, type: 'bottom', path: './img/bottoms/steel_skirt.png' },
    'steel_guantelets': { name: { es: 'Guanteletes de Acero', en: 'Steel Gauntlets' }, type: 'hands', path: './img/hands/steel_guantelets.png' },
    'steel_stocks': { name: { es: 'Mallas de Acero', en: 'Steel Stockings' }, type: 'stockings', path: './img/stocks/steel_stocks.png' },

    // ---- Equipamiento de Escamas (Crafteable) ----
    'scale_armor': { name: { es: 'Coraza de Escamas', en: 'Scale Cuirass' }, type: 'top', path: './img/tops/scale_armor.png' },
    'scale_skirt': { name: { es: 'Falda de Escamas', en: 'Scale Skirt' }, type: 'bottom', path: './img/bottoms/scale_skirt.png' },
    'scale_guantelets': { name: { es: 'Guanteletes de Escamas', en: 'Scale Gauntlets' }, type: 'hands', path: './img/hands/scale_guantelets.png' },
    'scale_stocks': { name: { es: 'Medias de Escamas', en: 'Scale Stockings' }, type: 'stockings', path: './img/stocks/scale_stocks.png' },

    // ---- Armas ----
    'wooden_sword': { name: { es: 'Espada de Madera', en: 'Wooden Sword' }, type: 'weapon', path: './img/items/sword_wood.png', effects: { missionBonus: { nothingChance: -0.05, itemChance: 0.05 } } },
    'iron_sword': { name: { es: 'Espada de Hierro', en: 'Iron Sword' }, type: 'weapon', path: './img/items/sword_iron.png', effects: { missionBonus: { nothingChance: -0.15, itemChance: 0.15 } } },
    'steel_sword': { name: { es: 'Espada de Acero', en: 'Steel Sword' }, type: 'weapon', path: './img/items/sword_steel.png', effects: { missionBonus: { nothingChance: -0.25, itemChance: 0.25 } } },
    
    // ---- Consumibles ----
    'energy_drink': { name: { es: 'Bebida Energética', en: 'Energy Drink' }, type: 'consumable', path: './img/items/energy_drink.png', effects: { energy: 25 } },
    
    // ---- Materiales ----
    'wood_plank': { name: { es: 'Tabla de Madera', en: 'Wood Plank' }, type: 'material', path: './img/items/wood.png' },
    'iron_ore': { name: { es: 'Mena de Hierro', en: 'Iron Ore' }, type: 'material', path: './img/items/iron.png' },
    'steel_ingot': { name: { es: 'Lingote de Acero', en: 'Steel Ingot' }, type: 'material', path: './img/items/steel.png' },

    // ---- Recetas ----
    'recipe_steel_sword': { name: { es: 'Receta: Espada de Acero', en: 'Recipe: Steel Sword' }, type: 'recipe', path: './img/items/recipe.png', recipeId: 'steel_sword_recipe' },
};

const expressionList = {
    'eyes_1': { name: { es: 'Ojos Normales', en: 'Normal Eyes' }, type: 'eyes', path: './img/expressions/eyes_1.png' },
    'eyes_angry': { name: { es: 'Ojos Enojados', en: 'Angry Eyes' }, type: 'eyes', path: './img/expressions/eyes_angry.png' },
    'eyes_blush': { name: { es: 'Ojos Sonrojados', en: 'Blush Eyes' }, type: 'eyes', path: './img/expressions/eyes_blush.png' },
    'eyes_happy': { name: { es: 'Ojos Felices', en: 'Happy Eyes' }, type: 'eyes', path: './img/expressions/eyes_happy.png' },
    'eyes_surprised': { name: { es: 'Ojos Sorprendidos', en: 'Surprised Eyes' }, type: 'eyes', path: './img/expressions/eyes_surprised.png' },
    'mouth_1': { name: { es: 'Boca Normal', en: 'Normal Mouth' }, type: 'mouth', path: './img/expressions/mouth_1.png' },
    'mouth_angry': { name: { es: 'Boca Enojada', en: 'Angry Mouth' }, type: 'mouth', path: './img/expressions/mouth_angry.png' },
    'mouth_blush': { name: { es: 'Boca Sonrojada', en: 'Blush Mouth' }, type: 'mouth', path: './img/expressions/mouth_blush.png' },
    'mouth_happy': { name: { es: 'Boca Feliz', en: 'Happy Mouth' }, type: 'mouth', path: './img/expressions/mouth_happy.png' },
    'mouth_surprised': { name: { es: 'Boca Sorprendida', en: 'Surprised Mouth' }, type: 'mouth', path: './img/expressions/mouth_surprised.png' },
};

// --- STATE MANAGEMENT ---
// @framework-migration-guide
// This object holds the application's state.
// In Angular, this could be managed by a `CharacterStateService` or a state management library like NgRx.
// In Vue, this would be part of a component's `data` or managed by a library like Vuex or Pinia.
const characterState = {
    equipped: {
        top: 'cheap_shirt',
        bottom: 'cheap_pants',
        suit: null,
        head: null,
        stockings: null,
        bra: 'bra_1',
        pantsus: 'pantsus_1',
        hands: null,
        weapon: null,
    },
    expression: {
        eyes: 'eyes_1',
        mouth: 'mouth_1'
    }
};

// --- COMPONENT LOGIC / IMAGE RENDERING ---
/**
 * @framework-migration-guide
 * This function's logic would be part of a "CharacterDisplay" component.
 * The framework's rendering engine would handle updating the view automatically when the state changes.
 * This function handles updating the src attribute of the character's image layers.
 */
function renderCharacter() {
    // Base body and expressions
    document.getElementById('character-body').src = 'img/character/base.png';
    document.getElementById('character-eyes').src = expressionList[characterState.expression.eyes].path;
    document.getElementById('character-mouth').src = expressionList[characterState.expression.mouth].path;

    // Equipment layers
    const equipmentTypes = ['pantsus', 'bra', 'bottom', 'stockings', 'top', 'suit', 'hands', 'head'];
    equipmentTypes.forEach(type => {
        const layer = document.getElementById(`character-${type}`);
        const itemId = characterState.equipped[type];
        if (itemId && masterItemList[itemId]) {
            layer.src = masterItemList[itemId].path;
            layer.style.display = 'block';
        } else {
            layer.src = '';
            layer.style.display = 'none';
        }
    });
}


// --- SERVICE LOGIC ---
/**
 * @framework-migration-guide
 * This function contains business logic for equipping items.
 * This would be a method in a "CharacterService" or "EquipmentService".
 * @param {string} itemId - The ID of the item from masterItemList.
 */
function toggleEquip(itemId, event) {
    const itemData = masterItemList[itemId];
    if (!itemData) {
        console.error(`El objeto con id '${itemId}' no existe.`);
        return;
    }

    const itemType = itemData.type;
    const equipped = characterState.equipped;

    const EQUIPABLE_TYPES = ['top', 'bottom', 'suit', 'head', 'stockings', 'bra', 'pantsus', 'hands', 'weapon'];
    if (!EQUIPABLE_TYPES.includes(itemType)) {
        console.log(`El objeto '${itemId}' no es equipable.`);
        return;
    }

    const isCurrentlyEquipped = equipped[itemType] === itemId;

    // Remove active class from all buttons in the same group
    const buttons = document.querySelectorAll(`.accordion-content button`);
    buttons.forEach(button => {
        const buttonItemId = button.getAttribute('onclick').replace("toggleEquip('", "").replace("', event)", "");
        const buttonItemData = masterItemList[buttonItemId];
        if (buttonItemData && buttonItemData.type === itemType) {
            button.classList.remove('active');
        }
    });

    if (isCurrentlyEquipped) {
        equipped[itemType] = null;
    } else {
        equipped[itemType] = itemId;

        if (itemType === 'suit') {
            equipped.top = null;
            equipped.bottom = null;
            equipped.bra = null;
            equipped.pantsus = null;
        } else if (['top', 'bottom', 'bra', 'pantsus'].includes(itemType)) {
            equipped.suit = null;
        }
        // Add active class to the clicked button
        if (event) {
            event.target.classList.add('active');
        }
    }
    
    // Re-render the character after state change
    renderCharacter();
}

function setExpression(expressionId, event) {
    const expressionData = expressionList[expressionId];
    if (!expressionData) {
        console.error(`La expresión con id '${expressionId}' no existe.`);
        return;
    }

    const expressionType = expressionData.type; // 'eyes' or 'mouth'
    characterState.expression[expressionType] = expressionId;

    // Update active class for buttons
    const buttons = document.querySelectorAll(`.accordion-content button`);
    buttons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr && onclickAttr.startsWith("setExpression")) {
            const buttonExpressionId = onclickAttr.match(/'([^']+)'/)[1];
            const buttonExpressionData = expressionList[buttonExpressionId];
            if (buttonExpressionData && buttonExpressionData.type === expressionType) {
                button.classList.remove('active');
            }
        }
    });

    if (event) {
        event.target.classList.add('active');
    }

    renderCharacter();
}

function downloadCharacter() {
    const characterDisplay = document.getElementById('character-display');
    html2canvas(characterDisplay).then(canvas => {
        const link = document.createElement('a');
        link.download = 'character.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function saveState() {
    localStorage.setItem('characterCustomEngineState', JSON.stringify(characterState));
    alert('Character state saved!');
}

function loadState() {
    const savedState = localStorage.getItem('characterCustomEngineState');
    if (savedState) {
        const loadedState = JSON.parse(savedState);
        Object.assign(characterState.equipped, loadedState.equipped);
        Object.assign(characterState.expression, loadedState.expression);
    }
}

// --- APPLICATION INITIALIZATION ---
// @framework-migration-guide
// This is the application's entry point.
// In a framework, this is handled by the framework's own bootstrap process (e.g., main.ts in Angular).
// The logic inside would be moved to a root component's lifecycle hook (e.g., `ngOnInit` or `mounted`).
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderCharacter();

    // Add active class to initially equipped items' buttons
    for (const type in characterState.equipped) {
        const itemId = characterState.equipped[type];
        if (itemId) {
            const button = document.querySelector(`button[onclick="toggleEquip('${itemId}', event)"]`);
            if (button) {
                button.classList.add('active');
            }
        }
    }

    // Add active class to initial expressions' buttons
    for (const type in characterState.expression) {
        const expressionId = characterState.expression[type];
        if (expressionId) {
            const button = document.querySelector(`button[onclick="setExpression('${expressionId}', event)"]`);
            if (button) {
                button.classList.add('active');
            }
        }
    }

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle('open');
        });
    });
});

// --- PIPES / FILTERS ---
// @framework-migration-guide
// Although not present in the current code, if you had functions to format data
// (e.g., capitalizing names, formatting dates), they could be migrated to "Pipes" in Angular
// or "Filters" in Vue for use in templates.
// Example:
// function formatItemName(item) { return item.name.es.toUpperCase(); }
// In a template: {{ item | formatItemName }}
''
