let engines = [
	"https://duckduckgo.com/?q=%s",
	"https://www.qwant.com/?q=%s",
	"https://www.ecosia.org/search?q=%s",
	"https://metager.org/meta/meta.ger3?eingabe=%s",
	"https://www.startpage.com/sp/search?q=%s",
]

let bangs = {
	"yt": "https://www.youtube.com/results?search_query=%s",
	"g": "https://www.google.com/search?q=%s"
}

function search(q) {
	if (q == null || q == undefined) {
		return
	}
	if (handleBangs(q) === false) {
		let engine = engines[Math.floor(Math.random() * engines.length)]
		location = engine.replace("%s", encodeURIComponent(q))
	}
}

function handleBangs(q) {
	let matches = q.match(/ ?![a-z]+ ?/)//!bang
	if (matches == null || matches[0] == null) {
		matches = q.match(/ ?[a-z]+! ?/)//bang!
	}
	if (matches != null && matches[0] != null) {
		if (new RegExp('"[^"]*' + matches[0] + '[^"]*"').test(q) === true)  {
			// prevent quoted bangs from working
			return false
		}
		let match = matches[0]
		let bang = match.replaceAll(/[! ]/g, "")
		if (Object.keys(bangs).includes(bang)) {
			newq = q.replace(match, "")
			location = bangs[bang].replace("%s", encodeURIComponent(newq))
			return true
		}
	}
	return false
}

// on page load
let params = new URLSearchParams(location.hash.substr(1))
let query = params.get("q") // this is done to pass more  arguments in the future

if (query != null && query != undefined) {
	search(query)
}
