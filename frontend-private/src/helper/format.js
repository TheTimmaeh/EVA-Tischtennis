String.prototype.format = function(type){
  let output

  if(type == 'date'){
    output = this.substr(0, 10)
  }

  return output
}

export default { }
