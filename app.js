(function(){
var app = angular.module("split_expense",[]);

app.controller("UserController",function($scope){
	$scope.users = [];

	function resetUserForm(){
		$scope.newUser = {
			"name": ""
		}
	}

	function createUser(user){
		$scope.users.push(user);
		resetUserForm();
	}

	$scope.createUser = createUser;

	$scope.expenses = [];

	function resetExpenseForm(){
		$scope.newExpense={
			"spent_by":"",
			"amount":"",
			"spent_with":"",
			"spent_for":""

		}
	}
	function createExpense(expense){
		$scope.expenses.push(expense);
		resetExpenseForm();
	}

	$scope.createExpense = createExpense;

	$scope.splits = {};
	
	function toTitleCase(str)
	{
    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

	function calculateSplit(){
		var div = document.getElementById('output');


		for(var i=0; i < $scope.expenses.length; i++){
			var individual_split = {};

			if ($scope.splits[$scope.expenses[i].spent_by] != undefined ){
				individual_split = $scope.splits[$scope.expenses[i].spent_by];	
			}

			var individual_amount = $scope.expenses[i].amount / ( $scope.expenses[i].spent_with.length + 1 ) ;
			for(var j=0; j<$scope.expenses[i].spent_with.length; j++){
						if(individual_split[$scope.expenses[i].spent_with[j]] == undefined){
				 			individual_split[$scope.expenses[i].spent_with[j]] = individual_amount;
				 		}
				 		else{
				 			individual_split[$scope.expenses[i].spent_with[j]] += individual_amount;	
				 		}

			}
			$scope.splits[$scope.expenses[i].spent_by] = individual_split;
			
		}

		div.innerHTML += "<h3>Here you go...</h3><ul>"
		for(var key in $scope.splits){
			
			var temp_map = $scope.splits[key];
			for(var temp_key in temp_map){
				div.innerHTML += "<li>"+toTitleCase(temp_key) + " owes " +toTitleCase(key)+ " Rs. " + temp_map[temp_key] + "</li>";
			}
		}
		div.innerHTML += "</ul>"
		console.log($scope.splits);
	}

	$scope.calculateSplit = calculateSplit;
});



})();