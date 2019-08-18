var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require ("cli-table");

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

  