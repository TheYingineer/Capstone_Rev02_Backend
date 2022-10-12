const express = require("express");
const purchaseHisotryController = require("../controllers/purchaseHistory");
// const { checkJwt } = require('../middleware')
const router = express.Router();

router.get("/", purchaseHisotryController.getAllPurchaseHistory);

router.get("/:id", purchaseHisotryController.getPurchaseHistoryByID);

router.post("/", purchaseHisotryController.createPurchaseHistory);

router.put("/:id", purchaseHisotryController.updatePurchasHistoryByID);

router.delete("/:id", purchaseHisotryController.deletePurchaseHistorybyID);

module.exports = router;
