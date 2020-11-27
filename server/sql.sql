drop table if exists `user`;
create table `user`(
    `user_id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `nickname` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '昵称',
    `avatar` VARCHAR(150) NOT NULL DEFAULT '' COMMENT '头像',
    `source` TINYINT NOT NULL DEFAULT 0 COMMENT '来源1：微信，2：支付宝',
    `session_key` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '微信openid',
    `openid` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '微信openid',
    `unionid` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '微信unionid',
    `register_time` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '注册时间',
    `last_login_time` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '最后登录时间',
    UNIQUE KEY(`openid`, `unionid`)
) ENGINE=INNODB COMMENT='用户' AUTO_INCREMENT=901030;


drop table if exists `merchant`;
create table `merchant`(
`merchant_id` MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`merchant_name` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '商家名称',
`service_tel` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '客服电话',
`contacts` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '联系人',
`address` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '地址',
`status` TINYINT NOT NULL DEFAULT 0 COMMENT '状态 1:正常，0：禁用'
) ENGINE=INNODB COMMENT='设备' AUTO_INCREMENT=901030;

drop table if exists `station`;
create table `station`(
`station_id` MEDIUMINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
`station_name` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '商家名称',
`service_tel` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '客服电话',
`contacts` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '联系人',
`address` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '地址',
`longitude` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '',
`latitude` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '',
`status` TINYINT NOT NULL DEFAULT 0 COMMENT '状态'
) ENGINE=INNODB COMMENT='设备' AUTO_INCREMENT=901030;

drop table if exists `charge_price`;
create table `device`(
`price_id` INT MEDIUMINT PRIMARY KEY AUTO_INCREMENT
) ENGINE=INNODB COMMENT='充电价格' AUTO_INCREMENT=901030;

drop table if exists `device`;
create table `device`(
`device_id` INT MEDIUMINT PRIMARY KEY AUTO_INCREMENT,
`simid` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '流量卡号',
`merchant_id` INT MEDIUMINT NOT NULL DEFAULT 0 COMMENT '充电站',
`station_id` INT MEDIUMINT NOT NULL DEFAULT 0 COMMENT '充电站',
`price_id` INT MEDIUMINT NOT NULL DEFAULT 0 COMMENT '价格套餐'
) ENGINE=INNODB COMMENT='设备' AUTO_INCREMENT=901030;