import Driver from '../models/driver.js';


export const createDriver = async (req, res) =>{
    const user = req.body;
    const newDriver = new Driver(user);
    try {
        const response = await newDriver.save();
        res.status(201).json({message:'Driver Successfully created',driver:response});
    } catch (error) {
        res.status(404).json({'message' : error.message});
    }

}

export const getDriver = async (req, res) =>{
    try {
        const drivers = await Driver.find();
        res.status(200).json({drivers});
    } catch (error) {
        res.status(404).json({'message' : error.message});
    }

}


export const updateDriver = async(req,res) =>{
    const { id } = req.params;
    const driver = req.body;
    const updates = Object.keys(driver)
    const allowedUpdates = ['availability','longitude','latitude'];
    const isValidOperation = allowedUpdates.every(allowedUpdate => updates.includes(allowedUpdate));
    if (driver) {
        if(driver.availability && 'On'.toLowerCase() === driver.availability.toLowerCase() && !isValidOperation){
            return res.status(400).send({'message' : "Longitude and Latitude are mandatory."});
        }else {
            try {
                const updatedDriver = await Driver.findById(id);
                updates.forEach(update => {
                    updatedDriver[update] = req.body[update];
                })
                await updatedDriver.save();
                return res.json(updatedDriver);
            } catch (error) {
                return res.status(409).json({'message' : error.message});
            }
        }
    }
    
    else{
        return res.status(409).send({'message' : "Invalid Entry"});

    }
    
}