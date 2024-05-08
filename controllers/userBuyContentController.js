import UserBuyModule from "../models/userBuyContent.js";


export const createUserBuy = async (req, res) => {
    const {user_id, buy_period} = req.body;
    const seller_id = req.params.id;


    try{
        if(!user_id && !seller_id){
            res.status(500).send({error: 'Please enter Users'});
        }

        const buycontetn = await UserBuyModule.create({buyer_id:user_id,seller_id:seller_id, buy_period })
        const dbSave = await buycontetn.save();

    }
    catch(err){
        res.status(500).json('----Errorr cannot buy content')
    }
}

export const checkUserBuyers = async (req, res) => {
    const {user_id} = req.body;

    try{

        const contents = await UserBuyModule.find({buyer_id: user_id})

        res.json(contents);
    }
    catch(err){
        res.status(500).json('----Errorr cannot found allowed contents')
    }


}