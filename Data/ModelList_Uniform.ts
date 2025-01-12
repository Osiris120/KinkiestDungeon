/**
 * TIPS AND TRICKS FOR CONTRIBUTORS
 * 1) Memorize the layering of body parts. Hands are higher than arms, feet higher than legs
 * 2) Generally you will want to avoid lower pri items on the same layer sticking out on seams if your object is skintight.
 * In general, this is accomplished by having higher priority items cover more of the original
 */


AddModel({
	Name: "MilitaryJacket_Sleeveless",
	Folder: "Uniform",
	Parent: "MilitaryJacket",
	TopLevel: false,
	Categories: ["Tops", "Jackets"],
	//RemovePoses: ["EncaseTorsoUpper"],
	Layers: ToLayerMap([
		{ Name: "Dress", Layer: "Shirt", Pri: 1,
			InheritColor: "Dress",
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["TorsoUpper"],
			HidePoses: ToMap(["EncaseTorsoUpper"]),
			MorphPoses: {Kneel: "Kneel", KneelClosed: "Kneel"},
			DisplaceAmount: 125,
			DisplaceLayers: ToMap(["CorsetTorso"]),
			DisplacementSprite: "TightUpperSquish",
			DisplacementInvariant: true,
			Invariant: true,
		},
		{ Name: "DressChest", Layer: "ShirtChest", Pri: 1,
			Poses: ToMap([...ARMPOSES]),
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["Chest"],
			HidePoses: ToMap(["EncaseTorsoUpper"]),
			InheritColor: "Dress",
		},
		{ Name: "DressSkirt", Layer: "SkirtOver", Pri: 2,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["TorsoLower"],
			MorphPoses: {Kneel: "Kneel", KneelClosed: "Kneel", Hogtie: "Hogtie"},
			HidePoses: ToMap(["EncaseTorsoLower"]),
			InheritColor: "Skirt",
		},
	])
});



AddModel({
	Name: "MilitaryUniform_SleeveLeft",
	Folder: "Uniform",
	Parent: "MilitaryJacket",
	TopLevel: false,
	Categories: ["Sleeves"],
	RemovePoses: ["EncaseTorsoUpper"],
	Layers: ToLayerMap([
		{ Name: "SleeveLeft", Layer: "SleeveLeft", Pri: 60,
			Poses: ToMap([...ARMPOSES]),
			InheritColor: "SleeveLeft",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["ArmLeft"],
		},
		{ Name: "SleeveLeftStripe", Layer: "SleeveLeft", Pri: 60.1,
			Poses: ToMap([...ARMPOSES]),
			InheritColor: "SleeveLeftStripe",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			NoOverride: true,
			TieToLayer: "SleeveLeft",
		},
		{ Name: "ArmLeft", Layer: "TightSleeveLeft", Pri: 50,
			Poses: ToMap([...ARMPOSES]),
			InheritColor: "ArmLeft",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["ArmLeft"],
		},
		{ Name: "ForeArmLeft", Layer: "ForeSleeveLeft", Pri: 60,
			Poses: ToMap([...FOREARMPOSES]),
			InheritColor: "ArmLeft",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			SwapLayerPose: {Crossed: "CrossSleeveLeft"},
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["ArmLeft"],
		},

	])
});

AddModel({
	Name: "MilitaryUniform_SleeveRight",
	Folder: "Uniform",
	Parent: "MilitaryJacket",
	TopLevel: false,
	Categories: ["Sleeves"],
	RemovePoses: ["EncaseTorsoUpper"],
	Layers: ToLayerMap([
		{ Name: "SleeveRight", Layer: "SleeveRight", Pri: 60,
			Poses: ToMap([...ARMPOSES]),
			InheritColor: "SleeveRight",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["ArmRight"],
			EraseSprite: "LightMaidRightArmErase",
			EraseLayers: {MaidArmPoofRight: true},
			EraseAmount: 100,
			EraseZBonus: 8600,
			EraseInvariant: true,
		},
		{ Name: "SleeveRightStripe", Layer: "SleeveRight", Pri: 60.1,
			Poses: ToMap([...ARMPOSES]),
			InheritColor: "SleeveRightStripe",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			NoOverride: true,
			TieToLayer: "SleeveRight",
		},
		{ Name: "ArmRight", Layer: "TightSleeveRight", Pri: 60,
			Poses: ToMap([...ARMPOSES]),
			InheritColor: "ArmRight",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["ArmRight"],

		},
		{ Name: "ForeArmRight", Layer: "ForeSleeveRight", Pri: 60,
			Poses: ToMap([...FOREARMPOSES]),
			InheritColor: "ArmRight",
			GlobalDefaultOverride: ToMap(["Front", "Crossed"]),
			SwapLayerPose: {Crossed: "CrossSleeveRight"},
			HideWhenOverridden: true,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["ArmRight"],
		},
		{ Name: "ShoulderRight", Layer: "UpSleeveRight", Pri: 60,
			HideWhenOverridden: true,
			InheritColor: "SleeveRight",
			Poses: ToMap([...SHOULDERPOSES]),
		},
	])
});


