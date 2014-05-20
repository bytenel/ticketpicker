var ActiveDirectory = require('activedirectory');

var ad = new ActiveDirectory({ url: 'ldap://dc.domain.com',
                               baseDN: 'dc=domain,dc=com',
                               username: 'username@domain.com',
                               password: 'password' });

ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }

  if (auth) {
    console.log('Authenticated!');
    var groupName = 'Employees';
	 ad.getUsersForGroup(groupName, function(err, users) {
	  if (err) {
	    console.log('ERROR: ' +JSON.stringify(err));
	    return;
	  }

	  if (! users) console.log('Group: ' + groupName + ' not found.');
	  else {
	    console.log(JSON.stringify(users));
	 }
  }
  else {
    console.log('Authentication failed!');
  }
});