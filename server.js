import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import uiRoute from './ui/ui.route';
import pageRoute from './page/page.route';
import assetRoute from './assets/assets.route';
import projectRoute from './project/project.route';
import renderHtml from './render/render.controller';
//Initialize App
const app = express();
app.use(express.json());
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

corsOptions.credentials = true;
app.use(cors(corsOptions));

//HTML and Static file
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.set('views', `views`);
app.set('view engine', 'hbs');

const mongoUri =
  'mongodb+srv://builder:builder1984builder@builder.et5kojr.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },

  )
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log('noconnected', err);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
app.get('/', (req, res) => {
  console.log('root page');
  res.status(301).redirect('/api/');
});
app.use('/api/projects', projectRoute);
app.use('/api/pages', pageRoute);
app.use('/api/assets', assetRoute);
app.use('/api/', uiRoute );
app.get('/:pageId?', renderHtml);

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
