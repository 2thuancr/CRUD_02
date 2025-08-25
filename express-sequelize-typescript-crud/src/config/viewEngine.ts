import express, { Application } from 'express';
import path from 'path';

const configViewEngine = (app: Application): void => {
  // Set view engine
  app.set('view engine', 'ejs');
  
  // Set views directory
  app.set('views', path.join(__dirname, '../views'));
  
  // Set static files directory
  app.use('/static', express.static(path.join(__dirname, '../public')));
};

export default configViewEngine;
