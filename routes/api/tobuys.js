const router = require('express').Router();
var tobuysCtrl = require('../../controllers/api/tobuys');

router.get('/', tobuysCtrl.index);
router.get('/:id', tobuysCtrl.show);
router.post('/', tobuysCtrl.create);
router.delete('/:id', tobuysCtrl.delete);
router.put('/:id', tobuysCtrl.update);

module.exports = router;