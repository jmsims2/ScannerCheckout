/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	checkin: function(req, res, next) {
        Status.find({'asset_status': 'in'},function foundStatus(err, status) {
            if(err) return next(err);

            res.view({
                status: status
            });
        });
    },
    addStatus: function(req,res){
        var statusArray = [
                {
                    checkout_emp_id: req.param('checkout_emp_id'),
                    checkout_emp_name: req.param('checkout_emp_name'),
                    asset_tag: req.param('asset_tag_1'),
                    asset_name: req.param('asset_name_1'),
                    checkout_time: new Date(),
                    asset_status: "out"
                },
                {
                    checkout_emp_id: req.param('checkout_emp_id'),
                    checkout_emp_name: req.param('checkout_emp_name'),
                    asset_tag: req.param('asset_tag_2'),
                    asset_name: req.param('asset_name_2'),
                    checkout_time: new Date(),
                    asset_status: "out"
                }
        ];

        //TODO add event and check for that in the find as well
        async.map(statusArray, function(st, cb){
            Status.findOrCreate({'asset_tag': st.asset_tag}, st, cb);
        }, function done(err, statusRecords) {
            if(err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/status/add');
            }
            res.redirect('status/add');
        });
    },
    checkInAsset: function(req,res){

        var assetArray = req.param('assets').split('\t');

        var updateArray = [];

        for( var i = 0; i < assetArray.length; i++) {
            updateArray.push({
                'checkin_emp_id': req.param('checkin_emp_id'),
                'checkin_emp_name': req.param('checkin_emp_name'),
                'asset_status': 'in',
                'checkin_time': new Date(),
                'asset_tag': assetArray[i]
            });
        }

        //res.json(updateArray);


        //TODO add event and check for that in the find as well
        async.map(updateArray, function(st, cb){
            Status.update({'asset_tag': st.asset_tag}, st, cb);
        }, function done(err, statusRecords) {
            if(err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/status/checkin');
            }
            res.redirect('status/checkin');
        });
    },
    add: function(req, res, next) {
        Status.find({'asset_status': 'out'},function foundStatus(err, status) {
            if(err) return next(err);

            res.view({
                status: status
            });
        });
    },
    issue: function(req,res) {
        return res.view();
    },
    logIssue: function(req, res){
        var issue = {
            'asset_tag': req.param('asset_tag'),
            'notes': req.param('notes')
        }

        Status.update({'asset_tag': issue.asset_tag}, issue).exec(function(err,updated){
            if(err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/status/issue');
            }
            console.log(updated)
            res.redirect('status/issue');
        })
    }
};

