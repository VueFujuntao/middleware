/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : datasource2

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-03-28 13:25:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for data_source
-- ----------------------------
DROP TABLE IF EXISTS `data_source`;
CREATE TABLE `data_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `send_time` int(11) DEFAULT NULL,
  `status` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_source
-- ----------------------------
INSERT INTO `data_source` VALUES ('12', 'hello', '123456', '1');

-- ----------------------------
-- Table structure for important_alarm
-- ----------------------------
DROP TABLE IF EXISTS `important_alarm`;
CREATE TABLE `important_alarm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of important_alarm
-- ----------------------------
INSERT INTO `important_alarm` VALUES ('1', '无');
INSERT INTO `important_alarm` VALUES ('2', '火灾');
INSERT INTO `important_alarm` VALUES ('3', '漏水');
INSERT INTO `important_alarm` VALUES ('4', '闯入');
INSERT INTO `important_alarm` VALUES ('5', 'ups');

-- ----------------------------
-- Table structure for method
-- ----------------------------
DROP TABLE IF EXISTS `method`;
CREATE TABLE `method` (
  `id` int(11) NOT NULL,
  `method_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of method
-- ----------------------------
INSERT INTO `method` VALUES ('1', '无');
INSERT INTO `method` VALUES ('2', '折线周期函数');
INSERT INTO `method` VALUES ('3', '波动取值函数');
INSERT INTO `method` VALUES ('4', '随机取值函数');
INSERT INTO `method` VALUES ('5', '类正弦函数');
INSERT INTO `method` VALUES ('6', '随机概率函数');

-- ----------------------------
-- Table structure for property
-- ----------------------------
DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `id` varchar(255) NOT NULL,
  `canshuzhi` varchar(255) DEFAULT NULL,
  `change_time` int(11) DEFAULT NULL,
  `data_source_id` int(11) DEFAULT NULL,
  `details_des` varchar(255) DEFAULT NULL,
  `method_id` int(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `is_status` int(11) DEFAULT NULL,
  `is_on` int(11) DEFAULT NULL,
  `important_alarm_id` int(11) DEFAULT NULL,
  `is_parent_data` int(11) DEFAULT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `is_change_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of property
-- ----------------------------
INSERT INTO `property` VALUES ('1553742680229', '{}', '1800000', '12', 'fewer', '1', '12', null, '1', '2', '0', null, '0');
INSERT INTO `property` VALUES ('1553743814434', '{}', null, '12', 'werewolf', '1', '32143214', null, '0', '5', '1', null, '1');
