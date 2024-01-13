import {JsonController, Get, UseBefore, QueryParam} from 'routing-controllers';
import {all} from '../services/currencies';
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class CurrencyController {

  @Get('/currencies')
  async getCurrencies(@QueryParam("code") code?: string) {
    return await all(code);
  }
}

export default CurrencyController;