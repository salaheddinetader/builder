import {
  createPage,
  deletePage,
  listPages,
  pageDetails,
  savePageContent,
  updatePage,
} from './page.services';
import validator from 'validator';
export const create = async (req, res) => {
  const pageBody = req.body;
  console.log(pageBody);
  // isEmpty
  if (validator.isEmpty(pageBody.name)) {
    console.log('page controller !pageBody');
    return res.json('no slug');
  }
  const page = await createPage(pageBody);
  res.json(page);
};
export const list = async (req, res) => {
  const pages = await listPages();
  res.json(pages);
};
export const details = async (req, res) => {
  const { pageId } = req.params;
  if (!validator.isMongoId(pageId)) {
    console.log(' details page id nn valid');
    return;
  }
  const details = await pageDetails(pageId);
  res.json(details);
};
export const deletePageRecord = async (req, res) => {
  const { pageId } = req.params;
  const data = await deletePage(pageId);
  res.json(data);
};
export const update = async (req, res) => {
  const { pageId } = req.params;
  if (!validator.isMongoId(pageId)) {
    console.log(' update page id nn valid');
    return;
  }
  const pageBody = req.body;
  const page = await updatePage(pageId, pageBody);
  res.json(page);
};
export const changeContent = async (req, res) => {
  console.log('req.body  ', req.params);

  const { pageId } = req.params;
  // if (!validator.isMongoId(pageId)) {
  //   console.log('changeContent page id nn valid');
  //   // return;
  // }
  const pageContent = await savePageContent(pageId, req.body);
  res.json(pageContent);
};
export const loadContent = async (req, res) => {
  const { pageId } = req.params;
  if (!validator.isMongoId(pageId)) {
    console.log('loadContent page id nn valid');
    return;
  }

  res.header('Content-Type', 'application/json');
  const pageData = await pageDetails(pageId);
  console.log(pageData.content);
  res.json(pageData.content);
};
