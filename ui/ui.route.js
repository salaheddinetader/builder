import express from 'express';
import { changeContent } from '../page/page.controller';
import { editor, home } from './ui.controller';

const uiRoute = express.Router();

uiRoute.get('/', home);
uiRoute.get('/editor/:pageId', editor);
uiRoute.post('/editor/:pageId', changeContent);
// http://localhost:8080/api/editor/631355c77d1e931bf4ff3534
uiRoute.all('*', (req, res) => {
  res.render('404');
});

export default uiRoute;