AddModel({
	Name: "MilitaryUniform_Sleeves",
	Folder: "Uniform",
	Parent: "MilitaryJacket",
	TopLevel: false,
	Categories: ["Sleeves"],
	Layers: ToLayerMap([
		...GetModelLayers("MilitaryUniform_SleeveLeft"),
		...GetModelLayers("MilitaryUniform_SleeveRight"),
	])
});


AddModel({
	Name: "MilitaryJacket",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Tops", "Jackets", "Sleeves"],
	Layers: ToLayerMap([
		...GetModelLayers("MilitaryUniform_Sleeves"),
		...GetModelLayers("MilitaryJacket_Sleeveless"),
	])
});



AddModel({
	Name: "MilitaryUniform_Hat",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Hats"],
	Layers: ToLayerMap([
		{ Name: "Hat", Layer: "Hat", Pri: 30,
			HideWhenOverridden: true,
			Invariant: true,
			EraseLayers: {EarsHelmet: true},
			EraseAmount: 100,
			EraseSprite: "SovietHatErase",
		},
		{ Name: "HatRim", Layer: "Hat", Pri: 30.2,
			HideWhenOverridden: true,
			NoOverride: true,
			Invariant: true,
			InheritColor: "Rim",
		},
		{ Name: "HatCap", Layer: "Hat", Pri: 30.1,
			HideWhenOverridden: true,
			NoOverride: true,
			Invariant: true,
			InheritColor: "Cap",
		},
		{ Name: "HatGloriousInsignia", Layer: "Hat", Pri: 30.3,
			HideWhenOverridden: true,
			NoOverride: true,
			Invariant: true,
			InheritColor: "Circle",
		},
		{ Name: "HatGloriousInsigniaHS", Layer: "Hat", Pri: 30.4,
			HideWhenOverridden: true,
			NoOverride: true,
			Invariant: true,
			InheritColor: "GloriousInsignia",
		},
	])
});


AddModel({
	Name: "MilitaryUniform_Earphones",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Hats"],
	Layers: ToLayerMap([
		{ Name: "Headgear", Layer: "Circlet", Pri: 40,
			HideWhenOverridden: true,
			NoOverride: true,
			Invariant: true,
			InheritColor: "Band",
		},
		{ Name: "HeadgearUnit", Layer: "Circlet", Pri: 40.1,
			TieToLayer: "Headgear",
			NoOverride: true,
			Invariant: true,
			InheritColor: "Unit",
		},
		{ Name: "HeadgearEars", Layer: "Circlet", Pri: 40.1,
			TieToLayer: "Headgear",
			NoOverride: true,
			Invariant: true,
			InheritColor: "Ears",
		},
		{ Name: "HeadgearEarsInner", Layer: "Circlet", Pri: 40.2,
			TieToLayer: "Headgear",
			NoOverride: true,
			Invariant: true,
			InheritColor: "EarsInner",
		},
		{ Name: "HeadgearBack", Layer: "CircletUnder", Pri: -40,
			NoOverride: true,
			Invariant: true,
			InheritColor: "Inner",
		},
	])
});

AddModel({
	Name: "MilitaryUniform_Searchlight",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Accessories"],
	Layers: ToLayerMap([
		{ Name: "SearchlightPouch", Layer: "UpperArmStraps", Pri: 50,
			Invariant: true,
			NoOverride: true,
			InheritColor: "Pouch",
		},
		{ Name: "Searchlight", Layer: "ChestOverHair", Pri: 50.2,
			Invariant: true,
			NoOverride: true,
		},
		{ Name: "SearchlightBase", Layer: "UpperArmStraps", Pri: 50.1,
			Invariant: true,
			NoOverride: true,
			TieToLayer: "SearchlightPouch",
		},
		{ Name: "SearchlightLens", Layer: "ChestOverHair", Pri: 50,
			Invariant: true,
			NoOverride: true,
			TieToLayer: "Searchlight",
			InheritColor: "Lens",
		},
	])
});


