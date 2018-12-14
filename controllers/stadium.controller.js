const db = require('../config/db.config');
const Stadium = db.stadium;

const listStadia = async (req, res) => {
  const stadia = await Stadium.findAll();

  return res.status(200)
    .json(stadia);
}

const createStadium = (req, res) => {
  const { 
    name,
    city,
    capacity
   } = req.body;

  Stadium.create({
    name,
    city,
    capacity
  })
  .then(stadium => {
    res.status(201).json({
      message: 'stadium added',
      stadium
    })
  })
  .catch(error => {
    res.status(400).json({
      message: 'unable to add stadium'
    });
  });
}

const updateStadium = async (req, res) => {
  const stadium = await Stadium.findById(req.params.stadium_id);

  if (stadium) {
    const { 
      name,
      city,
      capacity
     } = req.body;
  
    Stadium.update({
      name,
      city,
      capacity
    }, { where: { id: req.params.stadium_id }})
    .then(() => {
      res.status(201).json({
        message: 'stadium updated'
      })
    })
    .catch(error => {
      res.status(400).json({
        message: 'unable to update stadium'
      });
    });
  } else {
    return res.status(404).json({
      message: 'stadium not found'
    });
  }
}

const getStadium = async (req, res) => {
  const stadium = await Stadium.findById(req.params.stadium_id);

  if (stadium) {
    return res.status(200).json(stadium);
  } else {
    return res.status(404).json({
      message: 'stadium not found'
    });
  }
}

const deleteStadium = async (req, res) => {
  const stadium = await Stadium.findById(req.params.stadium_id);

  if (stadium) {
    Stadium.destroy({
      where: {
        id: req.params.stadium_id
      }
    })
    .then(() => {
      return res.status(200).json({
        message: 'stadium deleted'
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: 'stadium could not be deleted'
      });
    });
  } else {
    return res.status(404).json({
      message: 'stadium not found'
    });
  }
}

module.exports = {
  listStadia,
  createStadium,
  getStadium,
  deleteStadium,
  updateStadium
}