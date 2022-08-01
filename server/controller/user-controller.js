import User from '../model/user.js';
import bcrypt from 'bcrypt';

export const signupUser= async(request,response)=>{
    try{
        // const salt=await bcrypt.getSalt();
        const hashedPassword=await bcrypt.hash(request.body.password,10);

            // const user=request.body; 
            const user={username:request.body.username, name:request.body.name, password:hashedPassword};
            
            const newUser=new User(user);
            await newUser.save();

            return response.status(200).json({msg:"signup Successfull"});
    }
    catch(error){
        return response.status(500).json({msg:"Error while signup"});
    }
}