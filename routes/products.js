var express = require('express');
var router = express.Router();
const products = require('../public/products.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(products)
});

router.get('/:id',function (req,res,next) {
  const getId = req.params.id 
  console.log(getId)
  const produit = products[getId]
  if(!produit){
    res.status(404).json({error:"il n'ya pas des produits avec ce nom"})
  }
  res.json({produit})
})

router.get('/instock/:qt',function (req,res,next) {
  const getQt = parseInt(req.params.qt);

  const productArray = Object.values(products);

  const filteredProducts = productArray.filter(product => product.stock >= getQt);
  res.json(filteredProducts);
 
})

router.get('/:id/:qt',function (req,res,next) {
 const getId = req.params.id;
 const getQt = req.params.qt;
 var produit = products[getId];
 if(!produit){
  res.status(404).json({error:"il n'ya pas des produits avec ce nom"})
}
res.json({
  "id" : getId,
  "qt" : getQt, 
  "unit_price" : produit.price,
  "total_price" : produit.price * getQt,

})


})



  
module.exports = router;
