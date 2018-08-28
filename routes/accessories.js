"use strict";
const express = require("express");
const accessories = express.Router();
// An array of accessories to start our data
const accessoryList = [
    {
        "brand": "Gucci", 
        "type": "watch",
        "material": ["tungsten", "silver", "radium"],
        "price": 200,
        "id": 0
    },
    {
        "brand": "Shinola", 
        "type": "watch",
        "material": ["gold-plating", "aluminum", "tin"],
        "price": 500,
        "id": 1        
    },
    {
        "brand": "Invicta", 
        "type": "Watch",
        "material": ["Gold", "Silver", "Obsidian", "Wood"],
        "price": 300,
        id: 2
    }        
];
// This will increase every time we add an item, and it will
// ensure all items have a unique id
let idCount = accessoryList.length;

/*  This handles the get request.
*   When a get request is recieved, return the accessoryList array
*/
accessories.get("/accessories", (req, res) => {
    res.send(accessoryList)    
});
/*  This handles the delete request.
*   When a delete request is recieved, it will come with an id parameter.
*   Splice out the element with that id, then return accessoryList 
*/
accessories.delete("/accessories/:id", function(req, res){
    let count = 0;
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            accessoryList.splice(count, 1);
        }
        count++;        
    }
    res.send(accessoryList);                            
});
/*  This handles the post request.
*   When a post request is recieved, it will come with a body of data.
*   Add a new object with that data to the accessoryList array
*   With a new unique id from the ever-increasing idCount, then return accessoryList 
*/
accessories.post("/accessories", (req, res) => {
    accessoryList.push({
        brand: req.body.brand,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        id: idCount++                                                                                                                                                        
    });
    res.send(accessoryList);                
});
/*  This handles the put request.
*   When a put request is recieved, it will come with an id parameter and a body of data.
*   Splice out the element with that id and replace it with a new object that has the same id but the data from the sent data,
*   then return accessoryList 
*/
accessories.put("/accessories/:id", function(req, res){
    let count = 0;
    console.log("Called put route");
    console.log(req.body);
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            let updatedAccessory = {
                brand: req.body.brand,
                type: req.body.type,
                material: req.body.material,
                price: req.body.price
            }
            updatedAccessory.id = accessory.id;
            accessoryList.splice(count, 1, updatedAccessory);
        }
        count++;        
    }
    res.send(accessoryList);                            
});


module.exports = accessories;