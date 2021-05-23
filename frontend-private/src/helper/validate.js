const types = {
  zipcode: {
    // type: String,
    regex: /^[1-9]\d{4}$/,
  },
  mail: {
    // type: String,
    // regex: /^[1-9]\d{4}$/,
  },
  url: {
    // type: String,
    // regex: /^[1-9]\d{4}$/,
  },
}

const validate = ({ definitions, elements, formdata }) => {
  let errors = 0

  const formError = (element, message) => {
    console.error(`VALIDATE | ${message}`)
    element.error = true
    errors++
  }

  Object.entries(definitions).forEach(([key, def]) => {
    const element = elements[`e_${key}`].value
    const value = formdata[key].value

    let definition = Object.assign({}, def)

    if(!!definition.type && typeof definition.type === 'object'){
      let type = Object.assign({}, definition.type)
      delete definition.type
      definition = Object.assign({}, type, definition)
    } else {
      definition = Object.assign({}, definition)
    }

    // Required
    if(definition.required === true && (value === null || value.length === 0)){
      formError(element, `${key} is required.`)

    // Type
    // } else if(definition.type && typeof definition.type === 'function' && typeof value !== typeof definition.type()){
    //   formError(element, `${key} doesn't match type.`)

    // Regular Expression
    } else if(definition.regex && !definition.regex.test(value)){
      formError(element, `${key} doesn't match regular expression.`)

    // Min Length
    } else if(definition.min && value.length < definition.min){
      formError(element, `${key} doesn't match minimum length.`)

    // Max Length
    } else if(definition.max && value.length > definition.max){
      formError(element, `${key} doesn't match maximum length.`)

    // Reset to no error
    } else if(element.error){
      element.error = false
    }
  })

  return !errors
}

export default { types, validate }
