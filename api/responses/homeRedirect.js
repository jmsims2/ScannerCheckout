/**
 * Created by jsims on 9/17/2014.
 */
module.exports = function homeRedirect (data, options) {
    var req = this.req;
    var res = this.res;

    return res.redirect('status/add');
}
