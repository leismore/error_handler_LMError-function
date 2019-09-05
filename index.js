/**
 * error_handler_LMError
 * A error handler function for LMError (https://github.com/leismore/LMError) NodeJS.
 */

'use strict';

const Response    = require('@leismore/response');
const LMError     = require('@leismore/lmerror');

module.exports = (error, req, res, next) => {

  const resp = new Response(res);

  // If HTTP headers sent, go to default handler
  if (res.headersSent) {
    next(error);
    return;
  }
  // End

  if (error instanceof LMError === false)
  {
    next(error);
    return;
  }
  else
  {
    if (error.httpCode === null)
    {
      resp.res500(error);
      return;
    }

    let initCode = String(error.httpCode)[0];

    switch (initCode) {
      case '4':
        resp.errorClient(error.httpCode);
        return;
      case '5':
        resp.errorServer(error.httpCode, error);
        return;
      default:
        resp.res500(error);
        return;
    }
  }

};
