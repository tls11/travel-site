const Person = (fullName, favColor) => {
  this.name = fullName
  this.favoriteColor = favColor
  this.greet = () => {
    console.log('Hello, my name is ' + this.name + " and my favorite color is " + this.favoriteColor + '.')
  }
}

module.exports = Person
