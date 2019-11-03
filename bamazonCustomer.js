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
    password: "whoops",
    database: "customer_db"
});

// figlet.fonts(function(err, fonts) {
//     if (err) {
//         console.log('something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.dir(fonts);
// });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    let title = figlet.textSync('Bamazon', {
        font: 'broadway',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
    })

    console.log(
        gradient.vice(title)
    );
});

function start() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);

        // chalk.cyan(chart);


    
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: "What's the ID of the item you want to treat-yo-self with?",
                validate: function(value){
                    if(isNaN(value) == false && parseInt(value) <= results.length && parseInt(value) > 0){
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'quantity',
                message: "How many of those do you want?",
                validate: function(value){
                    if(isNaN(value)){
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then (function(answer){
            var buying = (answer.id)-1;
            var muchbuying = parseInt(answer.quantity);
            var total = parseFloat(((results[buying].price)*muchbuying).toFixed(2));

            if (results[buying].stock_quantity >= muchbuying){
                connection.query("UPDATE products SET ? WHERE ?", [
                    {stock_quantity: (results[buying].stock_quantity - muchbuying)},
                    {id: answer.id}
                ], function(err, results){
                    if (err) throw err;
                        chalkAnimation.rainbow(`Yay! Your total is ${total.toFixed(2)}. Inventory has beeen updated.`)
                    
                });
            } else {
                    chalkAnimation.glitch(`Whoops! We dont have enough for you right now :(`)   
            }

            spree();
        });

    });
}

function spree() {
    inquirer.prompt([{
            type: 'confirm',
            name: "respond",
            message: "Want to buy something else?"
        }]).then(function(answer){
            if(answer.respond){
                start();
            } else{
                chalkAnimation.neon("Thank You for your business!")
                connection.end();
            }
        });
    };

    start();
