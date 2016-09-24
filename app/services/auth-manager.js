import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({

  currentUser: storageFor('currentUser'),

  checkLogged(host, callback) {
    

    const id = this.get('currentUser').get('id');
    const token = this.get('currentUser').get('token');
    const username = this.get('currentUser').get('username');

    return Ember.$.ajax({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-key': username,
        'x-access-token': token,
      },
      url: host + '/user/check',
      data: { id },
    }).then((result) => {
      if (result.errors) {
        return callback(true);
      }
      if (result.bool) return callback();
      return callback(true);
    });
  },

  authenticate(login, password, host, callback) {
    if (!login || !password)callback('Username or Password wrong');
    return Ember.$.ajax({
      method: 'POST',
      url: host + '/login',
      data: { username: login, password },
    }).then((result) => {
      if (result.errors) {
        const err = result.errors.msg;
        return callback(err);
      }
      this.get('currentUser').set('id', result.user.id);
      this.get('currentUser').set('username', result.user.username);
      this.get('currentUser').set('token', result.user.token.token);
      return callback();
    });
  },

  register(login, password, host, callback) {
    if (!login || !password) callback('Fehler in übermittelten Daten');
    return Ember.$.ajax({
      method: 'POST',
      url: host + '/users',
      data: { username: login, password, info: 'likeAcharm' },
    }).then((result) => {
      if (result.errors) {
        const err = result.errors.msg;
        return callback(err);
      }
      return callback();
    });
  },
});
