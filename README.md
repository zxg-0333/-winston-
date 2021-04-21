# 使用winston实现的logger
## 文件名：logger.js
## 使用
```
const logger = require("./logger");

logger.info('info test');
logger.warn('warn test');
logger.debug('debug test');
logger.error(new Errro('error test'));
```
## 自定义log level,log out diretory，是否生成 err*.log
> 无配置文件时默认 level=‘info’，out diretory=‘./log’ 是否生成err*.log:false
增加 /config/default.yaml
```
logger:level: debug
out: /var/log
errDivde: true
```
