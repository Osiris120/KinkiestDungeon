"use strict";

let KinkyDungeonStatStaminaCostAttack = -1.0; // Cost to attack

let KDWeaponLootList: Record<string, Record<string, number>> = {
	"CommonWeapon": {
		"Sword": 1,
		"Spear": 1,
		"Hammer": 1,
		"Axe": 1,
		"Knife": 2.5,
		"Flail": 1,
		"Shield": 1.5,
		"Foil": 1,
		"Pike": 0.5,
		"Katana": 0.5,
		"Rapier": 0.5,
		"Dirk": 1.5,
	},
	"CommonToy": {
		"Feather": 1,
		"Crop": 1,
		"IceCube": 1,
		"VibeWand": 1,
		"DildoBat": 1,
		"Scissors": 1,
	},
};

/**
 */
let KinkyDungeonWeapons: Record<string, weapon> = {
	"Unarmed": {name: "Unarmed", damage: 2, chance: 0.9, type: "unarmed", unarmed: true, rarity: 0, shop: false, noequip: true, sfx: "Unarmed",
		tags: ["unarmed"],
		//tease: true,
		events: [
			{type: "ElementalEffectOnDisarm", trigger: "playerAttack", power: 0, damage: "stun", time: 3, chance: 0.5, sfx: "Slap"}
		],
	},


	"Rock": {name: "Rock", damage: 1.5, chance: 0.8, staminacost: 3.8, type: "crush",
		unarmed: false, rarity: 0, shop: true, heavy: true, sfx: "HeavySwing",
		crit: 1.5,
		tags: ["rock"],
		stam50mult: 2.0,
		events: [
			{type: "ElementalEffectCrit", trigger: "playerAttack", power: 0, damage: "stun", time: 6, sfx: "Slap"}
		],
	},

	// Knives
	"Knife": {name: "Knife", damage: 2.0, chance: 1.1, staminacost: 1.5, type: "slash", unarmed: false, rarity: 1, cutBonus: 0.05, shop: true, sfx: "Unarmed", light: true,
		crit: 1.5,
		tags: ["knife"],
		events: [
			{type: "blockBuff", trigger: "tick",  offhand: true, offhandonly: true, power: 0.1},
		],
	},
	"EnchKnife": {name: "EnchKnife", damage: 2.5, chance: 1.1, staminacost: 1.5, type: "cold", unarmed: false, rarity: 3, cutBonus: 0.05, magic: true, shop: true, sfx: "MagicSlash", light: true,
		crit: 1.5,
		tags: ["knife"],
		events: [
			{type: "buffMagicCrit", trigger: "calcCrit",  offhand: true, offhandonly: true, power: 0.2},
		],
	},
	"Dirk": {name: "Dirk", damage: 2.5, chance: 1.15, staminacost: 1.8, type: "slash", unarmed: false, rarity: 2, shop: true, cutBonus: 0.05, light: true, sfx: "LightSwing",
		crit: 1.75,
		tags: ["knife"],
		events: [
			{type: "ChangeDamageUnaware", trigger: "beforePlayerAttack", power: 4, damage: "pierce"},
			{type: "buffWeaponCrit", trigger: "calcCrit",  offhand: true, offhandonly: true, power: 0.1},
		],
	},

	// Shields
	"Shield": {name: "Shield", damage: 2.0, chance: 0.6, staminacost: 5.5,  type: "crush", unarmed: false, rarity: 2, shop: false, sfx: "HeavySwing",
		crit: 1.1,
		clumsy: true,
		tags: ["shield"],
		events: [
			{type: "blockBuff", trigger: "tick", power: 0.6, offhand: true, kind: "Shield",},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "stun", time: 4}
		]},
	"ShieldTower": {name: "ShieldTower", damage: 4.0, chance: 0.25, staminacost: 6.0,  type: "crush", unarmed: false, rarity: 4, shop: true, sfx: "HeavySwing",
		clumsy: true, heavy: true, massive: true,
		crit: 1.1, channelslow: true,
		tags: ["shield"],
		events: [
			{type: "armorBuff", trigger: "tick", offhand: true, kind: "Shield", power: 3.0},
			{type: "blockBuff", trigger: "tick", offhand: true, kind: "Shield", power: 1.2},
			{type: "slowLevel", trigger: "tick", offhand: true, kind: "Shield", power: 1},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "stun", time: 7}
		]},
	"ShieldReinforced": {name: "ShieldReinforced", damage: 3.0, chance: 0.4, staminacost: 5.5,  type: "crush", unarmed: false, rarity: 3, shop: true, sfx: "HeavySwing",
		crit: 1.1,
		clumsy: true, heavy: true,
		tags: ["shield"],
		events: [
			{type: "armorBuff", trigger: "tick", offhand: true, kind: "Shield", power: 1.5},
			{type: "blockBuff", trigger: "tick", offhand: true, kind: "Shield", power: 0.8},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "stun", time: 5}
		]},
	"ShieldMagic": {name: "ShieldMagic", damage: 3.0, chance: 0.4, staminacost: 5.5,  type: "crush", unarmed: false, rarity: 4, shop: true, sfx: "HeavySwing",
		crit: 1.1,
		clumsy: true, heavy: true,
		tags: ["shield"],
		events: [
			{type: "spellWardBuff", trigger: "tick", offhand: true, kind: "Shield", power: 2.0},
			{type: "blockBuff", trigger: "tick",  offhand: true, kind: "Shield", power: 0.8},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "stun", time: 5}
		]},

	// Swords
	"Sword": {name: "Sword", damage: 3, chance: 1.5, staminacost: 2.4, type: "slash", unarmed: false, rarity: 2, shop: false, cutBonus: 0.01,
		tags: ["sword"],
		sfx: "LightSwing"},
	"ChainSword": {name: "ChainSword", damage: 2.5, bind: 1.0, bindType: "Metal", addBind: true, chance: 1.6, staminacost: 2.4, type: "slash", unarmed: false, rarity: 3, shop: true, cutBonus: 0.01,
		tags: ["sword", "bondage"],
		sfx: "Chain"},
	"SlimeSword": {name: "SlimeSword", damage: 2.4, bind: 2.5, bindEff: 0, bindType: "Slime", addBind: true, chance: 1.3, staminacost: 2.6, type: "glue", unarmed: false, rarity: 3, shop: true,
		tags: ["sword", "bondage"],
		sfx: "RubberBolt"},
	"Katana": {name: "Katana", damage: 3, chance: 1.5, staminacost: 3.0, type: "slash", unarmed: false, rarity: 4, shop: true, cutBonus: 0.01, sfx: "LightSwing",
		tags: ["sword"],
		crit: 1.5,
		events: [
			{type: "Patience", trigger: "tick", power: 11, buffType: "KatanaCharge", color: "#ffffff"},
			{type: "KatanaBoost", trigger: "beforePlayerAttack", power: 0.25, sfx: "Fwoosh"},
		]
	},
	"DarkKatana": {name: "DarkKatana", damage: 3, chance: 2.0, staminacost: 2.6, type: "cold", unarmed: false, rarity: 5, shop: false, magic: true, cutBonus: 0.01, sfx: "LightSwing",
		tags: ["sword"],
		crit: 2.0,
		events: [
			{type: "DamageMultInShadow", trigger: "beforePlayerAttack", power: 2.0, sfx: "Fwoosh"},
		]
	},
	"MagicSword": {name: "MagicSword", damage: 3, chance: 2, staminacost: 2.3, type: "slash", unarmed: false, rarity: 6, shop: false, magic: true, cutBonus: 0.1,
		tags: ["sword"],
		sfx: "LightSwing"},
	"Flamberge": {name: "Flamberge", damage: 2.0, chance: 1.0, staminacost: 2.8, type: "fire", unarmed: false, rarity: 4, shop: true, cutBonus: 0.1, sfx: "FireSpell", magic: true,
		tags: ["illum", "sword"],
		events: [{type: "ElementalEffect", trigger: "playerAttack", power: 2.0, damage: "slash"}, {type: "WeaponLight", trigger: "getLights", offhand: true, power: 5}],
		special: {type: "ignite"},},
	"FrostSword": {name: "FrostSword", damage: 1.5, chance: 1.0, staminacost: 2.5, type: "slash", unarmed: false, rarity: 4, shop: true, cutBonus: 0.1, sfx: "LesserFreeze", magic: true,
		tags: ["illum", "sword"],
		events: [{type: "ElementalEffect", trigger: "playerAttack", power: 2.0, time: 5, damage: "frost"}, {type: "WeaponLight", trigger: "getLights", power: 3, color: "#92e8c0"}]
	},
	"Foil": {name: "Foil", damage: 0.8, chance: 1.5, staminacost: 1.5, type: "pierce", unarmed: false, rarity: 3, shop: true, sfx: "Miss",
		tags: ["sword"],
		crit: 2.0,
		events: [
			{type: "ChangeDamageVulnerable", trigger: "beforePlayerAttack", power: 3.0, damage: "pierce"},
		],
	},
	"Rapier": {name: "Rapier", damage: 2.5, chance: 1.3, staminacost: 3.0, type: "slash", unarmed: false, rarity: 4, shop: true, sfx: "LightSwing",
		tags: ["sword"],
		crit: 1.5,
		events: [
			{type: "ChangeDamageVulnerable", trigger: "beforePlayerAttack", power: 5.0, damage: "pierce"},
		],
	},

	// Axes
	"Axe": {name: "Axe", damage: 2.4, chance: 1.0, staminacost: 3, type: "slash", unarmed: false, rarity: 2, shop: false, sfx: "HeavySwing",
		tags: ["axe"],
		stam50mult: 1.5,
		events: [{type: "Cleave", trigger: "playerAttack", power: 2, damage: "slash"}]},
	"MagicAxe": {name: "MagicAxe", damage: 2.8, chance: 1.0, staminacost: 3, type: "cold", unarmed: false, rarity: 6, magic: true, shop: false, cutBonus: 0.2, sfx: "HeavySwing",
		tags: ["axe"],
		stam50mult: 1.5,
		events: [{type: "Cleave", trigger: "playerAttack", power: 2, damage: "cold", time: 3}, {type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "cold", time: 3}]},

	// Hammers
	"Hammer": {name: "Hammer", damage: 2.5, chance: 1.0, staminacost: 4, type: "crush", unarmed: false, rarity: 2, shop: true, sfx: "HeavySwing", cutBonus: 0.01,
		tags: ["hammer"],
		crit: 1.2,
		stam50mult: 2,
		clumsy: true,
		events: [{type: "Knockback", trigger: "playerAttack", dist: 1}]},
	"Maul": {name: "Maul", damage: 5, chance: 1.0, staminacost: 6, type: "crush", unarmed: false, rarity: 3, shop: true, sfx: "HeavySwing",
		tags: ["hammer"],
		crit: 1.5,
		stam50mult: 1.25,
		heavy: true,
		clumsy: true,
		events: [{type: "Knockback", trigger: "playerAttack", dist: 2},
			{type: "ElementalEffectOnBarricade", trigger: "playerAttack", power: 10, damage: "crush", sfx: "HeavyThudPixel"}]},
	"MagicHammer": {name: "MagicHammer", damage: 3, chance: 1.0, staminacost: 3.5, type: "crush", unarmed: false, rarity: 7, magic: true, shop: false, cutBonus: 0.01, sfx: "HeavySwing",
		tags: ["hammer"],
		crit: 1.2,
		stam50mult: 2,
		clumsy: true,
		events: [{type: "Knockback", trigger: "playerAttack", dist: 1}]},
	"IceBreaker": {name: "IceBreaker", damage: 2.0, chance: 1.2, staminacost: 2.4, type: "crush", unarmed: false, rarity: 5, magic: true, shop: false, sfx: "HeavySwing",
		tags: ["hammer"],
		stam50mult: 2.0,
		clumsy: true,
		events: [{type: "MultiplyDamageFrozen", trigger: "beforeDamageEnemy", power: 1.5}]},
	"StormBreaker": {name: "StormBreaker", damage: 2.0, chance: 1.0, staminacost: 2.6, type: "crush", unarmed: false, rarity: 5, magic: true, shop: false, sfx: "HeavySwing",
		tags: ["hammer"],
		crit: 1.4,
		stam50mult: 2.0,
		clumsy: true,
		events: [
			{type: "StormBreakerDamage", trigger: "playerAttack", power: 4.0, sfx: "Shock", aoe: 1.5, damage: "electric"},
			{type: "StormBreakerCharge", trigger: "beforePlayerDamage", power: 1.5, damageTrigger: "electric", color: "#3de1ff"},
		]},

	// Flails
	"Flail": {name: "Flail", damage: 2.5, chance: 1.4, staminacost: 2.8, type: "crush", unarmed: false, rarity: 2, shop: true, sfx: "LightSwing",
		tags: ["mace"],
		crit: 1.5,
		events: [{type: "Cleave", trigger: "playerAttack", power: 1, damage: "crush"}]},
	"MagicFlail": {name: "MagicFlail", damage: 2.5, chance: 1.5, staminacost: 3.0, type: "crush", unarmed: false, rarity: 5, magic: true, shop: false, sfx: "LightSwing",
		tags: ["mace"],
		crit: 2.0,
		events: [{type: "MagicFlail", trigger: "playerAttack", power: 2, damage: "cold", crit: 2.0}]},

	// Spears
	"Spear": {name: "Spear", damage: 4.0, chance: 1.0, staminacost: 3.3, type: "pierce", unarmed: false, rarity: 2, shop: false, sfx: "LightSwing",
		tags: ["spear"],
		crit: 1.4,
		special: {type: "attack", range: 2.99},
		events: [{type: "Pierce", trigger: "playerAttack", power: 4.0, damage: "pierce"}]},
	"Pike": {name: "Pike", damage: 4.4, chance: 1.0, staminacost: 3.5, type: "pierce", unarmed: false, rarity: 3, shop: false, sfx: "LightSwing",
		tags: ["spear"],
		crit: 1.25,
		clumsy: true,
		heavy: true,
		special: {type: "attack", range: 3.99},
		events: [{type: "Pierce", trigger: "playerAttack", power: 4.4, damage: "pierce"}]},
	"MagicSpear": {name: "MagicSpear", damage: 4.0, chance: 1.5, staminacost: 3.3, type: "pierce", unarmed: false, rarity: 5, magic: true, shop: true, sfx: "LightSwing",
		tags: ["spear"],
		crit: 1.5,
		special: {type: "attack", range: 2.99},
		events: [{type: "Pierce", trigger: "playerAttack", power: 4.0, damage: "pierce", dist: 2}]},

	// Specialty Weapons
	"StaffTape": {name: "StaffTape", damage: 1, bindEff: 2.0, bindType: "Tape", addBind: true, chance: 1.0, staminacost: 1.5, type: "chain", unarmed: false, rarity: 4, shop: true, sfx: "Tape", magic: false,
		tags: ["bondage"], noDamagePenalty: true,
		events: [
			{type: "ApplyTaped", trigger: "playerAttack", power: -0.15, duration: 12},
			{type: "DealDamageToTaped", trigger: "playerMove", power: 1.0, dist: 1.5, damage: "chain", addBind: true, bindType: "Tape", bindEff: 2.0, sfx: "TapeStruggle"},
		]
	},

	// Tier 1 Staves
	"StaffFlame": {name: "StaffFlame", damage: 4, chance: 0.85, staminacost: 5.0, type: "fire", unarmed: false, rarity: 3, shop: true, sfx: "MagicSlash", magic: true,
		tags: ["staff"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [{type: "Buff", kind: "Staff", trigger: "tick", power: 0.15, buffType: "fireDamageBuff", offhand: true}],
		special: {type: "ignite"},},
	"StaffChain": {name: "StaffChain", damage: 3, bindEff: 1.25, bindType: "Metal", addBind: true, chance: 1.1, staminacost: 3.0, type: "chain", unarmed: false, rarity: 4, shop: true, sfx: "Chain", magic: true,
		tags: ["staff", "bondage"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [{type: "Buff", kind: "Staff", trigger: "tick", power: 0.1, buffType: "chainDamageBuff", offhand: true},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "chain", time: 2}]},
	"StaffGlue": {name: "StaffGlue", damage: 3, bindEff: 1.5, bindType: "Slime", addBind: true, chance: 1.0, staminacost: 4.0, type: "glue", unarmed: false, rarity: 4, shop: true, sfx: "MagicSlash", magic: true,
		tags: ["staff", "bondage"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [{type: "Buff", kind: "Staff", trigger: "tick", power: 0.1, buffType: "glueDamageBuff", offhand: true}]},
	"StaffElectric": {name: "StaffElectric", damage: 3, chance: 1.1, staminacost: 4.0, type: "electric", unarmed: false, rarity: 3, shop: true, sfx: "Shock", magic: true,
		tags: ["staff"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [{type: "Buff", kind: "Staff", trigger: "tick", power: 0.1, buffType: "electricDamageBuff", offhand: true}, {type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "electric", time: 3, chance: 0.1}]},
	"StaffPermafrost": {name: "StaffPermafrost", damage: 4, chance: 1.0, staminacost: 4.0, type: "ice", unarmed: false, rarity: 3, shop: true, sfx: "MagicSlash", magic: true,
		tags: ["staff"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [{type: "Buff", kind: "Staff", trigger: "tick", power: 0.1, buffType: "iceDamageBuff", offhand: true},
			{type: "Buff", kind: "Staff", trigger: "tick", power: 0.1, buffType: "frostDamageBuff", offhand: true},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "ice", time: 4, chance: 0.15},
			{type: "MultiplyTime", trigger: "beforeDamageEnemy", power: 1.5, damage: "ice"}]},

	// Tier 2 Staves
	"StaffBind": {name: "StaffBind", damage: 2.3, bindEff: 1, bindType: "Metal", addBind: true, chance: 1.0, staminacost: 3.0, type: "chain", unarmed: false, rarity: 5, shop: true, sfx: "Chain", magic: true,
		tags: ["staff", "bondage"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [
			{type: "Buff", kind: "Staff", trigger: "tick", power: 0.2, buffType: "chainDamageBuff", offhand: true},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "chain", time: 4}]},
	"StaffIncineration": {name: "StaffIncineration", damage: 6, chance: 0.7, staminacost: 5.0, type: "fire", unarmed: false, rarity: 5, shop: true, sfx: "MagicSlash", magic: true,
		tags: ["staff"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [
			{type: "Buff", kind: "Staff", trigger: "tick", power: 0.25, buffType: "fireDamageBuff", offhand: true},
			{type: "AoEDamageBurning", trigger: "tick", aoe: 10, power: 0.5, damage: "fire"}],
		special: {type: "ignite"},},
	"StaffStorm": {name: "StaffStorm", damage: 4.5, chance: 1.0, staminacost: 4.5, type: "electric", unarmed: false, rarity: 7, shop: true, sfx: "Shock", magic: true,
		tags: ["staff"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [
			{type: "Buff", kind: "Staff", trigger: "tick", power: 0.2, buffType: "electricDamageBuff", offhand: true},
			{type: "EchoDamage", trigger: "beforeDamageEnemy", aoe: 2.99, power: 1.5, damage: "electric"}]},
	"StaffDoll": {name: "StaffDoll", damage: 3.0, chance: 1.0, staminacost: 4.0, type: "soul", unarmed: false, rarity: 6, shop: true, sfx: "MagicSlash", magic: true,
		tags: ["staff", "bondage"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [
			{type: "Buff", kind: "Staff", trigger: "tick", power: 0.15, buffType: "glueDamageBuff", offhand: true},
			{type: "Dollmaker", trigger: "capture"}]},
	"StaffFrostbite": {name: "StaffFrostbite", damage: 4, chance: 1.0, staminacost: 4.0, type: "ice", unarmed: false, rarity: 5, shop: true, sfx: "MagicSlash", magic: true,
		tags: ["staff"], noDamagePenalty: true,
		crit: 1.1,
		stamPenType: "Staff",
		events: [{type: "Buff", kind: "Staff", trigger: "tick", power: 0.2, buffType: "iceDamageBuff", offhand: true},
			{type: "Buff", kind: "Staff", trigger: "tick", power: 0.2, buffType: "frostDamageBuff", offhand: true},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "ice", time: 4, chance: 0.25},
			{type: "AoEDamageFrozen", trigger: "tick", aoe: 10, power: 0.5, damage: "ice"}]},

	// Tier 1 orbs
	"ArcaneCrystal": {name: "ArcaneCrystal", damage: 3.3, chance: 0.8, staminacost: 3.0, type: "arcane",
		noHands: true, unarmed: false, novulnerable: true, magic: true, rarity: 2, shop: true, sfx: "Laser",
		nocrit: true,
		stamPenType: "Staff",
		tags: ["illum"], noDamagePenalty: true,
		angle: 0,
		events: [{type: "WeaponLight", trigger: "getLights", offhand: true, power: 3.5, color: "#6700ff"}, {type: "Float", trigger: "draw"}, ]},
	"ArcaneTome": {name: "ArcaneTome", damage: 1.5, chance: 1.0, staminacost: 1.5, crit: 1.0,
		tags: ["tome"], noDamagePenalty: true,
		type: "arcane", unarmed: false, novulnerable: true, magic: true, rarity: 2, shop: true, sfx: "Laser",
		nocrit: true,
		angle: 0,
		stamPenType: "Staff",
		special: {type: "spell", selfCast: true, spell: "TomeArcane", prereq: "HasWill"},
		events: [
			{type: "Buff", kind: "Book", trigger: "tick", power: 0.05, buffType: "magicDamageBuff", offhand: true},
		]},
	"BondageTome": {name: "BondageTome", damage: 1.5, chance: 1.0, staminacost: 1.5, crit: 1.0,
		tags: ["tome"], noDamagePenalty: true,
		type: "chain", unarmed: false, novulnerable: true, magic: true, rarity: 3, shop: true, sfx: "Chain",
		nocrit: true,
		angle: 0,
		stamPenType: "Staff",
		bindType: "Magic", bindEff: 1.5, bindcrit: 2.0, addBind: true,
		special: {type: "spell", selfCast: true, spell: "TomeBondage", prereq: "HasWill"},
		events: [
			{type: "Buff", kind: "Book", trigger: "tick", power: 0.1, buffType: "BindAmp", offhand: true},
		]},

	// Techy
	"Slimethrower": {name: "Slimethrower", damage: 3.5, chance: 1.0, staminacost: 6.0, type: "crush", unarmed: false, rarity: 6, shop: false, sfx: "HeavySwing",
		tags: ["ranged"],
		crit: 1.1,
		angle: 0,
		special: {type: "spell", spell: "Slimethrower", requiresEnergy: true, energyCost: 0.015}},
	"EscortDrone": {name: "EscortDrone", damage: 1.5, chance: 1.0, staminacost: 0.0, type: "electric", noHands: true, unarmed: false, rarity: 5, shop: false, sfx: "Laser",
		tags: ["illum", "drone"], noDamagePenalty: true,
		crit: 1.1,
		angle: 0,
		events: [{type: "ElementalEffect", trigger: "playerAttack", power: 0, chance: 0.33, damage: "electric", time: 4},
			{type: "Float", trigger: "draw"}, {type: "WeaponLight", offhand: true, trigger: "getLights", power: 4}]},

	// Special
	"BoltCutters": {name: "BoltCutters", damage: 3.5, staminacost: 3.8, chance: 1.0, type: "crush", unarmed: false, rarity: 4, shop: false, cutBonus: 0.3, sfx: "Unarmed",
		tags: ["utility"],
		crit: 1.1,
		events: [{type: "DamageToTag", trigger: "playerAttack", requiredTag: "lock", power: 7, damage: "slash", chance: 1.0}]},
	"Pickaxe": {name: "Pickaxe", damage: 3, chance: 1.0, staminacost: 3.0, type: "pierce", unarmed: false, rarity: 3, shop: true, sfx: "LightSwing",
		tags: ["utility"],
		crit: 1.4,
		digSpell: "Pickaxe",
		special: {type: "spell", spell: "Pickaxe", range: 1.5},
		events: [{type: "ApplyBuff", trigger: "playerAttack", buff: {id: "ArmorDown", type: "ArmorBreak", duration: 6, power: -1.5, player: true, enemies: true, tags: ["debuff", "armor"]}}]},
	"Torch": {name: "Torch", damage: 1.5, chance: 0.75, type: "fire", unarmed: false, rarity: 1, shop: true, sfx: "FireSpell",
		crit: 1.1, noDamagePenalty: true,
		angle: 0,
		tags: ["illum", "utility"],
		events: [{type: "WeaponLight", trigger: "getLights", offhand: true, power: 5, color: "#ff8933"}],
		special: {type: "ignite"},},
	"Flashlight": {name: "Flashlight", damage: 1.0, chance: 1.0, type: "crush", unarmed: false, rarity: 2, shop: true, sfx: "Miss", light: true,
		crit: 1.1,
		angle: 0,
		tags: ["illum", "utility"],
		events: [{type: "WeaponLightDirectional", trigger: "getLights", offhand: true, power: 7, dist: 5, color: "#ffdd00"}],
	},

	// BDSM Gear
	"Feather": {name: "Feather", damage: 0.1, chance: 1.25,
		tags: ["toy"],
		crit: 2.0,
		events: [
			{type: "ElementalEffectStamCost", trigger: "playerAttack", power: 0.1, distract: 1, damage: "tickle", offhand: true, offhandonly: true, cost: 0.3, sfx: "Tickle"},
		],
		staminacost: 0.5, distract: 2, type: "tickle", unarmed: false, rarity: 1, shop: true, sfx: "Tickle"},
	"Duster": {name: "Duster", damage: 1.5, chance: 1.5,
		tags: ["toy"],
		crit: 2.5,
		events: [
			{type: "ElementalEffectStamCost", trigger: "playerAttack", power: 0, distract: 1.5, damage: "tickle", offhand: true, offhandonly: true, sfx: "Tickle", cost: 0.1},
		],
		staminacost: 1.0, distract: 4, type: "tickle", unarmed: false, rarity: 2, shop: true, sfx: "Tickle"},
	"Crop": {name: "Crop", damage: 2.5, chance: 1.0, staminacost: 2.0,
		tags: ["toy"],
		events: [
			{type: "ElementalEffectStamCost", trigger: "playerAttack", power: 0.5, damage: "pain", offhand: true, offhandonly: true, cost: 0.3, sfx: "Whip"},
		],
		crit: 1.8, distract: 3, type: "pain", tease: true, unarmed: false, rarity: 2, shop: true, sfx: "Whip"},
	"IceCube": {name: "IceCube", damage: 1.5, chance: 1.0, staminacost: 1.0,
		tags: ["toy"], noDamagePenalty: true,
		crit: 2.0,
		distract: 1, type: "ice", tease: true, unarmed: false, rarity: 2, shop: true, sfx: "Freeze",
		events: [
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "ice", time: 3, chance: 0.1},
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "frost", time: 2, offhand: true},
		]
	},
	"Rope": {name: "Rope", damage: 1.0, bind: 5, chance: 1.0, staminacost: 1.0, type: "chain",
		tags: ["bondage"],
		crit: 1.1, unarmed: false, rarity: 1, shop: true, sfx: "Struggle", addBind: true, bindType: "Rope"},
	"MagicRope": {name: "MagicRope", damage: 1.0, bind: 5, chance: 1.0, staminacost: 1.0, type: "chain", unarmed: false, rarity: 4, magic: true, shop: true, sfx: "TapeStruggle", bindType: "Rope",
		tags: ["illum", "bondage"], noDamagePenalty: true, addBind: true,
		events: [
			{type: "MagicRope", trigger: "playerAttack", power: 0, addBind: true, cost: 1, bindType: "Magic", bind: 5},
			{type: "WeaponLight", trigger: "getLights", offhand: true, power: 3, color: "#92e8c0"}
		],
	},
	"VibeWand": {name: "VibeWand", damage: 2.0, chance: 1.0, staminacost: 1.5, type: "charm", unarmed: false, rarity: 2, shop: true, sfx: "Vibe",
		tags: ["toy"], noDamagePenalty: true,
		crit: 1.4,
		angle: 0,
		playSelfBonus: 4,
		arousalMode: true,
		playSelfMsg: "KinkyDungeonPlaySelfVibeWand",
		playSelfSound: "Vibe",
		events: [
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "stun", time: 2, chance: 0.2},
			{type: "ElementalEffectStamCost", trigger: "playerAttack", power: 0.5, damage: "charm", offhand: true, offhandonly: true, cost: 0.3, sfx: "Vibe"},
		]},
	"BagOfGoodies": {name: "BagOfGoodies", arousalMode: true, damage: 0.4, chance: 1.0, staminacost: 0.5, type: "charm", unarmed: false, rarity: 2, shop: false, sfx: "Vibe",
		tags: ["toy"], noDamagePenalty: true,
		crit: 1.1,
		playSelfBonus: 3,
		playSelfMsg: "KinkyDungeonPlaySelfBagOfGoodies",
		playSelfSound: "Vibe",
		events: [
			{type: "ApplyToy", trigger: "playerAttack", duration: 40, offhand: true},
		],
		special: {type: "spell", spell: "CommandVibrateBagOfGoodies", requiresEnergy: true, energyCost: 0.01, range: 4.5},
	},
	"VibeRemote": {name: "VibeRemote", damage: 0.1, chance: 0.4, staminacost: 0.5, type: "charm", unarmed: false, rarity: 3, shop: true, magic: true, sfx: "Vibe",
		tags: ["toy"], noDamagePenalty: true,
		crit: 1.1,
		arousalMode: true,
		events: [
			{type: "ActivateVibration", trigger: "playerAttack", power: 1, time: 15},
			{type: "ActivateVibration", trigger: "playerAttack", power: 2, time: 5, offhand: true, offhandonly: true}
		],
		special: {type: "spell", spell: "CommandVibrateVibeRemote", requiresEnergy: true, energyCost: 0.015}},


	"DildoBat": {name: "DildoBat", damage: 1.5, chance: 2.0, staminacost: 3,
		tags: ["toy"], noDamagePenalty: true,
		crit: 3.0, type: "grope", unarmed: false, rarity: 3, shop: true, sfx: "RubberBolt"},
	"DildoBatPlus": {name: "DildoBatPlus", damage: 2.0, chance: 2.0, staminacost: 3, type: "grope", unarmed: false, rarity: 4, shop: false, sfx: "RubberBolt",
		tags: ["toy"], noDamagePenalty: true,
		crit: 3.0,
		special: {type: "spell", selfCast: true, spell: "DildoBatBuff", requiresEnergy: true, energyCost: 0.04},
	},

	"Scissors": {name: "Scissors", damage: 1.2, chance: 1.8, staminacost: 0.7, type: "slash", unarmed: false, rarity: 2, shop: true, light: true, cutBonus: 0.1,
		sfx: "Cut"},

	"Blaster": {name: "Blaster", damage: 1, chance: 1.0, crit: 1.1, staminacost: 0.5, type: "tickle", unarmed: false, rarity: 6, shop: false, sfx: "Shock",
		tags: ["blaster", "ranged"], noDamagePenalty: true,
		special: {type: "spell", spell: "BlasterBlast", requiresEnergy: true, energyCost: 0.01, range: 8}},

	// Bows
	"Bow": {name: "Bow", damage: 1.0, chance: 0.8, staminacost: 1, type: "crush", unarmed: false, rarity: 2, shop: true, sfx: "Miss",
		clumsy: true,
		crit: 1.5,
		tags: ["bow", "normalbow", "ranged"],
		special: {type: "spell", spell: "ArrowNormal", requiresEnergy: true, energyCost: 0.01, range: 6}},
	"BowRecurve": {name: "BowRecurve", damage: 1.3, chance: 0.7, staminacost: 1, type: "crush", unarmed: false, rarity: 3, shop: true, sfx: "Miss",
		clumsy: true,
		crit: 1.5,
		tags: ["bow", "normalbow", "ranged"],
		events: [
			{type: "Reload", trigger: "tick", requireEnergy: true, energyCost: 0.014, power: 1, color: "#ffffff", prereq: "LightLoad"},
			{type: "Unload", trigger: "playerCastSpecial", power: 0, mult: 0},
		],
		special: {type: "spell", spell: "ArrowRecurve", prereq: "Loaded", requiresEnergy: true, energyCost: 0.014, range: 6}},
	"Longbow": {name: "Longbow", damage: 1.4, chance: 0.6, staminacost: 1, type: "crush", unarmed: false, rarity: 4, shop: true, sfx: "Miss",
		clumsy: true,
		crit: 1.5,
		tags: ["bow", "normalbow", "ranged"],
		events: [
			{type: "Reload", trigger: "tick", requireEnergy: true, energyCost: 0.018, power: 2, color: "#ffffff", prereq: "LightLoad"},
			{type: "Unload", trigger: "playerCastSpecial", power: 0, mult: 0},
		],
		special: {type: "spell", spell: "ArrowLongbow", prereq: "Loaded", requiresEnergy: true, energyCost: 0.018, range: 8}},

	"Crossbow": {name: "Crossbow", damage: 1.5, chance: 0.5, staminacost: 1, type: "crush", unarmed: false, rarity: 3, shop: true, sfx: "Miss",
		clumsy: true,
		crit: 2.0,
		tags: ["bow", "normalbow", "crossbow", "ranged"],
		events: [
			{type: "Reload", trigger: "tick", requireEnergy: true, energyCost: 0.02, power: 3, color: "#ffffff", prereq: "HeavyLoad"},
			{type: "Unload", trigger: "playerCastSpecial", power: 0, mult: 0},
		],
		special: {type: "spell", spell: "ArrowBolt", prereq: "Loaded", requiresEnergy: true, energyCost: 0.02, range: 8}},

	"CrossbowPistol": {name: "CrossbowPistol", damage: 1.5, chance: 1.0, staminacost: 1, type: "crush", unarmed: false, rarity: 4, shop: true, sfx: "Miss",
		clumsy: true,
		crit: 2.0,
		tags: ["bow", "normalbow", "crossbow", "ranged"],
		events: [
			{type: "Reload", trigger: "tick", requireEnergy: true, energyCost: 0.015, power: 3, color: "#ffffff", prereq: "LightLoad"},
			{type: "Unload", trigger: "playerCastSpecial", power: 0, mult: 0},
		],
		special: {type: "spell", spell: "ArrowBoltPistol", prereq: "Loaded", requiresEnergy: true, energyCost: 0.015, range: 9}},

	"CrossbowHeavy": {name: "CrossbowHeavy", damage: 3.0, chance: 0.3, staminacost: 2.0, type: "crush", unarmed: false, rarity: 5, shop: true, sfx: "Miss",
		clumsy: true,
		heavy: true,
		crit: 2.5,
		tags: ["bow", "normalbow", "crossbow", "ranged"],
		events: [
			{type: "Reload", trigger: "tick", requireEnergy: true, energyCost: 0.025, power: 5, color: "#ffffff", prereq: "HeavyLoad"},
			{type: "Unload", trigger: "playerCastSpecial", power: 0, mult: 0},
		],
		special: {type: "spell", spell: "ArrowBoltHeavy", prereq: "Loaded", requiresEnergy: true, energyCost: 0.025, range: 12}},

	// Divine
	"MoiraiScissors": {name: "MoiraiScissors", crit: 2.0, damage: 3.0, chance: 1.1, staminacost: 2.0, type: "slash", unarmed: false, rarity: 10, shop: false, magic: true, cutBonus: 0.4, sfx: "Cut",
		tags: ["divine"],
		special: {type: "spell", spell: "MoiraiScissors", selfCast: true, requiresEnergy: true, energyCost: 0.05},
		events: [
			{type: "ApplyBuff", trigger: "beforePlayerAttack", buff: {id: "MoiraiScissors", type: "ArmorBreak", duration: 1, power: 10, player: true, enemies: true, tags: ["debuff", "armor"]}},
			{type: "ApplyBuff", trigger: "beforePlayerAttack", buff: {id: "MoiraiScissors2", type: "SpellResistBreak", duration: 1, power: 10, player: true, enemies: true, tags: ["debuff", "armor"]}},
			//{type: "DoubleStrike", trigger: "afterPlayerAttack", requireEnergy: true, energyCost: 0.005},
			//{type: "ConvertBindingToDamage", trigger: "afterPlayerAttack", power: 1.0, bind: 3.0, damage: "soul"},
		],
	},
	"Dreamcatcher": {name: "Dreamcatcher", crit: 1.5, damage: 2.5, chance: 1.0, staminacost: 1.5, type: "cold", unarmed: false, rarity: 10, shop: false, magic: true, cutBonus: 0.15, sfx: "Fwoosh",
		tags: ["knife", "divine"],
		light: true,
		events: [
			{type: "Dreamcatcher", trigger: "playerAttack", time: 20, requireEnergy: true, energyCost: 0.03},
			{type: "ElementalDreamcatcher", trigger: "playerAttack", power: 3.0, damage: "soul"},
		],
	},
	"MessengerOfLove": {name: "MessengerOfLove", crit: 1.1, damage: 2, chance: 0.75, staminacost: 1, type: "crush", unarmed: false, rarity: 10, shop: false, magic: true, sfx: "Unarmed",
		tags: ["ranged", "bow", "specialbow", "divine"],
		clumsy: true,
		special: {type: "spell", spell: "HeartArrow", requiresEnergy: true, energyCost: 0.05, range: 50},
	},
	"Dragonslaver": {name: "Dragonslaver", crit: 1.4, damage: 3.5, chance: 1.25, staminacost: 2.5, type: "slash", unarmed: false, rarity: 10, shop: false, cutBonus: 0.1, sfx: "LightSwing",
		tags: ["ranged", "sword", "divine"],
		events: [{type: "CastSpell", spell: "BeltStrike", trigger: "playerAttack", requireEnergy: true, energyCost: 0.008}],
		special: {type: "hitorspell", noSkip: true, spell: "BeltStrike", requiresEnergy: true, energyCost: 0.0075, range: 2.99}},
	"Arbiter": {name: "Arbiter", crit: 1.1, bindcrit: 2.0, damage: 3.5, bindEff: 1.25, chance: 2.0, bindType: "Metal", staminacost: 3, type: "chain", unarmed: false, rarity: 10, shop: false, magic: true, sfx: "HeavySwing",
		tags: ["sword", "divine"], addBind: true,
		events: [
			{type: "BuffMulti", trigger: "tick", power: 0.25, buffTypes: [
				"glueDamageBuff",
				"chainDamageBuff",
			]},
			{type: "DamageToSummons", trigger: "playerAttack", power: 4, damage: "cold", chance: 1.0}
		],
		special: {type: "spell", spell: "Disarm", requiresEnergy: true, energyCost: 0.025, range: 3.99}},
	"BondageBuster": {name: "BondageBuster", crit: 1.5, damage: 0.7, chance: 1.0, staminacost: 0.5,  type: "tickle", unarmed: false, rarity: 10, shop: false, sfx: "Shock",
		tags: ["ranged", "blaster", "divine"], noDamagePenalty: true,
		events: [
			{type: "ElementalEffect", trigger: "playerAttack", power: 0, time: 4, damage: "tickle"},
			{type: "Charge", trigger: "tick", power: 11, buffType: "BondageBustCharge", color: "#e7cf1a"},
			{type: "BondageBustBoost", trigger: "spellCast", power: 0.25, sfx: "Shock", energyCost: 0.0025},
		],
		special: {type: "spell", spell: "BondageBust", requiresEnergy: true, energyCost: 0.005, range: 4}},
	"TheEncaser": {name: "TheEncaser", damage: 4, chance: 1.0, bindType: "Slime", staminacost: 3.0, type: "glue", unarmed: false, rarity: 10, shop: false, magic: true, sfx: "MagicSlash", crit: 1.25,
		tags: ["staff", "divine"], noDamagePenalty: true, addBind: true,
		stamPenType: "Staff",
		events: [{type: "ElementalEffect", trigger: "playerAttack", power: 0, damage: "glue", time: 2, offhand: true,}],
		special: {type: "spell", selfCast: true, spell: "SlimeForm", requiresEnergy: true, energyCost: 0.025}},
	"FourSeasons": {name: "FourSeasons", damage: 4, chance: 1.0, staminacost: 4.0, type: "cold", unarmed: false, rarity: 10, shop: false, magic: true, sfx: "Fwoosh", crit: 1.25,
		tags: ["staff", "divine"], noDamagePenalty: true,
		stamPenType: "Staff",
		events: [
			{type: "BuffMulti", trigger: "tick", power: 0.25, offhand: true, buffTypes: [
				"fireDamageBuff",
				"iceDamageBuff",
				"frostDamageBuff",
				"soapDamageBuff",
				"electricDamageBuff",
				"crushDamageBuff",
				"gravityDamageBuff",
				"stunDamageBuff",
			]}
		],
		special: {type: "spell", selfCast: true, spell: "AvatarForm", requiresEnergy: true, energyCost: 0.05}},


};


