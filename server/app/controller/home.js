const Controller = require('egg').Controller
const { Base64 } = require('js-base64')

class HomeController extends Controller {
  async report () {
    const { ctx } = this
    const { query } = ctx.request
    if (query) {
      const { data } = query
      console.log(Base64.decode(data))
    }
    ctx.status = 200
  }
}

module.exports = HomeController
