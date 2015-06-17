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

          // currently our mpd files store the values in bytes per sec, convert
          // them to be bits per second.
          for (var p = 0; p < mpd.periods.length; p++)
            for (var a = 0; a < mpd.periods[p].adaptationSets.length; a++)
              for (var r = 0; r < mpd.periods[p].adaptationSets[a].representations.length; r++)
                mpd.periods[p].adaptationSets[a].representations[r].bandwidth *= 8;

          return Promise.resolve(mpd);
        }

        var error = new Error('MPD parse failure.');
        error.type = 'mpd';
        return Promise.reject(error);
      }
  );
};
