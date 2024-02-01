import express from 'express';
import * as services from '../services/render.js';
import { create, find, update, remove } from '../controller/controller.js';
const route = express.Router();

route.get('/',services.homesRoutes)

route.get('/add_user',services.add_user);

route.get('/update_user',services.update_user);

// API
route.post('/api/users', create);
route.get('/api/users', find);
route.put('/api/users/:id', update);
route.delete('/api/users/:id', remove);

export default route;
// module.exports = route
// export { route };
