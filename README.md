# Bamazon

This is an Amazon wanna-be app. You can view a list of products/their prices and 'purchase' items.

You can also go into a Manager mode where you have a choice of a handful of commands:

* View current inventory
* View inventory with low quantities (less than 5)
* Add stock quantity to any given product
* Add a new product to the inventory

---

### Techologies and NPMs used:

* Javascript
* Node.js
* MySql
* Gitfox
* figlet
* chalk
* gradient-string
* chalk-animation
* inquirer


[Link to GitHub repo](https://github.com/seyleigh/bamazzon)

---

### Customer Function

```javascript
node bamazonCustomer.js
```


This command will bring up the customer page which will let the user choose an item for purchase, and how many of said item that the user wants. 

![Bamazon Customer Function](/images/buy.gif)
---

If the user tries to buy a more than the store has to offer they will get an error message stating that there is insufficient inventory. Featuring a cool glitchy font - courtesty of ```chalk-animation``` (see gif below)



![Bamazon Insufficient Inventory](/images/insufficient.gif)
---

### Manager Functions

```javascript
node bamMan.js
```

This command will open the Manager interface. The user has a choice of management functions including:
* View current inventory
* View inventory with low quantities (less than 5)
* Add stock quantity to any given product
* Add a new product to the inventory
* Exit

![Manager Function](/images/manager.gif)
---

When the user selects viewing current inventory it will open up the table that is shown in the customer view. Then the user has the choice to choose any of the other functions.

Selecting to view inventory with low quantities will display all the products that have stock quantities lower than 5. (Which is demonstrated in the gif above) The main options list will show once that function has run.

Choosing add to inventory will prompt the user to choose a product they want to increase the quanity of, followed by how much they want to add. Then they will again have the option to select from the other management functions.

Adding a new product to inventory will allow the user to create an entirely new product to add to the inventory which will reflect on the table if the user goes to view products, which they will have that option when they finish following the prompts and creating the product.

Finally - when the user has done everything they want they can select ``` Exit ``` to get a pretty message saying bye.

![Exit Manager Function](/images/manEnd.gif)
---


### Problems I faced:

When a user in the Customer view gets done buying something or trying to buy something but having insufficient stock - after it displays the final message, in order to get the prompt asking if you want to buy something else or not you have to press an arrow key to make it appear. If you just press enter it'll automatically select yes and run the start function again. I tried moving where ``` spree() ``` was called but that didn't change anything. Perhaps I just didn't move it to the right spot.





