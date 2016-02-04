angular.module("restaurant", [])

	angular.module("restaurant").factory("foodFactory", [function(){
				var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
				this.name = name;
				this.calories = calories;
				this.vegan = vegan || false;
				this.glutenFree = glutenFree || false;
				this.citrusFree = citrusFree || false; 
			}

			FoodItem.prototype.stringify = function(){
					
					if (this.vegan) {
						var vegString = "This item is vegan friendly"
					} else { var vegString = "Sorry stupid vegans"}
					
					if (this.glutenFree) {
						var glutString = "Guaranteed gluten free"
					} else { var glutString = "Sorry not sorry, glutards"}
					
					if (this.citrusFree){
						var citrusString = "Contains no citrus"
					} else { var citrusString = "Citrus all up in yo grill"}

					return (this.name + " has " + this.calories + " calories." +"\n"
							+ vegString + "/" + glutString + "/" + citrusString)
			}



			var tequila = new FoodItem(
				'Citrus Tequila',
				100,
				true,
				true,
				false
				)

			var burrito = new FoodItem(
				"Big Ol' Burrito ",
				750,
				false,
				false,
				true
				)

			var guacamole = new FoodItem(
				'Spicy Habanero Guacamole',
				360,
				true,
				true,
				false
				)



			var Drink = function(name, description, price, ingredients){
				this.name = name;
				this.description = description;
				this.price = price;
				this.ingredients = ingredients
			}


			var margarita = new Drink (
				'Cadillac Margarita',
				'Fancy Margarita for You',
				12,
				[tequila]
				)

			Drink.prototype.isVegan = function(){
				var isItVegan = false
				// console.log(this.ingredients)
				this.ingredients.forEach(function(element){
					if (element.vegan === true) {
						isItVegan = true
					} else {isItVegan = false}
				})
				return isItVegan
			}

			Drink.prototype.isGlutenFree = function(){
				// console.log(this.ingredients)
				var isItGF = false
				this.ingredients.forEach(function(element){
					if (element.glutenFree === true) {
						isItGF = true
					} else {isItGF = false}
				})
				return isItGF
			}


			Drink.prototype.isCitrusFree = function(){
				var isItCF = false
				// console.log(this.ingredients)
				this.ingredients.forEach(function(element){
					if (element.citrusFree === true) {
						isItCF = true
					} else {isItCF = false}
				})
				return isItCF
			}

			Drink.prototype.arrayify = function(){
				plateText = []
				if (this.isVegan() === true){
					plateText.push( " -- Ok, it's vegan why not? -- ")
				} else {}
				if (this.isGlutenFree() === true){
					plateText.push( " -- Safe for glutards -- ")
				} else {}
				if (this.isCitrusFree() === true){
					plateText.push( " -- No citrus hyah -- ")
				} else {}
				return plateText
			}



			var Plate = function(name,description,price,ingredients) {
				this.name = name;
				this.description = description;
				this.price = price;
				this.ingredients = ingredients
			}



			var burritoPlate = new Plate (
				'Big Burrito Dinner',
				'A big, fat, smothered burrito with all the fixins.',
				9,
				[burrito]
				)

			var guacPlate = new Plate (
				'Spicy Habanero Guacomole',
				'Chunky Guacomole with a big kick!',
				5,
				[guacamole]
				)

			Plate.prototype.isVegan = function(){
				var isItVegan = false
				this.ingredients.forEach(function(element){
					if (element.vegan === true) {
						isItVegan = true
					} else {isItVegan = false}
				})
				return isItVegan
			}

			Plate.prototype.isGlutenFree = function(){
				var isItGF = false
				this.ingredients.forEach(function(element){
					if (element.glutenFree === true) {
						isItGF = true
					} else {isItGF =false}
				})
				return isItGF
			}

			Plate.prototype.isCitrusFree = function(){
				var isItCF = false
				this.ingredients.forEach(function(element){
					if (element.citrusFree === true) {
						isItCF = true
					} else {isItCF = false}
				})
				return isItCF
			}

			Plate.prototype.arrayify = function(){
				plateText = []
				if (this.isVegan() === true){
					plateText.push( " -- Ok, it's vegan why not? -- ")
				} else {}
				if (this.isGlutenFree() === true){
					plateText.push( " -- Safe for glutards -- ")
				} else {}
				if (this.isCitrusFree() === true){
					plateText.push( " -- No citrus hyah -- ")
				} else {}
				return plateText
			}




			var Menu = function(plate) {
				this.plate = plate
			}


			var currentMenu = new Menu(
				[burritoPlate, guacPlate, margarita]
				)

			var Order = function(myOrder) {
				this.myOrder = myOrder
			}
			var lunchOrder = new Order (
				[]
				)



			Menu.prototype.stringify= function (){
				var menuText = ""
				this.plate.forEach(function(element){
				menuText += element.name + "\n"
				menuText += element.description + "\n"
				menuText += "Price: $" + element.price + "\n"
				menuText += element.stringify() + "\n\n"
			}) 
				return menuText
			}

			var Restaurant = function(name, description, menu){
				this.name = name
				this.description = description
				this.menu = menu
			}

			var myRestaurant = new Restaurant(
				"D.B.'s Tex-Mex Shack",
				"A refined eatery in a refined shack.",
				currentMenu
				)



			Restaurant.prototype.stringify = function(){
					return ("Welcome to " + this.name + "!" + "\n" + this.description + "\n\n" + "Today's menu:" + "\n" + this.menu.stringify())

			}

			return {
				restaurant : myRestaurant,
			}


	}])


	angular.module("restaurant")
		.controller("troll", ["$scope","foodFactory", function($scope, foodFactory){
			var s = $scope
			s.restaurant = foodFactory.restaurant
			s.hideMe = true
			s.cart = []
			s.total = 0
			s.totalBox = false
			s.highlight = false
			
			s.clickHandler = function(thing) {
				s.hideMe = false
				s.cart.push(thing)
				s.total += thing.price

			}
			s.cartRemove = function(stuff){
				s.cart.splice(s.cart.indexOf(stuff),1)
				s.total -= stuff.price
				if (s.total <= 0) {
					s.hideMe = true;
				}
			}
			s.orderSubmit = function(){
				s.hideMe = true
				s.totalBox = true
			}
			s.veganClick = function(){
				console.log("that's my eye")
				console.log(s.restaurant.menu.plate[0].ingredients)
				s.restaurant.menu.plate.forEach(function(element){
						element.ingredients.forEach(function(elementI){
						if(elementI.vegan === true) {
							element.highlight = !element.highlight
						}
				})
				})
				
			}

			s.glutenClick = function(){
				console.log("that's my eye")
				console.log(s.restaurant.menu.plate[0].ingredients)
				s.restaurant.menu.plate.forEach(function(element){
						element.ingredients.forEach(function(elementI){
						if(elementI.glutenFree === true) {
							element.highlight = !element.highlight
						}
				})
				})
				
			}

			s.cfClick = function(){
				console.log("that's my eye")
				console.log(s.restaurant.menu.plate[0].ingredients)
				s.restaurant.menu.plate.forEach(function(element){
						element.ingredients.forEach(function(elementI){
						if(elementI.citrusFree === true) {
							element.highlight = !element.highlight
						}
				})
				})
				
			}





	}])