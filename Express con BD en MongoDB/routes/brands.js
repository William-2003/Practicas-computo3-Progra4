//importar las dependencias
const express = require('express');
const mongo = require('mongoose');
const { route } = require('.');
const { listen } = require('../app');
const Brand = require('../models/brand');
const router = express.Router();

//llamamos al modelo
const brand = require('../models/brand');


router.get('/', (req, res) =>{
    
});


router.post('/', (req, res) =>{
    if(req.body._id == "")
    newBrand(req, res);
    else
    updateBrand(req, res);
})


//metodo para requistrar
function newBrand(req, res){
    var brand = new Brand();
    brand.name = req.body.name;
    brand.description = req.body.description;
    brand.save((err) =>{
        if(!err){
            res.redirect("users/brand/list");
        }else{
            console.log("Se ha producido un error")
        }
    })
}

//metodo para actualizar
function updateBrand(req, res){
    //si no encuentra un registro, creara uno nuevo
    brand.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, 
        (err) => {
            if(!err){
                res.redirect("users/brand/list");
            }else{
                res.render("users/brand/brandAddEdit", {
                    viewTitle: "Update Brand",
                    brand: req.body
                })
                    
            }
        });

}


//procesar el metodo list para que cuando se guarde, mandara a list
router.get('/list', (req, res) =>{
    Brand.find((err, docs) =>{

        if(!err){
            res.render("users/brand/list",{
                list:docs
            });
            
        }else{
            console.log("Error al marcar las listas " + err);
                
        }
    })
})




router.get('/:id', (req, res) =>{
    Brand.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("users/brand/brandAddEdit", {
               viewTitle: "Update Brand",
               brand:doc 
            })
        }
    })
})





router.get('/detete/:id', (req, res) =>{

    Brand.findByIdAndRemove(req.params.id, (err, docs) =>{
        if(!err){
            res.redirect('/brand/list');
        }else{
            console.log("No se ha podido eliminar el regitro")
        }
    })

})
module.exports = router;