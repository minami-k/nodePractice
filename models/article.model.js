/* const db = require('../util/db-mysql.js')
 */
const mongodb = require('mongodb')
const getDB = require('../util/db-mongo').getDB
const fs = require('fs')
const path = require('path')

const postPath = path.join(path.dirname(process.mainModule.filename), 'data', 'post.json')

module.exports = class Articles {
    constructor(title, imageUrl, description, createdAt, comment){
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.createdAt = createdAt
        this.comment = comment
    }

    save(){
          const db = getDB()
          return db.collection('articles').insertOne(this)
}

    edit(id){   
        const db = getDB()
        const objectId = new mongodb.ObjectId(id)
        return db.collection('articles').updateOne({ _id: objectId }, {$set: this })
}

    static deleteById(id){
   
        const db = getDB()
        const objectId = new mongodb.ObjectId(id) 
        return db.collection('articles').deleteOne({ _id: objectId })
}

    static fetchAll(){
   
        const db = getDB()
        return db.collection('articles').find().toArray()
}

    static findById(id){    

        const db = getDB()
        const objectId = new mongodb.ObjectId(id)
        return db.collection('articles').find({ _id: objectId}).next()
    }

/*      static getArticleList(callback){
        fs.readFile(postPath, (err, content) => {
            const articleList = JSON.parse(content)

            if(err){
                callback(null)
            }else{
                callback(articleList)
            }
        })
    }
 */ 
    static addPost(title, imageUrl, description){
        fs.readFile(path.join(postPath), (err, content) => {
            let post = {
                articles: [],
                
            }
                
                if(!err){
                    post = JSON.parse(content)
                }

                const existingArticlesIndex = post.articles.findIndex(p => p.title, imageUrl, description === title, imageUrl, description)

                const existingArticles = post.articles[existingArticlesIndex]

                let updatedArticle

                if(existingArticles){
                    updatedArticle = {...existingArticles }
                    post.articles = [...post.articles ]
                    post.articles[existingArticlesIndex] = updatedArticle
                }else{
                    updatedArticle = { title, imageUrl, description}
                    post.articles = [...post.articles, updatedArticle]
                }

                fs.writeFile(postPath, JSON.stringify(post, null, 2), err => { console.log(err)})
            }
        )
    }
    static postDelete(title, imageUrl, description){
        fs.readFile(postPath, (err, content) => {
            if(err){
                return 
            }
            const updatedList = {...JSON.parse(content)}
            const article = updatedList.articles.find(a => a.title, imageUrl, description === title, imageUrl, description )
            if(!article){
                return
            }

            fs.writeFile(postPath, JSON.stringify(updatedList), err => {console.log(err)})
        })
    }
}

    