/**
 * TIPS AND TRICKS FOR CONTRIBUTORS
 * 1) Memorize the layering of body parts. Hands are higher than arms, feet higher than legs
 * 2) Generally you will want to avoid lower pri items on the same layer sticking out on seams if your object is skintight.
 * In general, this is accomplished by having higher priority items cover more of the original
 */

AddModel({
	Name: "KittyPetLeotardUnder",
	Folder: "KittyPet",
	Parent: "KittyPetLeotard",
	TopLevel: false,
	Categories: ["Bodysuits"],
	Layers: ToLayerMap([
		{ Name: "Leotard", Layer: "Bodysuit", Pri: 3,
			HideWhenOverridden: true,
			MorphPoses: {Closed: "Closed", Hogtie: "Closed"},
		},
		{ Name: "LeotardStripes", Layer: "Bodysuit", Pri: 3.1,
			NoOverride: true,
			TieToLayer: "Leotard",
			InheritColor: "Stripes",
		},
		{ Name: "LeotardChest", Layer: "SuitChest", Pri: 3,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["TorsoUpper"],
			HideWhenOverridden: true,
			InheritColor: "LeotardUpper",
			MorphPoses: {Boxtie: "Tied", Front: "Tied", Crossed: "Tied", Wristtie: "Tied", Up: "Up",},
		},
		{ Name: "LeotardChestStripes", Layer: "SuitChest", Pri: 3.1,
			NoOverride: true,
			InheritColor: "StripesUpper",
			TieToLayer: "LeotardChest",
		},
	])
});
AddModel({
	Name: "KittyPetLeotard",
	Folder: "KittyPet",
	Parent: "KittyPetLeotard",
	TopLevel: true,
	Categories: ["Bodysuits"],
	Layers: ToLayerMap([
		{ Name: "Leotard", Layer: "BodysuitOver", Pri: 3,
			HideWhenOverridden: true,
			MorphPoses: {Closed: "Closed", Hogtie: "Closed"},
		},
		{ Name: "LeotardStripes", Layer: "BodysuitOver", Pri: 3.1,
			NoOverride: true,
			TieToLayer: "Leotard",
			InheritColor: "Stripes",
		},
		{ Name: "LeotardChest", Layer: "SuitChestOver", Pri: 3,
			HidePrefixPose: ["Encase"],	HidePrefixPoseSuffix: ["TorsoUpper"],
			MorphPoses: {Boxtie: "Tied", Front: "Tied", Crossed: "Tied", Wristtie: "Tied", Up: "Up",},
			HideWhenOverridden: true,
			InheritColor: "LeotardUpper",
		},
		{ Name: "LeotardChestStripes", Layer: "SuitChestOver", Pri: 3.1,
			NoOverride: true,
			InheritColor: "StripesUpper",
			TieToLayer: "LeotardChest",
		},
	])
});

AddModel(GetModelRestraintVersion("KittyPetLeotard", true));


AddModel({
	Name: "KittyPetUniformCollar",
	Folder: "KittyPet",
	Parent: "KittyPetLeotard",
	TopLevel: true,
	Categories: ["Accessories"],
	Layers: ToLayerMap([
		{ Name: "LeotardChestCollar", Layer: "SuitChestOver", Pri: 25,
			HideWhenOverridden: true,
			NoOverride: true,
			InheritColor: "CollarRight",
			MorphPoses: {Up: "Up",},
		},
		{ Name: "LeotardChestCollarLeft", Layer: "SuitChestOver", Pri: 25,
			NoOverride: true,
			InheritColor: "CollarLeft",
			TieToLayer: "LeotardChestCollar",
			MorphPoses: {Boxtie: "Tied", Front: "Tied", Crossed: "Tied", Wristtie: "Tied", Up: "Tied",},
		},
		{ Name: "LeotardChestCollarStripes", Layer: "SuitChestOver", Pri: 25.1,
			NoOverride: true,
			InheritColor: "StripesRight",
			TieToLayer: "LeotardChestCollar",
			MorphPoses: { Up: "Up",},
		},
		{ Name: "LeotardChestCollarStripesLeft", Layer: "SuitChestOver", Pri: 25.1,
			NoOverride: true,
			InheritColor: "StripesLeft",
			TieToLayer: "LeotardChestCollarLeft",
			MorphPoses: {Boxtie: "Tied", Front: "Tied", Crossed: "Tied", Wristtie: "Tied", Up: "Tied",},
		},
	])
});
