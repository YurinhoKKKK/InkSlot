const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/usuariosRoutes');

const path = require('path');
const session = require('express-session');

const requireAuth = require('./middleware/requireAuth');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(
  session({
    secret: '2787ewdansWN89',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, 
  })
);

const sequelize = require('./config/database');

sequelize
  .sync({ force: false })
  .then(() => console.log('Tabelas sincronizadas com sucesso!'))
  .catch((err) => console.error('Erro ao sincronizar tabelas:', err));

process.on('uncaughtException', function (err) {
  console.log(err);
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
  next();
});

app.use((req, res, next) => {
  const noLayoutRoutes = ['/auth/login', '/auth/cadastro']; 
  if (noLayoutRoutes.includes(req.path)) {
    res.locals.layout = false;
  }
  next();
});


app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/usuarios', requireAuth, userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
