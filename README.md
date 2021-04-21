# 使用winston实现的logger

## 文件名：logger.js

##  使用：
const logger = require("./logger");

logger.info('info test'));
logger.warn('warn test'));
logger.debug('debug test'));
logger.info('info test'));

##  自定义level,输出目录，err日志
增加 /config/default.yaml
logger:
  level: debug
  out: /var/log
  errDivde: true
