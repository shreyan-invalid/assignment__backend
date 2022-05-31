const Collection = require("../models/collectionModel");

const getCollections = async (req, res, next) => {
  try {
    const userCollections = await Collection.find({
      "user.id": req.params.userId,
      function (err, collections) {
        if (err){
            next(err);
        }
        else{
            res.json({data: collections})
        }
      }
    });
    res.status(200).json({ data: userCollections });
  } catch (err) {
    next(error);
  }
};

const postCollection = async (req, res, next) => {
  try {
    const collection = new Collection({
      user: {
        id: req.body.userId,
        email: req.body.email,
      },
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
    });

    await collection.save();

    res.json({
      data: collection,
      status: 200,
      message: "Successfully uploaded",
    });
  } catch (error) {
    next(error);
  }
};

const getCollection = async (req, res, next) => {
  try {
    const userCollection = await Collection.findById(req.params.collectionId);

    res.status(200).json({ data: userCollection });
  } catch (error) {
    next(error);
  }
};

const deleteCollection = async (req, res, next) => {
  try {
    await Collection.findByIdAndDelete(req.body.collectionId);
    res.status(200).json({
      data: null,
      message: "Collection has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateCollection = async (req, res, next) => {
  try {
    if (req.body.type === "details") {
      const data = await Collection.findById(req.params.collectionId);
      if(req.body.title){
        data.title= req.body.title;
      }

      if(req.body.description){
        data.description= req.body.description;
      }
      
      await data.save();
      res.status(200).json({
        message: "Successfully added to collection",
      });
    } else if (req.body.type === "description") {
      const data = await Collection.findById(req.params.collectionId);
      
      await data.save();
      res.status(200).json({
        message: "Successfully added to collection",
      });
    } else if (req.body.type === "image") {
      const data = await Collection.findById(req.params.collectionId);
      if(data.products.includes(req.body.productId)){
        res.status(400).json({
          message: "You cant add a product twice"
        })
      }else{
        data.products.push(req.body.productId);
        await data.save();
        res.status(200).json({
          message: "Successfully added to collection",
        });
      }
   
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCollections,
  getCollection,
  deleteCollection,
  postCollection,
  updateCollection,
};
