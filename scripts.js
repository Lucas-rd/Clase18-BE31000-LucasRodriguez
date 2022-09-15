//0) Creacion de base ecommerce
    //use ecommerce

// 1) Primer Insert y creacion de mensajes en collection de "mensajes"
    db.mensajes.insertMany([ { "userEmail": "lucas_kpo@hotmail.com [28/6/2022 23:38:12]", "message": "Aloha!" }, { "userEmail": "juan_kpomaximo@hotmail.com [28/6/2022 23:38:12]", "message": "Aloha para vos bro!" }, { "userEmail": "lucas_qda@hotmail.com [28/6/2022 23:37:00]", "message": "holiss!" }, { "userEmail": "baptis@asd.com [28/6/2022 23:39:30]", "message": "Buenas noches a todos!" }, { "userEmail": "asd@123.com [28/6/2022 23:39:31]", "message": "Que cuentan?!" }, { "userEmail": "lucas_kpo@hotmail.com [28/6/2022 23:40:12]", "message": "Todo piola!" }, { "userEmail": "juan_kpomaximo@hotmail.com [28/6/2022 23:41:12]", "message": "Me alegro! ACa tambien" }, { "userEmail": "lucas_qda@hotmail.com [28/6/2022 23:42:00]", "message": "Bueno, me tengo que ir!" }, { "userEmail": "baptis@asd.com [28/6/2022 23:42:39]", "message": "Buenas noches a todos!" }, { "userEmail": "asd@123.com [28/6/2022 23:43:31]", "message": "Byes!" } ])

// 2) Primer Insert y creacion de productos en collection de "productos"
    db.productos.insertMany([ { "title": "Mazo commander 1", "price": 950, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_847134-MLA49546578890_042022-O.webp" }, { "title": "Mazo comander 2", "price": 500, "thumbnail": "https://www.elrincondemagic.com/WebRoot/StoreLES/Shops/64576138/620A/2932/5562/8124/B02B/0A0C/6D0D/296B/Mazo_NEO_Abrochate_Cinturon.png"}, { "title": "Mazo comander 3", "price": 1620, "thumbnail": "https://media.magic.wizards.com/en_PaLTnONM9E.png"}, { "title": "Mazo Comander 4", "price": 6500, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_847134-MLA49546578890_042022-O.webp"}, { "title": "Mazo Comander 5", "price": 3200, "thumbnail": "https://www.hadouken.com.ar/108519-thickbox_default/mazo-magic-kamigawa-neon-dynasty-commander-buckle-up.jpg"}, { "title": "mazo 6", "price": 1240, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrHbO2MGmC1ZcJZTQGTH0XcBZXPXNtir43A&usqp=CAU" }, { "title": "mazo 7", "price": 2200, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2k_ZprssYKTuA7HXDy3xpciDXMLL7d3fWvA&usqp=CAU" }, { "title": "mazo 8", "price": 2340, "thumbnail": "https://www.hadouken.com.ar/108519-thickbox_default/mazo-magic-kamigawa-neon-dynasty-commander-buckle-up.jpg" }, { "title": "Mazo Commander 2018", "price": 4700, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAi8hA10IClDIn0GEfFnSsD37mfMMoVN1fQ&usqp=CAU" }, { "title": "Mazo Commander Gift", "price": 5500, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWM_zBZYDlKjdUr_a6Z7yhUfosDz3oe55DQ&usqp=CAU" } ])

//3)Listar los productos y mensajes de cada collection
    db.mensajes.find().pretty()
    db.productos.find().pretty()

//4) Mostramos la cantidad de documentos almacenados en cada collection
    db.mensajes.estimatedDocumentCount()
    db.productos.estimatedDocumentCount()
    
//5)CRUD sobre las collections
//a)
    db.productos.insertOne( {"title": "Mazo New Capenna", "price": 7420, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSj1gj2GW_hODKx7qrXhzXU25sjyLYeKpPw&usqp=CAU"})
//b) filtros con proyecciones
    db.productos.find({"price":{$lt:1000}},{"title":1, "_id":0})
    db.productos.find({$and:[
        {"price":{$gt:1000}},
        {"price":{$lt:3000}}
    ]},{"title":1, "_id":0})
    db.productos.find({"price":{$gt:3000}},{"title":1, "_id":0})
    db.productos.find({},{"title":1, "price":1, "_id":0}).skip(2).limit(1).sort({"price":1})
//e) actualizacion multiple con insercion
    db.productos.updateMany({},{$set:{"stock":100}},{upsert:true})
//d) actualziacion multiple
    db.productos.updateMany({"price":{$gt:4000}},{$set:{"stock":0}})
//e)borrado multiple
    db.productos.deleteMany({"price":{$lt:1000}})

//6) creacion de usuario con permisos de solo lectura y verificacion de lo mismo
    //use admin
    db.createUser(
        {
            user: "pepe5",
            pwd: "asd456",
            roles: [
                {role: "read", db: "ecommcerce"}
            ]
        }
    )
// Login con usuario pepe:
//Inicializo la base con el flag de autenticacion;
    //mongod -auth --dbpath ./base
    // mongo -u pepe -p asd456
//Verificacion de permisos de usuario nuevo
    db.productos.find({"price":{$lt:3000}},{"title":1, "_id":0})
    db.productos.deleteMany({"price":{$lt:4701}})
    db.productos.insertOne( {"title": "Mazo New Capenna", "price": 7420, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSj1gj2GW_hODKx7qrXhzXU25sjyLYeKpPw&usqp=CAU"})