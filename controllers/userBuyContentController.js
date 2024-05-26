import UserBuyModule from "../models/userBuyContent.js";


// export const createUserBuy = async (req, res) => {
//     const {buy_period, seller_id} = req.body;
//     const userID = req.userId.id;
//     // const seller_id = req.params.id;
//
//
//     try{
//         if(!userID && !seller_id){
//            return  res.status(500).send({error: 'Please enter Users'});
//         }
//
//         if(userID === seller_id){
//             return  res.status(500).send({error: 'Вы не можете подписаться на самого сбея'});
//         }
//
//         const buyContent = await UserBuyModule.create({buyer_id:userID, seller_id:seller_id, buy_period })
//         const dbSave = await buyContent.save();
//
//         if (dbSave){
//             return res.status(201).json({success: true});
//         }
//
//     }
//     catch(err){
//         res.status(500).json('----Errorr cannot buy content')
//     }
// }

export const createUserBuy = async (req, res) => {
    const { buy_period, seller_id } = req.body;
    const userID = req.userId.id;

    if (!userID || !seller_id) {
        return res.status(400).send({ error: 'Both userID and seller_id are required' });
    }

    if (userID === seller_id) {
        return res.status(400).send({ error: 'You cannot subscribe to yourself' });
    }

    try {
        const existingSubscription = await UserBuyModule.findOne({ buyer_id: userID, seller_id });
        if (existingSubscription) {
            return res.status(400).send({ error: 'You are already subscribed to this user' });
        }

        const newSubscription = new UserBuyModule({ buyer_id: userID, seller_id, buy_period });
        const savedSubscription = await newSubscription.save();

        return res.status(201).json({ success: true, subscription: savedSubscription });
    } catch (err) {
        console.error('Error creating subscription:', err);
        return res.status(500).json({ error: 'Cannot create subscription' });
    }
};


// export const getUserSubes = async (req, res) => {
//
//     const userID = req.userId.id;
//
//     if (!userID){
//         res.status(500).send({error: 'Please enter Users'});
//     }
//     try{
//
//         const contents = await UserBuyModule.find({buyer_id: userID})
//         res.json(contents);
//
//     }
//     catch(err){
//         res.status(500).json('----Errorr cannot found allowed contents')
//     }
// }

export const getUserSubes = async (req, res) => {
    const userID = req.userId.id;

    if (!userID) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    try {
        // Получаем все подписки пользователя
        const contents = await UserBuyModule.find({ buyer_id: userID }).populate('seller_id', );

        const currentDate = new Date();
        const validSubscriptions = [];

        for (const content of contents) {
            // Вычисляем дату окончания подписки
            const expirationDate = new Date(content.createdAt);
            expirationDate.setMonth(expirationDate.getMonth() + parseInt(content.buy_period));

            if (currentDate < expirationDate) {
                validSubscriptions.push(content);
            } else {
                // Удаляем истекшую подписку
                await UserBuyModule.deleteOne({ _id: content._id });
                res.json({message: 'Срок подписки истек'})
            }
        }

        return res.json(validSubscriptions);
    } catch (err) {
        console.error('Error fetching subscriptions:', err);
        return res.status(500).json({ error: 'Cannot retrieve subscriptions' });
    }
};

