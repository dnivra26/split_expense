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
	

	function calculateSplit(){

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

		console.log($scope.splits);
	}

	$scope.calculateSplit = calculateSplit;
});



})();