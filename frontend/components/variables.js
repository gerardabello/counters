const variables = {
  unit: 8,

  colors: {
    body: '#171717',
    background: '#FFFFFF',
    gray: '#c1c1c1'
  },

  textSizes: {
    size3: `
      font-size: 64px; 
      @media (max-width: 550px) {
        font-size: 48px;
      }
    `,
    size2: `
      font-size: 48px;
      @media (max-width: 550px) {
        font-size: 36px;
      }
    `,
    size1: `
      font-size: 36px;
      @media (max-width: 550px) {
        font-size: 24px;
      }
    `,
    size0: `
      font-size: 24px;
    `
  },

  fontFamily: '"Karla", sans-serif'
}

module.exports = variables
