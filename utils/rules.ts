export const isRequired = (v: string) => !!v || 'password required'
export const isInvalidEmailFormat = (v: string) => !!/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'invalid email format'