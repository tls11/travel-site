const Person = (fullName, favColor) => {
  this.name = fullName
  this.favoriteColor = favColor
  this.greet = () => {
    console.log('Hello, my name is ' + this.name + " and my favorite color is " + this.favoriteColor + '.')
  }
}

exports.exampleProperty = "Super magical example value"
exports.exampleFunction = function() {
  alert("this is an example")
}
