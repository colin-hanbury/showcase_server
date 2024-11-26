// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//   };
  
  module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: ["reflect-metadata"], // Add this line to load reflect-metadata globally
  };
  