AddModel({
	Name: "MilitaryUniform_BeltPouch",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Accessories"],
	Layers: ToLayerMap([
		{ Name: "BeltPouch", Layer: "ChestStraps", Pri: 50,
			Invariant: true,
			NoOverride: true,
			InheritColor: "Pouch",
		},
		{ Name: "BeltPouchRim", Layer: "ChestStraps", Pri: 50.1,
			Invariant: true,
			NoOverride: true,
			TieToLayer: "BeltPouch",
		},
	])
});
AddModel({
	Name: "MilitaryUniform_Webbing",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Accessories"],
	Layers: ToLayerMap([
		{ Name: "Webbing", Layer: "UpperArmStraps", Pri: 25,
			Invariant: true,
			NoOverride: true,
			InheritColor: "Strap",
			MorphPoses: {Wristtie: "Wristtie", Up: "Up"},
		},
		{ Name: "WebbingSide", Layer: "ChestStraps", Pri: 25.1,
			Invariant: true,
			NoOverride: true,
			InheritColor: "Side",
			TieToLayer: "Webbing",
			MorphPoses: {Boxtie: "Tied", Wristtie: "Tied", Front: "Tied", Crossed: "Tied", Up: "Up", Yoked: "Yoked"},
		},
		{ Name: "WebbingHardware", Layer: "UpperArmStraps", Pri: 25.1,
			Invariant: true,
			NoOverride: true,
			InheritColor: "Hardware",
			TieToLayer: "Webbing",
		},
		{ Name: "WebbingName", Layer: "UpperArmStraps", Pri: 25.1,
			Invariant: true,
			NoOverride: true,
			RequirePoses: {"Marhntha": true},
			InheritColor: "Name",
			TieToLayer: "Webbing",
		},
		{ Name: "WebbingUnderbust", Layer: "ChestStraps", Pri: 25,
			Invariant: true,
			NoOverride: true,
			InheritColor: "UnderbustStrap",
		},
		{ Name: "WebbingUnderbustHardware", Layer: "ChestStraps", Pri: 25.1,
			Invariant: true,
			NoOverride: true,
			TieToLayer: "WebbingUnderbust",
			InheritColor: "UnderbustHardware",
		},
	])
});

AddModel({
	Name: "MilitaryUniform_Skirt",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Skirts"],
	AddPoseConditional: {
		EncaseTorsoLower: ["Skirt"]
	},
	Layers: ToLayerMap([
		{ Name: "Skirt", Layer: "Skirt", Pri: -4,
			//swaplayerpose: {Kneel: "SkirtOverLower", KneelClosed: "SkirtOverLower"},
			Poses: ToMap([...LEGPOSES]),
			//HideWhenOverridden: true,
			MorphPoses: {Kneel: "Kneel", KneelClosed: "Kneel"},
			//AppendPose: ToMapDupe(["CrotchStrap"]),
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["TorsoLower"],
			Invariant: true,
		},
		{ Name: "SkirtBand", Layer: "Skirt", Pri: -3.9,
			//swaplayerpose: {Kneel: "SkirtOverLower", KneelClosed: "SkirtOverLower"},
			Poses: ToMap([...LEGPOSES]),
			//HideWhenOverridden: true,
			MorphPoses: {Kneel: "Kneel", KneelClosed: "Kneel"},
			//AppendPose: ToMapDupe(["CrotchStrap"]),
			TieToLayer: "Skirt",
			InheritColor: "Band",
			Invariant: true,
		},
	])
});


