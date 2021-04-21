const config = require('config');
const chalk = require('chalk');
const { createLogger, format, transports } = require('winston');
const { errors, combine, timestamp, label, colorize, simple, json, printf} = format;
require('winston-daily-rotate-file');

let logLevel = config.logger?(config.logger.level||'info') :'info';
let logOut = config.logger?(config.logger.out||'./log') :'./log';
let errDivde = config.logger?(config.logger.errDivde||false) :false;

const myFormat = printf(info => {
  let level = info.level;
  switch (level) {
    case 'info':
      level = chalk.cyan(level);
      break;
    case 'warn':
      level = chalk.yellow(level);
      break;
    case 'error':
      level = chalk.red(level);
      break;
    default:
      break;
  }
  if (info.stack) {
    return `${info.timestamp} [${level}]: ${info.message}\n${info.stack}`;
  } else {
    return `${info.timestamp} [${level}]: ${info.message ? info.message : JSON.stringify(info)}`;
  }
});

const logger = createLogger({
    level: logLevel,
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }), //加上这个就会自动加上stack
      json()
    ),
    transports: [
      new transports.DailyRotateFile({ 
        dirname: logOut,
        filename: `log-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '10d'
      }),
      new transports.Console({format: myFormat}),
      
    ],
    //rejectionHandlers: [
     // new transports.File({ filename: './log/rejections.log' })
    //]
  });

  if (errDivde) {
    logger.add(
      new transports.DailyRotateFile({ 
        level: 'error',
        dirname: logOut,
        filename: `err-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '10d'
      })
    );
  }
  module.exports = logger;