/**
 * @BringIn the development,
 * production,test environment keys
 * 
 * @development environment,
 * Uncomment import and exports devKeys
 */

import devKeys from './dev.keys';
import testsKeys from './tests.keys';
import prodKeys from './prod.keys';

if (process.env.NODE_ENV === "production") {
  module.exports = prodKeys;
}
else if (process.env.NODE_ENV === "test") {
  module.exports = testsKeys;
} else {
  module.exports = devKeys;
}

console.log(typeof process.env.NODE_ENV);
console.log(process.env.SECRET_KEY);
console.log(process.env.DATABASE_URL);
