function toggleCustomEngines() {
    let enabled = usecustomenginesbox.checked
    customenginetextarea.disabled = !enabled
    customenginesavebutton.disabled = !enabled
    if (!enabled)
        localStorage.removeItem("customengines")
}

function saveCustomEngines() {
    let customengines = customenginetextarea.value.split("\n")
    engines = engines.filter(x => x.length > 0)
    let ok = true;
    engines.forEach(function(x) {
        if (!x.includes("%s")) {
            ok = false;
        }
    })
    if (!ok) {
        alert("Error: there should be a %s in every line")
    } else {
        localStorage.setItem("customengines", customengines.join("\n"))
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let customengines = localStorage.getItem("customengines")
	if (customengines != null && customengines.length > 0) {
		customenginetextarea.value = customengines
        usecustomenginesbox.checked = true
        customenginetextarea.disabled = false
        customenginesavebutton.disabled = false
	} else {
        customenginetextarea.value = engines.join("\n")
    }
}, false);