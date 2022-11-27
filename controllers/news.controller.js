const News = require('../models/News.model')

module.exports.newsController = {
    
addPost: async (req,res) => {
    try {
        
        const news = await  News.create({
            ...req.body
        })
       
     res.json(news)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "news creating error" });
    }
    console.log(News);
},
deletePost: async (req,res) => {
    try {
        const post = News.findByIdAndDelete(req.params.id)
        res.json(post)
    } catch (error) {
        res.json({error:error.toString()})
    }
},
getNews: async (req,res) =>{
    try {
        const news = await News.find()
        res.json(news)
    } catch (error) {
        res.json({error: error.message})
    }
}

}