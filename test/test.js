var mainFunction = function(callback) {
    //Did something
    console.log("In Main Function");
    callback();
}

var callbackFunction = function() {
    console.log('Variable: ' + this.variable);
    console.log("In Callback Function");
}

mainFunction(callbackFunction.bind({"variable": "this is a variable"}));