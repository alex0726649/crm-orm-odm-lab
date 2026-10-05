const Activity = require('../models/mongoose/activity');

async function getAll(req, res) {
  // funcion para saber si el usuario quiere filtrar los datos o leerlos todos
  const type = req.query.type;
  const filter = {};
  if(type){
    filter.type=type;
  }


  // recuperamos todas las activity's del más viejo al mas nuevo
  const activities = await Activity.find(filter).sort({createdAt: 1});

  res.status(200).json(activities);
}

async function getById(req, res) {
  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(200).json(activity);
}

async function create(req, res) {
  // agregamos metadata para asegurarnos que se conserven los campos
  const { type, description, contactId, userId, metadata } = req.body;
  const activity = await Activity.create({ type, description, contactId, userId, metadata });

  res.status(201).json(activity);
}

async function update(req, res) {
  // TODO CHALLENGE 08: revisar la operación de actualización
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(200).json(activity);
}

async function remove(req, res) {
  const activity = await Activity.findByIdAndDelete(req.params.id);

  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
