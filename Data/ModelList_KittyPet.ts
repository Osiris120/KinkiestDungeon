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
		{ Name: "LeotardChestCollar", Layer: "BustierCollar", Pri: 25,
			HideWhenOverridden: true,
			NoOverride: true,
			InheritColor: "CollarRight",
			MorphPoses: {Up: "Up",},
		},
		{ Name: "LeotardChestCollarLeft", Layer: "BustierCollar", Pri: 25,
			NoOverride: true,
			InheritColor: "CollarLeft",
			TieToLayer: "LeotardChestCollar",
			MorphPoses: {Boxtie: "Tied", Front: "Tied", Crossed: "Tied", Wristtie: "Tied", Up: "Tied",},
		},
		{ Name: "LeotardChestCollarStripes", Layer: "BustierCollar", Pri: 25.1,
			NoOverride: true,
			InheritColor: "StripesRight",
			TieToLayer: "LeotardChestCollar",
			MorphPoses: { Up: "Up",},
		},
		{ Name: "LeotardChestCollarStripesLeft", Layer: "BustierCollar", Pri: 25.1,
			NoOverride: true,
			InheritColor: "StripesLeft",
			TieToLayer: "LeotardChestCollarLeft",
			MorphPoses: {Boxtie: "Tied", Front: "Tied", Crossed: "Tied", Wristtie: "Tied", Up: "Tied",},
		},


		{ Name: "CollarDeco", Layer: "ChestDeco", Pri: 40,
			InheritColor: "Tag",
			HideWhenOverridden: true,
		},
		{ Name: "CollarDecoSymbol", Layer: "ChestDeco", Pri: 40.1,
			InheritColor: "Symbol",
			TieToLayer: "CollarDeco",
			NoOverride: true,
		},


		{ Name: "ShoulderCuffLeft", Layer: "SuitChestOver", Pri: 2.8,
			NoOverride: true,
			InheritColor: "LeftShoulder",
			TieToLayer: "LeotardChestCollarLeft",
		},
		{ Name: "ShoulderCuffStripeLeft", Layer: "SuitChestOver", Pri: 2.9,
			NoOverride: true,
			InheritColor: "LeftShoulderStripe",
			TieToLayer: "ShoulderCuffLeft",
		},
		{ Name: "ShoulderCuffRight", Layer: "SuitChestOver", Pri: 2.8,
			NoOverride: true,
			InheritColor: "RightShoulder",
			TieToLayer: "LeotardChestCollar",
		},
		{ Name: "ShoulderCuffStripeRight", Layer: "SuitChestOver", Pri: 2.9,
			NoOverride: true,
			InheritColor: "RightShoulderStripe",
			TieToLayer: "LeotardChestCollar",
		},
	])
});



AddModel({
	Name: "KittyPetTail",
	Folder: "KittyPet",
	Parent: "KittyPet",
	TopLevel: true,
	Protected: true,
	Categories: ["Tails", "Kitty", "Cosplay"],
	AddPose: ["Tails", "Kitty", "Cosplay"],
	Layers: ToLayerMap([
		{ Name: "Tail", Layer: "Tail", Pri: 5,
			Invariant: true,
			InheritColor: "Tail",
			NoOverride: true,
		},
		{ Name: "TailStripe", Layer: "Tail", Pri: 5.1,
			Invariant: true,
			InheritColor: "Stripe",
			TieToLayer: "Tail",
			NoOverride: true,
		},
	])
});


AddModel({
	Name: "KittyPetBlindfold",
	Folder: "KittyPet",
	TopLevel: true,
	Restraint: true,
	Categories: ["Restraints", "Blindfolds"],
	AddPose: ["Blindfolds"],
	Layers: ToLayerMap([
		{ Name: "BlindfoldRim", Layer: "Blindfold", Pri: 40,
			Invariant: true,
			InheritColor: "Rim",
		},
		{ Name: "Blindfold", Layer: "Blindfold", Pri: 40.1,
			Invariant: true,
			TieToLayer: "BlindfoldRim",
		},
		{ Name: "BlindfoldBrow", Layer: "Blindfold", Pri: 40.2,
			Invariant: true,
			TieToLayer: "BlindfoldRim",
			InheritColor: "Brows",
		},
	])
});


AddModel(GetModelFashionVersion("KittyPetBlindfold", true));


AddModel({
	Name: "KittyPetSteelCollar",
	Folder: "KittyPet",
	Parent: "KittyPetLeotard",
	TopLevel: true,
	Categories: ["Restraints", "Collars", "Accessories"],
	Layers: ToLayerMap([
		{ Name: "Collar", Layer: "Collar", Pri: -10,
			InheritColor: "BaseMetal",
		},
		{ Name: "CollarStripe", Layer: "Collar", Pri: -9.9,
			InheritColor: "Stripe",
			TieToLayer: "Collar",
			NoOverride: true,
		},
	])
});

AddModel(GetModelFashionVersion("KittyPetSteelCollar", true));