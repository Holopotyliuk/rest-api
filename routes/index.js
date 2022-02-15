const express=require('express')
const router=express();
const controller=require('../controllers/controller.js')
router.get('/lists/:listId/tasks',controller.readById);
router.post('/lists/:listId/tasks',controller.creatById);
router.get('/tasks',controller.read);
router.post('/tasks',controller.creat);
router.patch('/tasks/:id',controller.update);
router.delete('/tasks/:id',controller.delete)
router.put('/tasks/:id',controller.replace);
module.exports=router