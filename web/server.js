const express = require('express')
const next = require('next')
const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser=require('body-parser');
const rewrite = require('express-urlrewrite');


app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({extended:true}));
    server.use(bodyParser.json());
    
    //server.use(rewrite(/^\/coder\/?(.*)/,'/$1'));
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })

    server.get('/generateCode', (req, res) => {
        console.log(req.query);
        generator.init(true);
        generator.generate(req.query.lan,req.query.type,req.query.subtype,req.query.withFramework);
        res.sendStatus(200)
        //return app.render(req, res, '/a', req.query)
    })

    server.get('/generateCodeByProjectId/', (req, res) => {
      //console.log('generator message!!!!');
      console.log(req.query);
        generator.init(false,req.query);
        generator.generate(req.query);
        res.sendStatus(200)
    })
    server.post('/generateCodeByProjectId/', (req, res) => {
      console.log('generator');
      console.log(req.body);
        generator.initByQuery(req.body);
        //generator.generate(req.body);
        generator.generateByQuery(req.body.projectSetting);
        res.sendStatus(200)
    })
    server.post('/generateCodeByDefine', (req, res) => {
        console.log(req);
        generator.init(false,req.body);
        generator.generate(req.query.lan,req.query.type,req.query.subtype,req.query.withFramework);
        
        res.sendStatus(200);
    });

    server.post('/gitPushHook', (req, res) => {
        console.log(req.body);
        res.sendStatus(200)
    });
;

    server.get('/posts/:id', (req, res) => {
      console.log('poes');
      return app.render(req, res, '/posts', { id: req.params.id })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
