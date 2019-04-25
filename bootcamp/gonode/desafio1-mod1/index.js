const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false })) // tells express to encode url in our form

//! Middleware para o minor e o major
const checkAgeInfo = (req, res, next) => {
  const { age } = req.query
  if (!age) {
    console.log('not age')
    return res.redirect('/')
  }
  return next()
}

//* Rota inicial que renderiza uma página com um formulário com um único campo age que representa a idade do usuário;
app.get('/', (req, res) => {
  return res.render('form')
})
//* Rota chamada pelo formulário da página inicial via método POST que checa se a idade do usuário é maior que 18 e o redireciona para a rota /major , caso contrário o redireciona para a rota /minor (Lembre de enviar a idade como Query Param no redirecionamento);
app.post('/check', (req, res) => {
  const { Age } = req.body
  console.log(Age)
  if (Age) {
    if (Age > 18) {
      return res.redirect(`/major?age=${Age}`)
    } else {
      return res.redirect(`/minor?age=${Age}`)
    }
  }
})
//* Rota que renderiza uma página com o texto: Você é maior de idade e possui x anos , onde x deve ser o valor informado no input do formulário;
app.get('/major', checkAgeInfo, (req, res) => {
  console.log('major')
  const { age } = req.query
  return res.render('major', { age })
})
//* Rota que renderiza uma página com o texto: Você é menor de idade e possui x anos , onde x deve ser o valor informado no input do formulário;
app.get('/minor', checkAgeInfo, (req, res) => {
  console.log('minor')
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000)
