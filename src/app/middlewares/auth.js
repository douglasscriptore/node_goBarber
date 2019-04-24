module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // res.locals é um objeto que fica visivel para todos templates com nunjucks
    // para acessar o locals e dar acesso em todos arquivos de nunjucks
    res.locals.user = req.session.user
    return next()
  }

  return res.redirect('/')
}
