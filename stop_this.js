let default_settings = {
	time_limit_between_two_sessions: 60*60*1000,
    time_limit_for_one_session: 10*60*1000
}

function on_error(e) { console.log(e); }

let stored = browser.storage.sync.get('quora_usage');
stored.then((results)=>{
	let current_time = new Date();
	if(Object.keys(results).length === 0) {
		results.quora_usage = {};
		results.quora_usage.usage = [];
		let current_usage = new Usage(current_time);
        console.log(current_usage);
		results.quora_usage.last = { time: current_time };
		results.quora_usage.usage.push(current_usage);
		browser.storage.sync.set(results);
        
        setTimeout(()=>{
        alert("Your time's up");
        browser.runtime.sendMessage({cmd: "remove"});
    },time_limit_for_one_session);
	}

}).catch(on_error);
	}
	else {
    
	let last_used = results.quora_usage.last;
    console.log("Yo");

	if ( current_time.getTime() - new Date(last_used.time).getTime() <= default_settings.time_limit_between_two_sessions ) {
		alert("You are not allowed to open Quora");
        
        setTimeout(() => {
            console.log(browser.runtime);
           browser.runtime.sendMessage({cmd: "remove"});
            },1000);

	}
	let current_usage = new Usage(current_time);
	results.quora_usage.last = { time: current_time };
	results.quora_usage.usage.push(current_usage);
	browser.storage.sync.set(results);
    setTimeout(()=>{
        alert("Your time's up");
        browser.runtime.sendMessage({cmd: "remove"});
    },time_limit_for_one_session);
	}

}).catch(on_error);

function Usage(current_time) {
	this.time = current_time;
	return this;
}

