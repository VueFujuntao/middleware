/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : datasource2

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-03-26 17:14:11
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of data_source
-- ----------------------------
INSERT INTO `data_source` VALUES ('1', 'AA', '20000', '1');
INSERT INTO `data_source` VALUES ('2', 'BB', '10000', '1');
INSERT INTO `data_source` VALUES ('3', 'CC', '30000', '1');

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
INSERT INTO `property` VALUES ('1', '{\n\"maxAlarmValue\":50,\n\"maxValue\":100,\n\"minAlarmValue\":30,\n\"minValue\":0,\n\"propertyId\":\"1\"\n}', '5000', '1', '嗷嗷嗷', '1', '0', '0', '1', '1', '0', '', null);
INSERT INTO `property` VALUES ('10', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '2', '0', '0', '0', '2', '1', '1', null);
INSERT INTO `property` VALUES ('11', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '2', '0', '0', '0', '2', '1', '1', null);
INSERT INTO `property` VALUES ('12', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '2', '0', '0', '0', '2', '1', '1', null);
INSERT INTO `property` VALUES ('14', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '2', '0', '0', '0', '2', '1', '1', null);
INSERT INTO `property` VALUES ('15', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '2', '0', '0', '1', '2', '1', '1', null);
INSERT INTO `property` VALUES ('1553587046185', '{\"maxAlarmValue\":1,\"maxValue\":12,\"minAlarmValue\":1,\"minValue\":1,\"subValue\":1,\"addValue\":12}', '900', '2', '1', '3', '12321321', '0', '1', '3', '1', '1', null);
INSERT INTO `property` VALUES ('1553590072296', '{}', '900', '2', '122', '1', '12', null, '0', '1', '0', null, null);
INSERT INTO `property` VALUES ('1553590235549', '{}', '900', '2', '12321', '1', '21312', null, '0', '1', '0', null, null);
INSERT INTO `property` VALUES ('1553590282853', '{}', '30', '2', '12', '1', '12', null, '0', '4', '0', null, null);
INSERT INTO `property` VALUES ('1553590414601', '{}', '1800', '2', '12', '1', '12', null, '0', '1', '0', null, null);
INSERT INTO `property` VALUES ('1553590556795', '{}', '900', '2', '12', '1', '12', null, '0', '4', '0', null, null);
INSERT INTO `property` VALUES ('1553590610866', '{}', '5', '2', '2121', '1', '12', null, '0', '1', '0', null, null);
INSERT INTO `property` VALUES ('1553590633349', '{}', '900', '1', '12fdfsdgdsgsdgsdgsdg', '1', '12', null, '0', '2', '0', null, null);
INSERT INTO `property` VALUES ('2', '{\n\"maxAlarmValue\":50,\n\"maxValue\":100,\n\"minAlarmValue\":30,\n\"minValue\":0,\n\"propertyId\":\"1\"\n}', '5000', '1', '嗷嗷嗷', '1', '0', '0', '1', '1', '0', '', null);
INSERT INTO `property` VALUES ('3', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '10000', '1', 'aaa', '4', '0', '0', '0', '4', '1', '1', null);
INSERT INTO `property` VALUES ('4', '{\n\"maxAlarmValue\":50,\n\"maxValue\":100,\n\"minAlarmValue\":30,\n\"minValue\":0,\n\"propertyId\":\"1\"\n}', '5000', '1', '嗷嗷嗷', '1', '0', '0', '0', '1', '0', '', null);
INSERT INTO `property` VALUES ('5', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '1', '0', '0', '1', '1', '0', '', null);
INSERT INTO `property` VALUES ('6', '{\"maxAlarmValue\":50,\"maxValue\":100,\"minAlarmValue\":30,\"minValue\":0,\"propertyId\":\"1\"}', '5000', '1', 'aaa', '1', '0', '0', '0', '1', '1', '1', null);
