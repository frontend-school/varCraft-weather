var pubsubNormal = {
    topics:{
        //'name':[func, func, ..., func]
    },
    publish: function (stream) {
        this.topics[stream] = new Array();
        console.log(this.topics)
    },
    subscribe: function (stream, cb) {
        this.topics[stream].push(cb);
    }
};
pubsubNormal.publish('ololo');
function Topic(subject, text){
    if(typeof subject === 'string') {
        this.subject = subject;
    }

    if(typeof text === 'object') {
        this.text = JSON.stringify(text);
    }
    else {
        this.text = text;
    }
}

var topics = [];

function publish(topic, options){
    options = options || {replace: false};
    for(var i = topics.length - 1; i >= 0; i--){
        if((topics[i].subject === topic.subject) && (!options.replace)) {
            console.log('Duplicate! Use "options.replace = true" to resolve');
            return {status:'error', desc:'duplicate'};
        }
        else if((topics[i].subject === topic.subject) && (options.replace)) {
            topics[i].text = topic.text;
            return {status:'success', desc:'added'};
        }
    }

    if(topic instanceof Topic) {
        topics.push(topic);
        return {status:'success', desc:'added'};
    }
}

function unpublish(subject){
    if(typeof subject === 'string') {
        for(var i = topics.length - 1; i >= 0; i--){
            if(topics[i].subject == subject){
                topics.splice(i, 1)
            }
        }
    }
}

function subscribe(subject){
    if(typeof subject === 'string') {
        for (var i = topics.length - 1; i >= 0; i--) {
            if (topics[i].subject == subject) {
                return topics[i].text;
            }
        }
    }
}