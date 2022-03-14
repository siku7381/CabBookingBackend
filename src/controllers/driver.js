import Driver from '../models/driver.js';
import mongoose from 'mongoose';


export const createDriver = async (req, res) =>{
    const user = req.body;
    const newDriver = new Driver(user);
    try {
        const response = await newDriver.save();
        res.status(201).json({message:'Driver Successfully created',driver:response});
        console.log(response);
    } catch (error) {
        console.log(error);
        res.status(404).json({'message' : error.message});
    }

}

export const getDriver = async (req, res) =>{
    try {
        const drivers = await Driver.find();
        res.status(200).json({drivers});
        console.log(drivers);
    } catch (error) {
        console.log(error);
        res.status(404).json({'message' : error.message});
    }

}

export const loginDriver = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const drivers = await User.find({email,password});
        res.status(200).json({drivers,message:'successfully logged in'});
        console.log(drivers);
    } catch (error) {
        console.log(error);
        res.status(404).json({'message' : error.message});
    }

}

export const updateDriver = async(req,res) =>{
    const { id } = req.params;
    const driver = req.body;
    const updates = Object.keys(driver)
    const allowedUpdates = ['longitude','latitude'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    console.log('On'.toLowerCase() )
   
    if (driver.availability) {
        if('On'.toLowerCase() === driver.availability.toLowerCase() && !isValidOperation){
            return res.status(400).send({'message' : "Longitude and Latitude are mandatory."});
        }else {
            try {
                const updatedDriver = await Driver.findById(id);
                updates.forEach(update => {
                    updatedDriver[update] = req.body[update];
                    console.log(updatedDriver[update])
                    console.log(updatedDriver[update])
                })
                await updatedDriver.save();
                return res.json(updatedDriver);
            } catch (error) {
                return res.status(409).json({'message' : error.message});
            }
        }
    }
    
    else{
        return res.status(404).send({'message' : "Hello"});

    }
    
}