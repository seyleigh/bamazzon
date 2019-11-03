const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const chalkAnimation = require("chalk-animation");
const gradient = require("gradient-string");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "", //insert user password
    database: "customer_db"
});

function pretty(){
    let manban = figlet.textSync('Boss Man', {
        font: 'roman',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
    })

    console.log(
        gradient.retro(manban)
    );
}

pretty();


function run(){
   
    inquirer.prompt([{
        type: "list",
        name: "duties",
        message: "What do you want to do?",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]
    }]).then(function(answer){
        switch (answer.duties){
            case "View products for sale":
                viewProd();
            break;

            case "View low inventory":
                lowInv();
            break; 

            case "Add to inventory":
                addInv();
            break;

            case "Add new product":
                addProd();
            break;

            case "Exit": chalkAnimation.rainbow("K, Thx, BYE!");
        }
    });
}

function viewProd() {
    console.log(
        chalk.red("You are Viewing Products")
    )

    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        console.table(results);
        run();
    })
}

function lowInv() {
    console.log(
        chalk.red("You are Viewing Low Inventory")
    )
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        
        for (let i = 0; i < results.length; i++){
            if(results[i].stock_quantity <=5){
                console.table(results[i]);
            }
        }
    run();
    })
}

function addInv(){
    console.log(
        chalk.red("You are Adding To Inventory")
    )
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;

        let arr = [];

        for (let i = 0; i < results.length; i++){
            arr.push(results[i].product_name);
        }
        inquirer.prompt([{
            type: "list",
            name: "product",
            choices: arr,
            message: "Which item do you want to restock?"
        },{
            type: "input",
            name: "quantity",
            message: "How many do you want to add?",
            validate: function(value){
              if(isNaN(value) === false){
                  return true;
              } 
              return false;
            
            }
        }]).then(function(answer){
            let currentQty;
            for (let i = 0; i < results.length; i++){
                if(results[i].product_name === answer.product){
                    currentQty = results[i].stock_quantity;
                }
            }
            connection.query('UPDATE products SET ? WHERE?', [{stock_quantity: currentQty + parseInt(answer.quantity)}, {product_name: answer.product}], function(err, results){
                if (err) throw err;
                console.log(
                    chalk.red("Quantity was added.")
                )
                run();
            });
        })
    });
}

function addProd(){
    console.log(
        chalk.red("You are Adding To Inventory")
    )

        inquirer.prompt([{
            type: "input",
            name: "product",
            message: "Product: ",
            validate: function(value){
                if(value){
                    return true;
                } else{
                    return false;
                } 
            }
        },{
            type: "input",
            name: "department",
            message: "Department: ",
            validate: function(value){
                if(value){
                    return true;
                } else{
                    return false;
                } 
            }
        },{
            type: "input",
            name: "price",
            message: "Price: ",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                } else{
                    return false;
                } 
            }
        },{
            type: "input",
            name: "quanity",
            message: "Quantity: ",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                } else{
                    return false;
                } 
            }
        }]).then(function(answer){
            connection.query('INSERT INTO products SET ?', {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quanity
            }, function(err){
                if (err) throw err;
                console.log(
                    chalk.red("The new product was successfully")
                );
            })
            run();
        })
    // run();
}

run();