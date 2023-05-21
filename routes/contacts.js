var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

router.get('/listcontact', async function(req,res,next) {
    try{
        const data = await Contact.find()
       res.render('form.twig',{data , title : "contact List"})
        }catch(error){
     res.status(500).json({message: error.message}); 
    }
    
});


router.post('/addContact',function(req,res,next) {
    const  FullName = req.body.FullName ;
    const Phone = req.body.Phone;

    const newContact = new Contact({
        FullName,Phone
    });
    newContact.save()
    .then((contact) => {
        res.json(contact);
    })
    .catch((error) => {
        res.status(404).json({ error : "Erreur lors de la creation"})
    })
})
router.post('/addContact2', async function(req, res, next) {
    try {
      const { FullName, Phone } = req.body;
      const newContact = new Contact({ FullName, Phone });
      await newContact.save();
      res.redirect('/contact/listcontact');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.post('/addContact3',async function(req,res,next) {
    try {
    const contactData = req.body
    const data = await Contact.create(contactData);
    res.redirect('/contact/listcontact');    
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }

})

router.get('/addtwig', (req, res) => {
    res.render('contacts.twig');
});

router.get('/recherche/:id', async function(req,res,next) {

   try {
    const id = req.params.id ; 
    const data = await Contact.findById(id)
    if (!data){
        return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(data)
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
    
})

router.delete('/supprimer/:id',async function(req,res,next) {

    try {
        const id = req.params.id ;
        const data = await Contact.findOneAndDelete(id);
        if (!data){
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted"})
       } catch (error) {
        res.status(500).json({ message: error.message });
       }

   
})

router.delete('/deleteAll', async function(req, res, next) {
    try {
      await Contact.deleteMany();
      res.status(200).json({ message: "All contacts deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

router.put('/update/:id',async function(req, res, next) {
    try {
     const data = await Contact.findOneAndUpdate({_id : req.params.id},
        req.body,{new : true})
    if(!data){
        return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


  


module.exports = router;
