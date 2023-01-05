// just accept any json, AP doesn't have a real spec.
const json_media_type = /^application\/([a-z]+\+)?json/;

(function() {
	// Based on https://github.com/fedi-to/fedi-to.github.io/blob/main/protocol-handler.md
	var url = new URL(document.location.href);
	var target = url.searchParams.get("target");
	if (
		target === null
		||
		!target.startsWith("web+ap://")
		||
		target.startsWith("web+ap:///")
		||
		target.startsWith("web+ap://\\")
	) {
		// FIXME invalid
		return;
	}
	var ap_id = target.replace(/^web\+ap:\/\//, "https://");
	var ap_url = new URL(ap_id);
	if (ap_url.username || ap_url.password) {
		// FIXME use an open proxy to check these
		return;
	}
	fetch(ap_url, {
		// use GET instead of HEAD for CORS to work
		// (yes really, lmao)
		method: "GET",
		// FIXME add workaround for authorized fetch
		headers: {Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'},
		mode: "cors"
	}).then((response) => {
		var ct = response.headers.get("Content-Type");
		if (json_media_type.test(ct)) {
			document.location = ap_url;
		}
	});
	// also attempt application/activity+json as it avoids CORS preflight
	// (this races with the above fetch but it's fine really)
	fetch(ap_url, {
		method: "GET",
		headers: {Accept: 'application/activity+json'},
		mode: "cors"
	}).then((response) => {
		var ct = response.headers.get("Content-Type");
		if (json_media_type.test(ct)) {
			document.location = ap_url;
		}
	});
})();
