function remove_current_tab() {
       browser.tabs.query({active:true}).then((tabs)=>{
           browser.tabs.remove(tabs[0].id).catch(on_error);
    }).catch(on_error);
    
} 

browser.runtime.onMessage.addListener((message)=>{
    if(message.cmd === "remove") remove_current_tab();
});

function on_error(e) {
    console.log(e);
}
