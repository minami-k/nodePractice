/* const db = require('../util/db-mysql.js')
 */
const mongodb = require('mongodb')
const getDB = require('../util/db-mongo').getDB
const fs = require('fs')
const path = require('path')

const postPath = path.join(path.dirname(process.mainModule.filename), 'data', 'post.json')

module.exports = class Articles {
    constructor(title, imageUrl, description, likes_count, createdAt, comment){
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.createdAt = createdAt
        this.comment = comment
        this.likes_count = likes_count
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

}

    