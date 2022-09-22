import { findPageById } from '../page/page.services';
import validator from 'validator';
const renderHtml = async (req, res, next) => {
  try {
    const { params } = req;
    const { pageId } = params;
    if (!validator.isMongoId(pageId)) {
      console.log(' renderHtml id non valid');
      console.log('pageId', pageId);
      return;
    }
    const page = await findPageById(pageId);
    console.log('render controller findPageById ' , page.content);
    if (!page) {
      return res.render('404');
    }
    const { content, name } = page;
    let html = content['mycustom-html'];

    const css = content['mycustom-css'];

    res.render('render', { html, css, name });
  } catch (error) {
    // res.render('404');
    console.log(error);
  }
};

export default renderHtml;
