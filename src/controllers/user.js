import User from '../models/user.js';
import Driver from '../models/driver.js';
import bcrypt from 'bcryptjs';

const checkDistance = (array,threshHold) =>{
    const dist = array.map((arr) => arr.distance);
    const minDistance = Math.min(...dist);
    const DriverIds = array.filter((arr) => (arr.distance < threshHold));
    if (DriverIds.length) {
        return {minDistance,DriverIds}
    }
    else{
        return {message : 'No cab is available now.'}
    }
}

export const createUser = async (req, res) =>{
    const user = req.body;
    
    try {
        const hashedPass = await bcrypt.hash(user.password,8);
        const newUser = new User({...user,password:hashedPass});
        const response = await newUser.save();
        res.status(201).json({message:'User Successfully created',user:response});
    } catch (error) {
    }

}



export const getUser = async (req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(404).json({'message' : error.message});
    }

}


export const bookCab = async (req, res) => {
    try {
        const drivers = await Driver.find();
        const user = await User.findById({_id:req.params.id});

        const x1 = user.longitude;
        const y1 = user.latitude;
        let x2 = 0;
        let y2 = 0;

        let shortestDistance = drivers.map(driver => {
            x2 = driver.longitude;
            y2 = driver.latitude;
            const squredDistance = Math.pow((x2-x1),2) + Math.pow((y2-y1),2);
            let distance = Math.sqrt(squredDistance);
            return {distance, availability : driver.availability, driverId : driver._id};
        });

        const result = checkDistance(shortestDistance,40);
        res.status(200).json({drivers,shortestDistance,result});
    } catch (error) {
        res.status(404).json({'message' : error.message});
    }
}