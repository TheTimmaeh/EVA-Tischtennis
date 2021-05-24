const types = {
  year: {
    regex: /^[12]\d{3}$/,
  },
  zipcode: {
    regex: /^[1-9]\d{4}$/,
  },
  streetnumber: {
    regex: /^[1-9]\d{0,3}( *\- *\d+)? *[a-z]?$/,
  },
  phone: {
    // type: String,
    // regex: /^[1-9]\d{4}$/,
  },
  mail: {
    // type: String,
    // regex: /^[1-9]\d{4}$/,
  },
  url: {
    // type: String,
    // regex: /^[1-9]\d{4}$/,
  },
  number:{
    type: String,
    regex: /^[1-9]\d{0,3}$/
  },
  date:{ //to take dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy
    type: String,
    regex: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  }
}

const validate = ({ defs, refs, vals }) => {
  let errors = 0

  const formError = (ref, message) => {
    console.error(`VALIDATE | ${message}`)
    ref.error = true
    errors++
  }

  Object.entries(defs).forEach(([key, def]) => {
    const ref = refs[key].value
    const val = vals[key].value

    let definition = Object.assign({}, def)

    if(!!definition.type && typeof definition.type === 'object'){
      let type = Object.assign({}, definition.type)
      delete definition.type
      definition = Object.assign({}, type, definition)
    } else {
      definition = Object.assign({}, definition)
    }

    // Required
    if(definition.required === true && (val === null || val.length === 0)){
      formError(ref, `${key} is required.`)

    // Type
    // } else if(definition.type && typeof definition.type === 'function' && typeof val !== typeof definition.type()){
    //   formError(ref, `${key} doesn't match type.`)

    // Regular Expression
    } else if(definition.regex && !definition.regex.test(val)){
      formError(ref, `${key} doesn't match regular expression.`)

    // Min Length
    } else if(definition.min && val.length < definition.min){
      formError(ref, `${key} doesn't match minimum length.`)

    // Max Length
    } else if(definition.max && val.length > definition.max){
      formError(ref, `${key} doesn't match maximum length.`)

    // Reset to no error
    } else if(ref.error){
      ref.error = false
    }
  })

  return !errors
}

export default { types, validate }
