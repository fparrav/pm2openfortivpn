require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
const find = require('find-process');
const nrc = require('node-run-cmd');


var dataCallback = function(data) {
  console.log(data);
};

var errorCallback = function(data) {
  console.log(data);
};

nrc.run('sudo openfortivpn -c /etc/openfortivpn/corona',{ onError: dataCallback, onData: dataCallback});





function closeOpenfortivpn() {
    find('name', 'openfortivpn')
        .then(function(list) {
            //console.log(list);
            list.forEach((item) => {
                //console.log(item.pid);
                closePID(item.pid);
            })
        }, function(err) {
            console.log(err.stack || err);
        })

}

function closePID(pid) {
    var cmd = 'sudo kill ' + pid;
    nrc.run(cmd);
    console.log('Killing : ' + pid);
}


process.on('SIGINT', function() {
    closeOpenfortivpn();
});




