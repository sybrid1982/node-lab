"use strict";
const express = require("express");
const clothes = express.Router();
// An array of clothes to start our data
const clothesList = [
    {
        "brand": "Old Navy", 
        "type": "T-shirt",
        "color": ["red"],
        "price": 5,
        "id": 0
    },
    {
        "brand": "Gap", 
        "type": "Hoodie",
        "color": ["yellow"],
        "price": 25,
        "id": 1        
    },
    {
        "brand": "Wrangler", 
        "type": "Khakis",
        "color": ["blue"],
        "price": 20,
        id: 2
    }        
];
// This will increase every time we add an item, and it will
// ensure all items have a unique id
let idCount = clothesList.length;

/*  This handles the get request.
*   When a get request is recieved, return the clothesList array
*/
clothes.get("/clothes", (req, res) => {
    res.send(clothesList)    
});
/*  This handles the delete request.
*   When a delete request is recieved, it will come with an id parameter.
*   Splice out the element with that id, then return clothesList 
*/
clothes.delete("/clothes/:id", function(req, res){
    let count = 0;
    for (let clothes of clothesList) {
        if (clothes.id == req.params.id) {
            clothesList.splice(count, 1);
        }
        count++;        
    }
    res.send(clothesList);                            
});
/*  This handles the post request.
*   When a post request is recieved, it will come with a body of data.
*   Add a new object with that data to the clothesList array
*   With a new unique id from the ever-increasing idCount, then return clothesList 
*/
clothes.post("/clothes", (req, res) => {
    clothesList.push({
        brand: req.body.brand,
        type: req.body.type,
        color: req.body.color,
        price: req.body.price,
        id: idCount++                                                                                                                                                        
    });
    res.send(clothesList);                
});
/*  This handles the put request.
*   When a put request is recieved, it will come with an id parameter and a body of data.
*   Splice out the element with that id and replace it with a new object that has the same id but the data from the sent data,
*   then return clothesList 
*/
clothes.put("/clothes/:id", function(req, res){
    let count = 0;
    for (let clothes of clothesList) {
        if (clothes.id == req.params.id) {
            let updatedclothes = {
                brand: req.body.brand,
                type: req.body.type,
                color: req.body.color,
                price: req.body.price
            }
            updatedclothes.id = clothes.id;
            clothesList.splice(count, 1, updatedclothes);
        }
        count++;        
    }
    res.send(clothesList);                            
});


module.exports = clothes;