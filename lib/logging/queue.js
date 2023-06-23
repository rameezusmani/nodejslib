module.exports = async function onQueueMessage(data) {
    console.log("onMessage:");
    console.log(data);
}

module.exports = async function onQueueError(err) {
    console.error("onError:");
    console.error(err);
}