AddModel({
	Name: "MilitaryUniform_Shoes",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Shoes"],
	Layers: ToLayerMap([
		{ Name: "ShoeLeft", Layer: "ShoeLeft", Pri: 17,
			Poses: ToMapSubtract([...LEGPOSES], ["Hogtie"]),
			GlobalDefaultOverride: ToMap(["KneelClosed"]),
			HideWhenOverridden: true,
		},
		{ Name: "ShoeRight", Layer: "ShoeRight", Pri: 17,
			Poses: ToMapSubtract([...LEGPOSES], ["Hogtie", "Kneel", "KneelClosed"]),
			HideWhenOverridden: true,
		},
		{ Name: "ShoeRightKneel", Layer: "ShoeRightKneel", Pri: 17,
			Poses: ToMap(["Kneel"]),
			Invariant: true,
			InheritColor: "ShoeRight",
			HideWhenOverridden: true,
		},
		{ Name: "ShoeLeftHogtie", Layer: "ShoeLeftHogtie", Pri: 17,
			Poses: ToMap(["Hogtie"]),
			Invariant: true,
			InheritColor: "ShoeLeft",
			HideWhenOverridden: true,
		},
	])
});



AddModel({
	Name: "MilitaryUniform_TightsShorts",
	Folder: "Uniform",
	Parent: "Tights",
	Categories: ["Panties"],
	TopLevel: true,
	Layers: ToLayerMap([
		{ Name: "Pantyhose", Layer: "BodysuitLower", Pri: -30,
			Poses: ToMap([...LEGPOSES]),
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["TorsoLower"],
			//MorphPoses: {Hogtie: "Hogtie"},
		},
	])
});

AddModel({
	Name: "MilitaryUniform_SockLeft",
	Folder: "Uniform",
	Parent: "Tights",
	Categories: ["Socks"],
	TopLevel: false,
	Layers: ToLayerMap([
		{ Name: "SockLeft", Layer: "StockingLeft", Pri: -30,
			Poses: ToMap([...LEGPOSES]),
			GlobalDefaultOverride: ToMap(["Hogtie", "KneelClosed"]),

		},
		{ Name: "FootSockLeftHogtie", Layer: "SockLeftHogtie", Pri: -30,
			Poses: ToMap(["Hogtie"]),
			InheritColor: "SockLeft",
			Invariant: true,
		},
	])
});
AddModel({
	Name: "MilitaryUniform_SockRight",
	Folder: "Uniform",
	Parent: "Tights",
	Categories: ["Socks"],
	TopLevel: false,
	Layers: ToLayerMap([
		{ Name: "SockRight", Layer: "StockingRight", Pri: -30,
			Poses: ToMap([...LEGPOSES]),
			GlobalDefaultOverride: ToMap(["Hogtie", "KneelClosed"]),

		},
		{ Name: "FootSockRightKneel", Layer: "SockRightKneel", Pri: -30,
			HidePoses: ToMap(["FeetLinked"]),
			Poses: ToMap(["Kneel"]),
			InheritColor: "SockRight",
			Invariant: true,
		},
	])
});




AddModel({
	Name: "Tights",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	Categories: ["Socks", "Panties"],
	TopLevel: true,
	Layers: ToLayerMap([
		...GetModelLayers("MilitaryUniform_TightsShorts"),
		...GetModelLayers("MilitaryUniform_SockLeft"),
		...GetModelLayers("MilitaryUniform_SockRight"),
	])
});


AddModel({
	Name: "MilitaryUniform_Hairpin",
	Folder: "Uniform",
	TopLevel: true,
	Protected: true,
	Parent: "MilitaryUniform",
	Categories: ["Hairstyles", "Accessories", "Hairpins"],
	Layers: ToLayerMap([
		{ Name: "Hairpin", Layer: "HairFront", Pri: 30,
			NoOverride: true,
		},
	])
});

AddModel({
	Name: "MilitaryUniform",
	Folder: "Uniform",
	Parent: "MilitaryUniform",
	TopLevel: true,
	Categories: ["Uniforms"],
	Layers: ToLayerMap([
		...GetModelLayers("MilitaryJacket"),
		...GetModelLayers("Tights"),
		...GetModelLayers("MilitaryUniform_Shoes"),
		...GetModelLayers("MilitaryUniform_Skirt"),
		...GetModelLayers("MilitaryUniform_Hairpin"),
		...GetModelLayers("MilitaryUniform_Searchlight"),
		...GetModelLayers("MilitaryUniform_BeltPouch"),
		...GetModelLayers("MilitaryUniform_Hat"),
		...GetModelLayers("MilitaryUniform_Earphones"),
		...GetModelLayers("MilitaryUniform_Webbing"),
	])
});