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
        eyes: './img/expressions/eyes_1.png',
        mouth: './img/expressions/mouth_1.png'
    }
};

// --- COMPONENT LOGIC / CANVAS RENDERING ---
/**
 * @framework-migration-guide
 * This function's logic would be part of a "CharacterDisplay" component.
 * The framework's rendering engine would handle updating the view automatically when the state changes.
 * This function handles loading images and drawing them on the canvas.
 */
async function renderCharacterOnCanvas() {
    const canvas = document.getElementById('character-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    // Define the correct rendering order
    const renderOrder = [
        { path: 'img/character/base.png' }, // Base character image
        characterState.equipped.pantsus,
        characterState.equipped.bra,
        characterState.equipped.bottom,
        characterState.equipped.stockings,
        characterState.equipped.top,
        characterState.equipped.suit,
        characterState.equipped.hands,
        characterState.equipped.head,
        { path: characterState.expression.eyes },
        { path: characterState.expression.mouth }
    ];

    const imagePaths = renderOrder
        .map(item => {
            if (typeof item === 'string' && masterItemList[item]) {
                return masterItemList[item].path;
            }
            if (typeof item === 'object' && item !== null && item.path) {
                return item.path;
            }
            return null;
        })
        .filter(path => path !== null);

    try {
        const images = await Promise.all(imagePaths.map(loadImage));
        
        // Clear canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw images in order
        images.forEach(img => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
    } catch (error) {
        console.error("Error loading character images:", error);
    }
}


// --- SERVICE LOGIC ---
/**
 * @framework-migration-guide
 * This function contains business logic for equipping items.
 * This would be a method in a "CharacterService" or "EquipmentService".
 * @param {string} itemId - The ID of the item from masterItemList.
 */
function toggleEquip(itemId) {
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
    }
    
    // Re-render the character on the canvas after state change
    renderCharacterOnCanvas();
}

// --- APPLICATION INITIALIZATION ---
// @framework-migration-guide
// This is the application's entry point.
// In a framework, this is handled by the framework's own bootstrap process (e.g., main.ts in Angular).
// The logic inside would be moved to a root component's lifecycle hook (e.g., `ngOnInit` or `mounted`).
document.addEventListener('DOMContentLoaded', () => {
    renderCharacterOnCanvas();
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