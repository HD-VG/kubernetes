module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  rootDir: './',
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],//esto corregir a todo al final
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  // Excluímos archivos que no deberían tener test
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/.*\\.module\\.ts',      
    'src/.*\\.interface\\.ts',  
    'src/common/',              
    'src/assets/',              
    'src/presentation/dtos/',
    'src/main.ts',
    'src/ormConfig.example.ts',
    'src/ormConfig.ts'
  ],
};