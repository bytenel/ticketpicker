/**
 * Created by ben.nelson on 2/14/14.
 * reference api:
 * https://github.com/rogerwang/node-webkit/wiki/Native-UI-API-Manual
 */
var gui = require('nw.gui');

var menu = new gui.Menu();

function quit()
{
  gui.App.quit();
}