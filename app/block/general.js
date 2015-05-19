function Topic(subject, text){
    this.subject = subject;
    this.text = text;
}

var topics = [];

function publish(topic){
    for(var i = topics.length; i >= 0; i--){
        if((topics[i].subject == topic.subject) && (topics[i].text == topic.text)){
            console.log('Dublicate!');
            return {status:'error', desc:'dublicate'};
        }
    }
    if(topic instanceof Topic) {
        topics.push(topic);
        return {status:'success', desc:'topic added'};
    }
    else{
        topics.push(new Topic(arguments[0], arguments[1]));
        return {status:'success', desc:'topic added'};
    }
}

function unpublish(topic){
    if(topic instanceof Topic) {
        for(var i = topics.length; i >= 0; i--){
            if((topics[i].subject == topic.subject) && (topics[i].text == topic.text)){
                topics.splice(i, 1)
            }
        }
    }
}

function subscribe(topic){
    for(var i = topics.length; i >= 0; i--){
        if((topics[i].subject == topic.subject) && (topics[i].text == topic.text)){
            return topics[i];
        }
    }
}