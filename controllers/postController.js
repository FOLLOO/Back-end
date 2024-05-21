// как отправлять const formData = {
//     title: 'Post Title',
//     description: 'Post Description',
//     user_id: 'user123',
//     contents: [
//         {
//             text_content: 'Text content 1',
//             video_url: 'https://example.com/video1.mp4',
//             image: null, // или данные изображения, если есть
//         },
//         {
//             text_content: 'Text content 2',
//             video_url: null,
//             image: imageData, // данные изображения
//         },
//         // Другие элементы контента
//     ],
// };
//
// axios.post('/api/posts', formData)
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => {
//         console.error(error);
//     });


// const postModule = require('../models/post.js');
import postModule from '../models/post.js';
import postContentModule from '../models/postContents.js';

import userBuyModule from '../models/userBuyContent.js';

import userModule from '../models/user.js';

// import Posts from "../routes/posts.js";
// const postContentModule = require('../models/postContents.js');

export const createPost = async (req, res) => {

    try {
        const { title, description, contents } = req.body;

        const user_id = req.userId.id;
        const role = req.userId.role;

        // if (role !== 'автор' || 'админ'){
        //     return res.status(401).json({success: false});
        // }

        const post = new postModule({ title, description, user_id, banned: true });
        const savedPost = await post.save();

        // Создание связанного контента для поста
        const postContents = await Promise.all(
            contents.map(async (content) => {
                const postContent = new postContentModule({
                    post_id: savedPost._id,
                    ...content,
                });
                return postContent.save();
            })
        );
        res.status(201).json({ post: savedPost, contents: postContents });

    }
    catch(err) {
        console.log(err);
        res.status(500).send({message: "Ничего не вышло сорян братан"});
    }

};

export const getOne = async (req, res) => {


    try {
        const postID = req.params.id;
        if(postID){
            const post = await postModule.findOneAndUpdate(
                { _id: postID },
                {
                    $inc: { views: 1 },
                },
                {
                    returnDocument: 'after',
                    // new: true, // Необходимо добавить опцию new: true для возврата обновленного документа
                }
            );

            if (!post) {
                return res.status(404).json({ message: 'Post not found 1' });
            }

            const postContents = await postContentModule.find({ post_id: postID });
            res.status(200).json({ post, contents: postContents });
        }
        else{
            res.status(404).json({ message: 'Post not found 3' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving post' });
    }

};

export const getAll = async (req, res) => {

    try{
        const posts = await postModule.aggregate([
            {
                $lookup: {
                    from: 'postcontents', // Название коллекции для связанного контента
                    localField: '_id', // Поле в коллекции постов, связанное с контентом
                    foreignField: 'post_id', // Поле в коллекции контента, связанное с постами
                    as: 'contents' // Название поля, в которое будут помещены связанные документы
                }
            }
        ]);
        const updatedPosts = await Promise.all(posts.map(async p => {
            const userBuyContent = await userBuyModule.findOne({ seller_id: req.userId.id});
            const userCost = await userModule.findOne({ _id: p.user_id});
            return {
                ...p,
                cost: userCost.cost,
                subs: !!userBuyContent
            };
        }));

        res.status(200).json(updatedPosts);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Ничего не вышло сорян братан, нету постов"});
    }

};

export const getUserPost = async (req, res) => {

    const userID = req.userId.id;
    const avotor = req.params.id;

    if (!userID || !avotor ){
        return res.status(400).json({message: 'NULL'})
    }
    // console.log(avotor);
    // const checkSub = await userBuyModule.find({seller_id: avotor, user_id: })

    try{
        const posts =await postModule.find({user_id: avotor}).populate('user_id')
        // const posts = await postModule.aggregate([
        //     { $match: { user_id: "66362f026617594c6a1d0180" }},
        //     {
        //         $lookup: {
        //             from: 'postcontents', // Название коллекции для связанного контента
        //             localField: '_id', // Поле в коллекции постов, связанное с контентом
        //             foreignField: 'post_id', // Поле в коллекции контента, связанное с постами
        //             as: 'contents' // Название поля, в которое будут помещены связанные документы
        //         }
        //     }
        // ], );
        // console.log(avotor);
        // console.log(posts);
        // const updatedPosts = await Promise.all(posts.map(async p => {
        //     const userBuyContent = await userBuyModule.findOne({ seller_id: req.userId.id});
        //     const userCost = await userModule.findOne({ _id: p.user_id});
        //     return {
        //         ...p,
        //         cost: userCost.cost,
        //         subs: !!userBuyContent
        //     };
        // }));
        res.json(posts)
        // res.status(200).json(updatedPosts);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Ничего не вышло сорян братан, нету постов"});
    }

};

export const deleteOne = async (req, res) => {

    const user_id = req.userId.id;

    try{

        const postID = req.params.id;

        const postsContents = await postContentModule.deleteMany({ post_id: postID });
        const posts = await postModule.deleteOne({ _id: postID });

        res.status(201).json({ success: true });
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Ничего не вышло удалить сорян братан"});
    }

};

export const updateOne = async (req, res) => {

    const user_id = req.userId.id;

    try {
        const postID = req.params.id;
        const { title, description, contents, banned } = req.body;

        // Обновление поста
        const updatedPost = await postModule.findByIdAndUpdate(
            postID,
            { title, description, user_id, banned },
            { new: true } // Возвращает обновленный документ
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        // Удаление старых связанных контентов
        await postContentModule.deleteMany({ post_id: postID });

        // Создание новых связанных контентов
        const newPostContents = await Promise.all(
            contents.map(async (content) => {
                const postContent = new postContentModule({
                    post_id: postID,
                    ...content,
                });
                return postContent.save();
            })
        );

        res.status(200).json({ post: updatedPost, contents: newPostContents });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при обновлении поста и контента' });
    }
};