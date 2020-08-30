/** @param {Express.Response} res  */
/** @param {String} errorMessage */
/** @param {Number} [code=400] - HTTP Code (Default is 400) */
module.exports = function sendError (res, errorMessage, code = 400) {
  return res.status(code).json({ errors: [{ msg: errorMessage }] })
}
