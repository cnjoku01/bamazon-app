var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


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
    // displayProducts();
  });
  
  var displayProducts = function(){
      var query = "Select * FROM products";
      connection.query(query, function(err, res){
          if(err) throw err;
          var displayTable = new Table ({
              head: ["Item ID", "Product Name", "Department", "Price"],
                colWidths: [10,25,25,10]
          });
          for (var i = 0; i < res.length; i++) {
              displayTable.push(
                  [res[i].item_id, res[i].productName, res[i].price, res[i].departmentName]);
            
          }
          console.log(displayTable.toString());
          purchasePrompt()
      });
  }
//   function queryAllitems() {
//     connection.query("SELECT * FROM Items", function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].productName + " | " + res[i].price + " | " + res[i].departmentName + "|" + res[i].quantity);
//       }
//       console.log("-----------------------------------");

//       purchasePrompt();
//     });
//   }

  function purchasePrompt() {
            inquirer.prompt([
                {
                    name: "ID",
                    type: "input",
                    message: "Please input item ID of product.",
                    filter: Number
                },
                {
                    name: "ItemQuantity",
                    type: "input",
                    message: "How Many Items Would You Like to Purchase?",
                    filter: Number
                },
            ]).then(function(answers){
                var quantityNeeded = answers.ItemQuantity
                var IDrequested = answers.ID;
                purchaseOrder(IDrequested, quantityNeeded);
            });
  };

  function purchaseOrder(ID, orderNeeded) {
      connection.query('Select * FROM products WHERE item_id =' + ID, function(err,res){
          if(err){console.log(err)};

          if(orderNeeded <= res[0].quantity){
              var totalCost = res[0].price * orderNeeded;
              console.log("Your order is in stock!");
              console.log(" Your total cost for " + orderNeeded + " " +res[0].productName + " is " + totalCost + " Thank you!");
              
              // Code tp update database
            // connection.query("UPDATE products SET quantity = quantity - " + orderNeeded + "WHERE item_id = " + ID);
          } else {
              console.log("Insufficient quantity, sorry we are all out of " + res[0].productName + " to complete your order. ");

          };
          displayProducts();
      }); 
      
  };

  displayProducts();