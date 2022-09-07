import { listPages } from '../page/page.services';
import validator from 'validator';
export const home = async (req, res) => {
  const pages = await listPages();
  res.render('home', { title: 'Webpage Builder', pages });
};

export const editor = async (req, res) => {
  if (!validator.isMongoId(req.params.pageId)) {
    console.log(' in editor controller id non valid');
    console.log('pageId', req.params.pageId);
    return;
  }
  console.log('in editor uiController');
  const pages = await listPages();
  const selectedPage = pages.find((page) => page.id === req.params.pageId);
  console.log('selectedPage ', selectedPage);
  res.render('editor', { title: 'Test Webpage Builder', pages, selectedPage });
};
