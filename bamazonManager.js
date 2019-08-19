var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require ("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8889,
  
    user: "root",
  
    password: "root",
    database: "bamazonDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });

  function displayInventory() {
      connection.query('SELECT * FROM Products', function(err, res) {
          if(err){console.log(err)};
          var theDisplayTable = new Table ({
              head: ['Item ID', 'Product Name', 'Catefory', 'Price', 'Quantity'],
              colWidths: [10,25,25,10,14]
          });
          for(i=0; i<res.length; i++){
              theDisplayTable.push(
                [res[i].item_id,res[i].productName, res[i].departmentName, res[i].price, res[i].quantity]
                );
          }
          console.log(theDisplayTable.toString());
          inquirerForUpdates();
      });
      
  };

  function inquirerForUpdates(){
	inquirer.prompt([{
		name:"action",
		type: "list",
		message: "Choose an option below to manage current inventory:",
		choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
	}]).then(function(answers){
		switch(answers.action){
			case 'Restock Inventory':
				restockRequest();
				break;
			case 'Add New Product':
				addRequest();
				break;
			case 'Remove An Existing Product':
				removeRequest();
				break;		
		}
	});
};

function restockRequest(){
	inquirer.prompt([
	{
		name:"ID",
		type:"input",
		message:"What is the item number of the item you would like to restock?"
	},
	{
		name:"ItemQuantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},
	]).then(function(answers){
		var quantityAdded = answers.quantity;
		var IDOfProduct = answers.ID;
		restockInventory(IDOfProduct, quantityAdded);
	});
};

function restockInventory(id, quant){
	connection.query('SELECT * FROM Products WHERE item_id = '+id, function(err,res){
		if(err){console.log(err)};
		connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' +quantity+ 'WHERE item_id =' +item_id);

		displayInventory();
	});
};

function addRequest(){
	inquirer.prompt([

	{
		name: "ID",
		type: "input",
		message: "Add ID Number"

	},	
	{
		name: "Name",
		type: "input",
		message: "What is name of product you would like to stock?"
	},
	{
		name:"Category",
		type:"input",
		message:"What is the department for product?"
	},
	{
		name:"Price",
		type:"input",
		message:"What is the price for item?"
	},
	{
		name:"Quantity",
		type:"input",
		message:"What is the quantity you would like to add?"
	},

	]).then(function(answers){
		var id = answers.Id;
		var name = answers.productName;
		var category = answers.Category;
		var price = answers.Price;
		var quantity = answers.Quantity;
		buildNewItem(id,name,category,price,quantity); 
	});
  };

  function buildNewItem(name,category,price,quantity){
  	connection.query('INSERT INTO products (item_id,productName,departmentName,price,stock_quantity) VALUES("' + id + '","' + name + '","' + department + '",' + price + ',' + quantity +  ')');
  	displayInventory();
  };

  function removeRequest(){
  	inquirer.prompt([{
  		name:"ID",
  		type:"input",
  		message:"What is the item number of the item you would like to remove?"
  	}]).then(function(answer){
  		var id = answers.ID;
  		removeInventory(id); 
  	});
  };

  function removeInventory(id){
  	connection.query('DELETE FROM Products WHERE item_id = ' + id);
  	displayInventory();
  };

  displayInventory();
