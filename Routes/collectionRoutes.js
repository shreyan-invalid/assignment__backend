const express = require("express");
const router = express.Router();
const collectionController = require("../Controllers/collectionController");
const collectionMiddleWares = require("../middleWares/collectionMiddleware");
const userMiddleWares = require("../middleWares/userMiddleware");

router.post(
  "/postCollection",
  collectionController.postCollection
);

router.get(
  "/:collectionId",
  collectionController.getCollection
);

router.get('/:userId/collections', 
    collectionController.getCollections
)

router.post(
  '/update/:collectionId',
  collectionController.updateCollection
)


module.exports= router;
