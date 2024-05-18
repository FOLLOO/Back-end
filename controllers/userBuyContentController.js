import UserBuyModule from "../models/userBuyContent.js";


export const createUserBuy = async (req, res) => {
    const {buy_period, seller_id} = req.body;
    const userID = req.userId.id;
    // const seller_id = req.params.id;


    try{
        if(!userID && !seller_id){
           return  res.status(500).send({error: 'Please enter Users'});
        }

        if(userID === seller_id){
            return  res.status(500).send({error: 'Вы не можете подписаться на самого сбея'});
        }

        const buyContent = await UserBuyModule.create({buyer_id:userID, seller_id:seller_id, buy_period })
        const dbSave = await buyContent.save();

        if (dbSave){
            return res.status(201).json({success: true});
        }

    }
    catch(err){
        res.status(500).json('----Errorr cannot buy content')
    }
}

export const getUserSubes = async (req, res) => {

    const userID = req.userId.id;

    if (!userID){
        res.status(500).send({error: 'Please enter Users'});
    }
    try{

        const contents = await UserBuyModule.find({buyer_id: userID})
        res.json(contents);

    }
    catch(err){
        res.status(500).json('----Errorr cannot found allowed contents')
    }


}