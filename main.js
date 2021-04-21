const logger = require('./logger');

//
logger.info('info test');
logger.warn('warn test');
logger.error(new Error('debug test'));
logger.debug('debug test');
