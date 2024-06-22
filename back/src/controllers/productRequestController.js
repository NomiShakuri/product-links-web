const shopService = require('../services/shopService');

//שליפת כל הבקשות
const getAllRequests = async (req, res) => {
//   try {
//     const shops = await shopService.getAllShops();
//     res.status(200).json(shops);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
}
//  שליפת בקשות לפי חנות  
const getRequestByShopId = async (req, res) => {
  const shopId = req.params.shopId;
  try {
    const shop = await shopService.getShopById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
// הוספת בקשה
const addRequest = async (req, res) => {
  const { name, shopManager, siteLink, numberOfLinks, availability, type} = req.body;
  try {
      const newShop = await shopService.addShop({ name, shopManager, siteLink, numberOfLinks, availability, type });
      if (newShop.status === 200) {
          res.status(201).json({ message: 'Shop created successfully', shop: newShop.newShop });
      } else {
          res.status(newShop.status).json({ message: newShop.message });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};
// עדכון סטטוס בקשה
const updateRequestStatusById = async (req, res) => {
  const { name, siteLink } = req.body;
  const shopId = req.params.shopId;
  try {
    const updatedShop = await shopService.updateShopById(shopId, {name,siteLink});
    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({message: 'Shop updated successfully',updatedShop});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
// מחיקת בקשה
const deleteRequestById = async (req, res) => {
  const shopId = req.params.shopId;
  console.log(shopId);
  try {
    const deletedShop = await shopService.deleteShopById(shopId);
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  getAllRequests,
  getRequestByShopId,
  addRequest,
  updateRequestStatusById,
  deleteRequestById
};
