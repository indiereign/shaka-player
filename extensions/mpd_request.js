// goog.provide('shaka.dash.MpdRequest');

goog.require('shaka.dash.mpd');
goog.require('shaka.util.AjaxRequest');


/**
 * Sends the MPD request.
 * @return {!Promise.<!shaka.dash.mpd.Mpd>}
 * @suppress {duplicate}
 */
shaka.dash.MpdRequest.prototype.send = function() {
  var url = this.url;
  return this.sendInternal().then(
      /** @param {!XMLHttpRequest} xhr */
      function(xhr) {
        var mpd = shaka.dash.mpd.parseMpd(xhr.responseText, url);

        if (mpd) {

          // fix the buffer time
          mpd.minBufferTime = 30.0;
          return Promise.resolve(mpd);
        }

        var error = new Error('MPD parse failure.');
        error.type = 'mpd';
        return Promise.reject(error);
      }
  );
};
